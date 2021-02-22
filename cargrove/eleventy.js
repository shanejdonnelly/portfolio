const CleanCSS = require('clean-css');
const Terser = require('terser');
//const theData = require('./src/_data/siteData.json');

module.exports = function(eleventyConfig) {

  /*
  if(theData.website.template === 'divisma'){
    eleventyConfig.addLayoutAlias('layout', 'divisma-layouts/layout.njk');
  }
  */

  eleventyConfig.addFilter('jsmin', function(code) {
    let minified = Terser.minify(code);
    if (minified.error) {
      console.log('Terser error: ', minified.error);
      return code;
    }

    return minified.code;
  });
  eleventyConfig.addFilter('cssmin', function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter('includes', function(stringToSearch, searchTerm) {
    console.log('in includes filter');
    console.log('searchTerm = ', searchTerm);
    console.log('stringToSearch = ', stringToSearch);
    console.log('it is in there! = ', stringToSearch.includes(searchTerm));

    return stringToSearch.includes(searchTerm);
  });
  eleventyConfig.addPassthroughCopy('src/build');
  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy('src/webfonts');
  return {
    passthroughFileCopy: true,
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};
