var _ = require('underscore');
import { browserHistory } from 'react-router';
var State = require('offers_state.js');
var Utils = require('utils.js'); 
var moment = require('moment');

//
// UPDATE SETTING
//
State.on('setting:update', function(val, fieldname){ 
    State.get().settings.set(fieldname, val);
    Utils.store(State.get()); 
}); 

//
// UPDATE OFFER
//
State.on('offer_form:update', function(id, val, fieldname){ 
    var offer_index = _.findIndex(State.get().offers, function(offer){ return parseInt(offer.id) === parseInt(id); });
    State.get().offers[offer_index].set(fieldname, val);
    Utils.store(State.get()); 
}); 

//
// DELETE OFFER
// 
State.on('offer:delete', function(id){
    var id = parseInt(id);
    var offers = _.filter(State.get().offers, function(offer){ 
      if(offer.id !== id){ return offer; }
    });

    if(id == State.get().settings.active_offer){
      //find an offer and make it the active one 
      if(State.get().offers.length){
        State.get().settings.set('active_offer', State.get().offers[0].id); 
      }
      else{
        State.get().settings.set('active_offer', null)
      }
    }

    State.get().set('offers', offers);
    Utils.store(State.get()); 
    //go back to the dashboard after deleting
    //if on a detail view, the offer is gone now
    browserHistory.push('/offers/dashboard');
});

//
// CREATE LOCATION
// 
State.on('location:delete', function(id){
    var id = parseInt(id);
    var _locations = _.filter(State.get().locations, function(l){ 
      if(l.id !== id){ return l; }
    });

    State.get().set('locations', _locations);
    Utils.store(State.get()); 
});


//
// CREATE LOCATION
//
State.on('location:create', function(l){ 
  var id = State.get().new_location_id || 2;
  var _location = {
      id: id,
      name: l.name,
      street_1: l.street_1, 
      street_2: l.street_2,
      city: l.city,
      state: l.state,
      zip: l.zip,
      phone: l.phone,
      url: l.url 
   }

    State.get().locations.push(_location);

   //iterate new_offer_id for next time
    State.get().set('new_location_id', id + 1);
 
    Utils.store(State.get()); 

});

//
// CREATE OR COPY OFFER
//
State.on('offer:create', function(user, o){ 
    o = (typeof(o) === 'undefined') ? false : o;
    var id = State.get().new_offer_id || 2;
    var defaults = State.get().page_defaults;

    //create the offer defaults
    var offer = {
        active: true,
        created: moment(),
        last_edited: moment(), 
        name: o ? 'Copy of ' + o.name : 'Offer ' + id,
        id: id,
        type: o ? o.type : 'discount', 
        discount_type: o ? o.discount_type : 'discount_custom',
        refer_a_friend_type: o ? o.refer_a_friend_type : 'refer_our_promo',
        giveaway_type: o ? o.giveaway_type : 'free_with_purchase',
        original_price: o ? o.original_price : 0,
        offer_price: o ? o.offer_price : 0,
        discount_savings: o ? o.discount_savings : 0, 
        discount_percentage: o ? o.discount_percentage : 0,
        banner_bg_color: o ? o.banner_bg_color : defaults.banner_bg_color, 
        banner_text_color: o ? o.banner_text_color : defaults.banner_text_color, 
        logo_url: o ? o.logo_url : defaults.logo_url, 
        image_url: o ? o.image_url : 'https://likeabucket.s3.amazonaws.com/3ssu4s1brr_1464979517277.jpg',
        custom_headline: o ? o.custom_headline : 'Your Custom Headline',
        tagline: o ? o.tagline : 'Your custom tagline...',
        email_input_label: o ? o.email_input_label : 'Subscribe and stay in the know!',
        about_offer: o ? o.about_offer : 'About your offer...',
        fine_print: o ? o.fine_print : 'The fine print for your offer...',
        about_business: o ? o.about_business : defaults.about_business,
        hours: o ? o.hours : defaults.hours,
        show_hours: o ? o.show_hours : defaults.show_hours,
        location_id: o ? o.location_id : defaults.location_id, 
        start_date: o ? o.start_date : moment(),  
        end_date: o ? o.end_date : moment().add(1, 'M'),
        preview_code: Math.random().toString(36).substr(2,10) + Math.random().toString(36).substr(2,10),
        social_icons: o ? o.social_icons : defaults.social_icons, 
        social_feeds: o ? o.social_feeds : defaults.social_feeds, 
        ad_message: o ? o.ad_message :  'Your ad message...', 
        ad_link: o ? o.ad_link :  'http://yourlink.com', 
        ad_image_url: o ? o.ad_image_url :  'https://likeabucket.s3.amazonaws.com/lhxuxzx6qo_1464896606697.jpg', 
        ad_headline: o ? o.ad_headline :  'Your Headline Here', 
        ad_description: o ? o.ad_description :  'Your ad description...', 
        email_receive_alerts: o ? o.email_receive_alerts : true,
        email_subject: o ? o.email_subject : 'Thank you!',
        email_replyto: o ? o.email_replyto : 'offers@youremail.com',
        email_headline: o ? o.email_headline : 'Present this coupon to redeem the offer below.',
        email_message: o ? o.email_message : 'Thank you for your interest in our business.'
    };

    State.get().offers.push(offer);
    
    browserHistory.push('/offers/edit-offer/' + id);

    //iterate new_offer_id for next time
    State.get().set('new_offer_id', id + 1);

    Utils.store(State.get()); 
    
}); 
