var React = require('react');
var State = require('offers_state.js');
var _ = require('underscore');
var $ = require('jquery');
var Address = require('address.js');
var Map = require('map.js');
var SocialIcon = require('social_icon.js');
var SocialFeed = require('social_feed.js');
var Hours = require('templates/hours.js');
var OfferRow = require('templates/offer_row.js');

//css for this component
require('discount_template.scss');

module.exports = React.createClass({

  displayName: 'DiscountTemplate',

   newLinesToBreaks: function(text){ 
     var formatted_text = '';
     if(text){
        formatted_text = text.split('\n').map(function(item, index) {

      return (
        <span key={index}>
          {item}
          <br/>
        </span>
      );
    });
     }

    return formatted_text;
   }, 

   render: function(){ 
      var offer = this.props.offer_details; 
      var about_offer_section = null;
      var fine_print_section = null;
      var about_business_section = null;
      var hours_section = null; 

      var current_location = null;
      //slight difference between loading the location between builder and offer site view
      if(offer.source == 'offer_site'){
        current_location = offer.location; 
      }
      else{
        current_location = _.findWhere(State.get().locations, {id: parseInt(offer.location_id)}); 
      }
      //
      var address = current_location ? <Address _location={current_location} /> : null;
      var map = current_location ? <Map _location={current_location} /> : null;

      if(offer.about_offer !== ''){
        about_offer_section = 
          <div className="c-offer-preview__about-offer">
            <h3 className="c-offer-preview__section-headline">About The Offer</h3> 
            <span className="c-offer-preview__section-content">{this.newLinesToBreaks(offer.about_offer)}</span>
          </div>;
      }
      if(offer.fine_print !== ''){
        fine_print_section = 
          <div className="c-offer-preview__fine-print">
            <h3 className="c-offer-preview__section-headline">The Fine Print</h3> 
            <span className="c-offer-preview__section-content">{this.newLinesToBreaks(offer.fine_print)}</span>
          </div>;
      }
      if(offer.about_business !== ''){
        about_business_section = 
          <div className="c-offer-preview__about-business">
            <h3 className="c-offer-preview__section-headline">About Our Business</h3> 
            <span className="c-offer-preview__section-content">{this.newLinesToBreaks(offer.about_business)}</span> 
          </div>;
      }
      if(offer.show_hours){
        hours_section = 
          <div className="c-offer-preview__hours">
            <h3 className="c-offer-preview__section-headline">Hours</h3> 
            <Hours hours={offer.hours} show={offer.show_hours}/>
          </div>;
      }

      var social_icons = []; 
      var social_icons_row = null;
      if(offer.social_icons){
        offer.social_icons.forEach((network, i) => {
          if(network.selected){
            social_icons.push(<SocialIcon key={i} data={network} />);
          } 
        });
      } 
      if(social_icons.length){
        social_icons_row = 
            <div className="row c-offer-preview__icon-row">
              {social_icons}
            </div>; 
      }
      //this is for centering the social icons in the footer on mobile
      var mobile_footer_style = {width: (social_icons.length * 35) + 'px'};

      var social_feeds = []; 
      if(offer.social_feeds){
        offer.social_feeds.forEach((network, i) => {
          if(network.selected){
            social_feeds.push(
              <div className="c-offer-preview__third-col" key={i}>
                <h3 className="c-offer-preview__section-headline">{network.platform}</h3> 
                <div className="c-offer-preview__social-feed-wrap"> 
                  <SocialFeed data={network} />
                </div>
              </div> 
            );
          } 
        });
      } 


      return(
          <div className="c-offer-preview__template c-discount-template clearfix" > 

            <div className="row c-offer-preview__logo-row">
              <div className="c-offer-preview__col"> 
                <img className="c-offer-preview__logo" src={offer.logo_url} />
              </div>
              <div className="c-offer-preview__col">  
                <div className="c-offer-preview__address">
                    {address}
                </div>
              </div> 
            </div>

            {social_icons_row}

            <OfferRow offer_details={this.props.offer_details} referFormSubmit={this.props.referFormSubmit}  emailSubmit={this.props.emailSubmit} /> 

            <div className="row"> 

              <div className="c-offer-preview__col"> 
                {about_offer_section}
                {fine_print_section}
                {about_business_section}
                {hours_section}
              </div>

              <div className="c-offer-preview__col">
                <div className=" c-offer-preview__map"> 
                  {map} 
                </div>
              </div>

            </div> 

            <div className="row"> 

                  {social_feeds}

            </div> 

            <div className="row c-offer-preview__mobile-footer">
              <div className="c-offer-preview__social-icon-wrap" style={mobile_footer_style}>
                {social_icons}
              </div> 
            </div>

            <div className="row c-offer-preview__footer">
              Powered by <a href="https://likeablehub.com" title="LikeableHub - Social Media Automated" className="c-offer-preview__footer-link">LikeableHub</a>
            </div>
 
        </div>
        );
   }

}); 
