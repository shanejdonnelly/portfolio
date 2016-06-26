var Freezer = require('freezer-js');
var Utils = require('utils.js');

var social_icons = [];
var social_feeds = [];

if(typeof(user) !== 'undefined'){
  user.social_accounts.forEach((acct, i) => { 
    if(acct.valid && acct.selected){
      social_icons.push({name: acct.username, link: acct.link, platform: acct.platform, id: acct.platform_id, selected: true});
      if((acct.platform != 'Facebook profile') && (acct.platform != 'Instagram') && (acct.platform.indexOf('LinkedIn') === -1)){
        social_feeds.push({name: acct.username, link: acct.link, platform: acct.platform, id: acct.platform_id, selected: true});
      }
    }
  }); 
}

var state = {
    new_offer_id: 2,
    new_location_id: 1,
    offers: [],
    locations: [],
    campaigns: [],
    settings: {
        active_offer: 1,
        url: Math.random().toString(36).substr(2,10) + Math.random().toString(36).substr(2,10),      
    },
    page_defaults: {
        banner_bg_color: '#ef7521',
        banner_text_color: '#000000',
        logo_url: 'https://likeabucket.s3.amazonaws.com/rmd3tijpk0_1464900307784.png', 
        image_url: 'https://likeabucket.s3.amazonaws.com/3ssu4s1brr_1464979517277.jpg',
        video_url: '',
        show_video: false,
        about_business: 'About your business...',
        show_hours: false,
        hours: [
          {name: 'Sunday', closed: true, open_hour: 900, close_hour: 1700},
          {name: 'Monday', closed: false, open_hour: 900, close_hour: 1700},
          {name: 'Tuesday', closed: false, open_hour: 900, close_hour: 1700},
          {name: 'Wednesday', closed: false, open_hour: 900, close_hour: 1700},
          {name: 'Thursday', closed: false, open_hour: 900, close_hour: 1700},
          {name: 'Friday', closed: false, open_hour: 900, close_hour: 1700},
          {name: 'Saturday', closed: true, open_hour: 900, close_hour: 1700}
        ],
        location_id: '0', 
        social_icons: social_icons, 
        social_feeds: social_feeds
    }
};

// Returns the freezer instance with the state.
module.exports = new Freezer( state );

