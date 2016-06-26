var React = require('react');
var State = require('offers_state.js');
var _ = require('underscore');
var ReactTooltip = require('react-tooltip');
var DatePicker = require('react-datepicker');
var moment = require('moment'); 
var NewLocationForm = require('forms/new_location_form.js');
var OfferFormSection = require('forms/offer_form_section.js');
var $ = require('jquery');

require('scss/react_datepicker.scss');

module.exports = React.createClass({

  displayName: 'DiscountForm',

  handleHideShowLocationForm: function(){
    this.setState({show_new_location_component: !this.state.show_new_location_component});
  },

  getInitialState: function(){
    return{ social_feeds: [], social_icons: [], show: 'type', show_new_location_component: false } 
  },

  handleSocialFeedCheckboxClick: function(e){ 
    var social_accounts = []; 
    this.props.offer_state.social_feeds.forEach(acct => {
        var temp = _.extend({}, acct);
        if(acct.id === e.target.id){
          temp.selected = e.target.checked;
        } 
        social_accounts.push(temp);
    });

    this.props.setState(null, social_accounts, 'social_feeds');
    this.props.setStore(null, social_accounts, 'social_feeds');
    
  }, 

  handleSocialIconCheckboxClick: function(e){ 
    var social_accounts = []; 
    this.props.offer_state.social_icons.forEach(acct => {
        var temp = _.extend({}, acct);
        if(acct.id === e.target.id){
          temp.selected = e.target.checked;
        } 
        social_accounts.push(temp);
    });

    this.props.setState(null, social_accounts, 'social_icons');
    this.props.setStore(null, social_accounts, 'social_icons');
    
  },

  getNextSection(sections, name){
    var section_names = sections.map(s => { return s.name; }); 
    var current_index = _.findIndex(section_names, function(s){ return s===name; }); 
    var next_section_name = section_names[current_index + 1] ? section_names[current_index + 1] : 'last';
    return next_section_name; 
  },

  handleSectionShow: function(name){
    var _this = this; 

      this.setState({show: name}, function(){  
        if(name === 'email'){ $('body').trigger('switchToEmailPreview'); }
        else if(name === 'ad'){ $('body').trigger('switchToAdPreview'); }
        else{ $('body').trigger('switchToOfferPreview'); }
      });   
  },

  makeForm: function(sections){
     var _this = this;
     var buttons = {
       continue : {type: 'button', text: 'Continue', class_name:'btn btn-solid-round-orange c-offer-form__continue-btn', handleClick:this.handleSectionShow},
       save : {type: 'link', text: 'Save', class_name:'btn btn-solid-round-orange c-offer-form__continue-btn', link:'/offers'}
     } 
     var form = [];

     sections.forEach((s, index) =>{

       var heading_index = index + 1;
       var next_section_name = _this.getNextSection(sections, s.name);

       //custom code for location 
       if(s.name === 'location'){
          var locations = State.get().locations; 
          var location_options = []; 
          var location_section = null; 
          locations.forEach((l, i) => { 
            location_options.push(<option key={i} value={l.id}>{l.name + ': ' + l.street_1 + ', ' + l.city + ', ' + l.state}</option>); 
          }); 

          if(_this.state.show_new_location_component){
              location_section = 
                <div className="c-offer-form__location-form-wrap"> 
                  <NewLocationForm hideShow={_this.handleHideShowLocationForm} setStore={_this.props.setStore} setState={_this.props.setState} /> 
                  <button className="btn btn-solid-round-orange c-offer-form__location-cancel-btn" onClick={_this.handleHideShowLocationForm}>Cancel</button> 
                </div>
          }
          else{
              location_section = 
                <div>
                  <div className="form-group">
                    <label htmlFor="discount_type">Select A Location<i data-tip data-for='location-help' className="fa fa-question-circle c-offer-form__help-icon"></i></label> 
                    <ReactTooltip id='location-help' type="dark" >
                      <span>To delete a location, go to the Dashboard and click on 'Manage Locations' in the Settings box.</span>
                    </ReactTooltip>
                    <select className="form-control" value={_this.props.offer_state.location_id} onChange={_this.props.setState} onBlur={_this.props.setStore} name="location_id">
                      {location_options}
                    </select>
                  </div> 
                  <span className="c-offer-form__location-or">Or</span> 
                  <button className="btn btn-orange c-offer-form__location-btn" onClick={_this.handleHideShowLocationForm}>Add A New Location</button> 
                </div>
          } 
          var section = 
            <div key={index}>
            <h3 className={"c-offer-form__heading " +(_this.state.show === 'location' ? 'active' : '')} onClick={_this.handleSectionShow.bind(_this, 'location', false)}>{heading_index + '. ' + s.heading}</h3> 
            <div className={_this.state.show === 'location' ? 'slider' : 'slider closed'}> 
              {location_section} 
              <button className="btn btn-solid-round-orange c-offer-form__continue-btn" onClick={_this.handleSectionShow.bind(_this, next_section_name, 'continue')}>Continue</button>
            </div>
            </div>
          form.push(section);
       }
       else{

         form.push(
           <OfferFormSection key={index} show={this.state.show === s.name}  showSection={this.handleSectionShow} section_name={s.name} heading={heading_index + '. ' + s.heading} fields={s.fields} setState={this.props.setState} setStore={this.props.setStore} button={buttons[s.button_type]} next_section_name={next_section_name} /> 
         );
       }
     });

     return form;
  },

  render: function(){
    var _this = this;
    var offer_details = this.props.offer_state; 
    var form = null;

    //
    // DEFINE FORM FIELDS  
    //
    var ad_fields = 
    [
      {name: 'ad_message', pretty_name: 'Message', type: 'textarea', validate: {error_type: 'warning', types: ['required', 'length'], length: 90, error_message: 'Recommended max text length is 90 characters.'}, value: offer_details.ad_message},        
      {name: 'ad_image_url', pretty_name: 'Image', type: 'ImageUploader', image_url: offer_details.ad_image_url, wrap_class: 'c-offer-form__image-upload-wrap'}, 
      {name: 'ad_headline', pretty_name: 'Headline', type: 'text', validate: {error_type: 'warning', types: ['required', 'length'], length: 25, error_message: 'Recommended max text length is 25 characters.'}, value: offer_details.ad_headline},
      {name: 'ad_description', pretty_name: 'Description', type: 'textarea', value: offer_details.ad_description},        
      {name: 'ad_link', pretty_name: 'Link', type: 'text', value: offer_details.ad_link} 
    ];

    var style_fields = 
    [
      {name: 'banner_bg_color', pretty_name: 'Banner Background Color', type: 'color', value: offer_details.banner_bg_color},
      {name: 'banner_text_color', pretty_name: 'Banner Text Color', type: 'color', value: offer_details.banner_text_color} 
    ];

    var email_fields = 
    [
      {name: 'email_receive_alerts', pretty_name: 'Email Notifications', type: 'checkbox', value: offer_details.email_receive_alerts},
      {name: 'email_subject', pretty_name: 'Email Subject', type: 'text', value: offer_details.email_subject},
      {name: 'email_replyto', pretty_name: 'Email Reply To Address', type: 'email', value: offer_details.email_replyto},
      {name: 'email_headline', pretty_name: 'Email Headline', type: 'text', value: offer_details.email_headline}, 
      {name: 'email_message', pretty_name: 'Email Message', type: 'textarea', value: offer_details.email_message, rows: '6'}
    ]; 

    var business_detail_fields = 
    [ 
      {name: 'about_business', pretty_name: 'About Business', type: 'textarea', value: offer_details.about_business},
      {name: 'logo_url', pretty_name: 'Logo Image', type: 'ImageUploader', image_url: offer_details.logo_url, wrap_class: 'c-offer-form__image-upload-wrap'},
      {name: 'show_hours', pretty_name: 'Show Hours', type: 'checkbox', value: offer_details.show_hours} 
    ];
    if(offer_details.show_hours){
        business_detail_fields.push({name: 'hours', pretty_name: 'Hours', type: 'hours', value: offer_details.hours});
    }
      
    var offer_basics_fields = 
    [ 
      {name: 'name', pretty_name: 'Offer Name', type: 'text', value: offer_details.name}, 
      {type: 'label', pretty_name: 'Offer Type', style: {paddingBottom: 0, paddingTop: '10px'}},
      {name: 'type', pretty_name: 'Type', type: 'select', options: [{name: 'discount', pretty_name: 'Discount'}, {name: 'refer_a_friend', pretty_name: 'Refer-A-Friend'}, {name: 'none', pretty_name: 'None'}], value: offer_details.type} , 
      {name: 'image_url', pretty_name: 'Main Image', type: 'ImageUploader', image_url: offer_details.image_url, wrap_class: 'c-offer-form__image-upload-wrap'}, 
    ]

    if(offer_details.type == 'discount' || offer_details.type == 'refer_a_friend'){
      offer_basics_fields.push({name: 'start_date', pretty_name: 'Start Date', type: 'moment', value: offer_details.start_date});
      offer_basics_fields.push({name: 'end_date', pretty_name: 'End Date', type: 'moment', value: offer_details.end_date}); 
    }

    var page_settings_fields = [];

    page_settings_fields.push({type: 'label', pretty_name: 'Social Network Icons', style: {paddingBottom: 0, paddingTop: '10px', borderTop: '1px solid #676e7d'}});

    if(offer_details.social_icons){
        offer_details.social_icons.forEach((s,i) => {
          var social_icon_field = {name: s.name, type: 'checkbox', pretty_name: s.platform + ': ' + s.name, click_handler: _this.handleSocialIconCheckboxClick, value: s.selected, id: s.id};
          page_settings_fields.push(social_icon_field);
        }); 
    }

    page_settings_fields.push({type: 'label', pretty_name: 'Social Network Feeds', style: {paddingBottom: 0, paddingTop: '10px', borderTop: '1px solid #676e7d'}});
    if(offer_details.social_feeds){
        var filtered_feeds = [];
        offer_details.social_feeds.forEach(feed => {
          //facebook profiles are not supported by newer embed
          if(feed.platform !== 'Facebook profile'){
            filtered_feeds.push(feed); 
          }
        });

        filtered_feeds.forEach((s,i) => {
          var social_feed_field = {name: s.name, type: 'checkbox', pretty_name: s.platform + ': ' + s.name, click_handler: _this.handleSocialFeedCheckboxClick, value: s.selected, id: s.id};
          page_settings_fields.push(social_feed_field);
        }); 
    } 

    var style_settings_fields = [];
    style_settings_fields.push({name: 'banner_bg_color', pretty_name: 'Banner Background Color', type: 'color', value: offer_details.banner_bg_color});
    style_settings_fields.push({name: 'banner_text_color', pretty_name: 'Banner Text Color', type: 'color', value: offer_details.banner_text_color});

    var buttons = {
      continue_button : {type: 'button', text: 'Continue', class_name:'btn btn-solid-round-orange c-offer-form__continue-btn', handleClick:this.handleSectionShow},
      save_button : {type: 'link', text: 'Save', class_name:'btn btn-solid-round-orange c-offer-form__continue-btn', link:'/offers'}
    } 

    var offer_detail_fields = [];

    //
    // PUSH IN CUSTOM FIELDS PER TYPE
    //
    if(offer_details.type === 'none'){ 
        offer_detail_fields.push({name: 'custom_headline', pretty_name: 'Headline', type: 'text', value: offer_details.custom_headline});
        offer_detail_fields.push({name: 'tagline', pretty_name: 'Tagline', type: 'text', value: offer_details.tagline}); 
    }
    else if(offer_details.type === 'discount'){ 
      offer_detail_fields.push({type: 'label', pretty_name: 'Discount Type', style: {paddingBottom: 0}});
      offer_detail_fields.push({name: 'discount_type', pretty_name: 'Discount Type', type: 'select', options: [{name: 'reduced_price', pretty_name: 'Reduced Price'}, {name: 'percentage_off', pretty_name: 'Percentage Off'}, {name: 'discount_custom', pretty_name: 'Custom Discount'}], value: offer_details.discount_type}); 
      //different discount types 
      if(offer_details.discount_type === 'reduced_price'){ 
        offer_detail_fields.push({name: 'original_price', pretty_name: 'Original Price', type: 'addon', addon: '$', width_class: 'half-width', addon_type:'pre', value: offer_details.original_price});
        offer_detail_fields.push({name: 'offer_price', pretty_name: 'Offer Price', type: 'addon', addon: '$', width_class: 'half-width', addon_type:'pre', value: offer_details.offer_price}); 
      }
      else if(offer_details.discount_type === 'percentage_off'){ 
        offer_detail_fields.push({name: 'discount_percentage', pretty_name: 'Discount Percentage', type: 'addon', addon: '%', width_class: 'half-width', addon_type:'post', value: offer_details.discount_percentage}); 
        offer_detail_fields.push({name: 'tagline', pretty_name: 'Tagline', type: 'text', value: offer_details.tagline}); 
      }
      else if(offer_details.discount_type === 'discount_custom'){ 
        offer_detail_fields.push({name: 'custom_headline', pretty_name: 'Headline', type: 'text', value: offer_details.custom_headline});
        offer_detail_fields.push({name: 'tagline', pretty_name: 'Tagline', type: 'text', value: offer_details.tagline}); 
      } 

      offer_detail_fields.push({name: 'about_offer', pretty_name: 'About Offer', type: 'textarea', value: offer_details.about_offer});
      offer_detail_fields.push({name: 'fine_print', pretty_name: 'Fine Print', type: 'textarea', value: offer_details.fine_print});

    }
    else if(offer_details.type === 'refer_a_friend'){ 
      offer_detail_fields.push({name: 'custom_headline', pretty_name: 'Headline', type: 'text', value: offer_details.custom_headline});
      offer_detail_fields.push({name: 'tagline', pretty_name: 'Tagline', type: 'text', value: offer_details.tagline}); 
      offer_detail_fields.push({name: 'about_offer', pretty_name: 'About Offer', type: 'textarea', value: offer_details.about_offer});
      offer_detail_fields.push({name: 'fine_print', pretty_name: 'Fine Print', type: 'textarea', value: offer_details.fine_print}); 
    } 

    offer_detail_fields.push({name: 'email_input_label', pretty_name: 'Email Input Label', type: 'text', value: offer_details.email_input_label});

    //
    // DEFINE FORM SECTIONS
    // 
    var discount_sections = [
         { name: 'type', heading: 'Offer Basics', button_type: 'continue', fields: offer_basics_fields},
         { name: 'offer_details', heading: 'Offer Details', button_type: 'continue', fields: offer_detail_fields}, 
         { name: 'business_details', heading: 'Business Details', button_type: 'continue', fields: business_detail_fields}, 
         { name: 'location', heading: 'Choose Location', button_type: 'continue'}, 
         { name: 'page_settings', heading: 'Page Settings', button_type: 'continue', fields: page_settings_fields}, 
         { name: 'style_settings', heading: 'Page Colors', button_type: 'continue', fields: style_settings_fields}, 
         { name: 'email', heading: 'Email Response', button_type: 'continue', fields: email_fields},
         { name: 'ad', heading: 'Create Your Ad', button_type: 'save', fields: ad_fields} 
    ];

    var refer_a_friend_sections = [
         { name: 'type', heading: 'Offer Basics', button_type: 'continue', fields: offer_basics_fields}, 
         { name: 'offer_details', heading: 'Offer Details', button_type: 'continue', fields:offer_detail_fields }, 
         { name: 'business_details', heading: 'Business Details', button_type: 'continue', fields: business_detail_fields}, 
         { name: 'location', heading: 'Choose Location', button_type: 'continue' }, 
         { name: 'page_settings', heading: 'Page Settings', button_type: 'continue', fields: page_settings_fields}, 
         { name: 'style_settings', heading: 'Page Colors', button_type: 'continue', fields: style_settings_fields}, 
         { name: 'email', heading: 'Email Response', button_type: 'save', fields: email_fields},
         { name: 'ad', heading: 'Create Your Ad', button_type: 'save', fields: ad_fields} 
    ];

    var no_offer_sections = [
         { name: 'type', heading: 'Offer Basics', button_type: 'continue', fields: offer_basics_fields}, 
         { name: 'offer_details', heading: 'Offer Details', button_type: 'continue', fields:offer_detail_fields },
         { name: 'business_details', heading: 'Business Details', button_type: 'continue', fields:business_detail_fields }, 
         { name: 'location', heading: 'Choose Location', button_type: 'continue' }, 
         { name: 'page_settings', heading: 'Page Settings', button_type: 'continue', fields: page_settings_fields}, 
         { name: 'style_settings', heading: 'Page Colors', button_type: 'continue', fields: style_settings_fields}, 
         { name: 'email', heading: 'Email Response', button_type: 'save', fields: email_fields},
         { name: 'ad', heading: 'Create Your Ad', button_type: 'save', fields: ad_fields} 
    ];
    
    //
    // MAKE THE FORM
    //
    if(offer_details.type === 'none'){ 
      form = this.makeForm(no_offer_sections);
    }
    else if(offer_details.type === 'discount'){ 
      form = this.makeForm(discount_sections);
    }
    else if(offer_details.type === 'refer_a_friend'){ 
      form = this.makeForm(refer_a_friend_sections);
    } 

    return(
      <div className="c-offer-form">

        <div className="c-offer-form__preview-btn-wrap">
        <a target="_blank" href={location.origin + '/offers/preview/' + offer_details.preview_code} className="c-offer-form__preview-btn btn btn-orange">Preview Offer<i className="fa fa-external-link c-offer-form__preview-btn"></i></a>
        </div>

        {form}

      </div>
    );
  }

});
