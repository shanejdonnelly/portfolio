const fs = require('fs');
const shell = require('shelljs');
const moment = require('moment');
const Car = require('../models/Car');
const Dealer = require('../models/Dealer');
const Location = require('../models/Location');
const Page = require('../models/Page');
const Website = require('../models/Website');

exports.buildSite = async (user) => {
  //get data for website
  const dealer = await Dealer.findOne({ _id: user.dealerId }).lean();
  const locations = await Location.find({
    dealerId: user.dealerId,
  }).lean();
  const website = await Website.findOne({ dealerId: user.dealerId }).lean();
  const cars = await Car.find({ dealerId: user.dealerId }).populate('location').lean();

  const activeCars = cars.filter(car => car.status === 'active' || car.status === 'pending');
  const soldCars = cars.filter(car => car.status === 'sold' && car.soldAt);

  const weekAgoMoment = moment().subtract(7, 'days')
  const recentlySoldCars = soldCars.length && website.showSoldCars ? soldCars.filter(car => moment(car.soldAt).isAfter(weekAgoMoment)) : [];

  const siteData = {
    dealer,
    locations,
    website,
    cars: [...activeCars, ...recentlySoldCars],
    mapsAPIKey: process.env.GOOGLE_MAPS_API_KEY
  };

  //get pages for site and add to siteData
  const pages = await Page.find({ dealerId: user.dealerId }).lean();

  const enabledPages = pages.filter(page => page.enabled)

  siteData.website.parentPages = enabledPages.filter(p => p.parentPathName === '').sort((a, b) => a.navOrder - b.navOrder);
  siteData.website.childPages = enabledPages.filter(p => p.parentPathName !== '')

  siteData.website.aboutPage = siteData.website.parentPages.filter(p => p.pathName === 'about')
  siteData.website.homePage = siteData.website.parentPages.filter(p => p.pathName === 'home')
  siteData.website.blogPage = enabledPages.filter(p => p.pathName === 'blog')
  siteData.website.financePage = enabledPages.filter(p => p.pathName === 'finance')
  siteData.website.productsPage = enabledPages.filter(p => p.pathName === 'products')
  siteData.website.servicePage = enabledPages.filter(p => p.pathName === 'service')


  siteData.website.aboutPages = enabledPages.filter(p => p.parentPathName === 'about');
  siteData.website.blogPages = enabledPages.filter(p => p.parentPathName === 'blog');
  siteData.website.financePages = enabledPages.filter(p => p.parentPathName === 'finance');
  siteData.website.productPages = enabledPages.filter(p => p.parentPathName === 'products');
  siteData.website.servicePages = enabledPages.filter(p => p.parentPathName === 'service');

  const rootDir = shell.pwd();
  console.log('rootDir =', rootDir);


  // write dataFile to selected theme folder, overwriting the existing file
  if(process.env.NODE_ENV === 'development'){
    shell
      .echo(JSON.stringify(siteData))
      .to(`/home/shane/code/cargrove/templates/${siteData.website.template}/src/_data/siteData.json`);
  }
  else{
    // write dataFile to selected theme folder, overwriting the existing file
    shell
      .echo(JSON.stringify(siteData))
      .to(`${rootDir}/templates/${siteData.website.template}/src/_data/siteData.json`);

    // make a backup copy that will get committed to git
    shell
      .echo(JSON.stringify(siteData))
      .to(`${rootDir}/siteData/${siteData.website.url}_siteData.json`);

    // npm run build in theme folder
    shell.exec(`npm --prefix templates/${siteData.website.template} run build`,
      (code, stdout, stderr) => {
        console.log('just built a site for dealer');
        console.log('Exit code:', code);
        console.log('Program output:', stdout);

        // push the built files to /var/www and sites subdir
        // check and then mkdir if necessary
        const path = `/var/www/${siteData.website.url}`;
        const exists = fs.existsSync(path);
        console.log('exists?');
        console.log(exists);
        if (!exists) {
          shell.mkdir(`/var/www/${siteData.website.url}`);
        } else {
          shell.rm('-rf', `/var/www/${siteData.website.url}/html`);
        }

        shell.mv(`${rootDir}/templates/${siteData.website.template}/dist`,
          `/var/www/${siteData.website.url}/html`);
      });

    // make the GIT commits

    //first, commit to cargrove repo
    const commitMessage = `Auto-commit: update siteData.json for ${siteData.website.url}`;
    shell.exec(`git add ${rootDir}/siteData/${siteData.website.url}_siteData.json && git commit -m "${commitMessage}"`,
      (code, stdout, stderr) => {
        if (code !== 0) {
          shell.echo('Error: Git commit failed');
          //shell.exit(1);
          console.log(stderr);
        }
      	else{
      		shell.exec('git push origin master', (code3, stdout3, stderr3) => {
      		  console.log('pushed to github');
      		});

      	}
      }
    );
  }
};
