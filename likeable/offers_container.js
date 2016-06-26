var React = require('react');
import { Link } from 'react-router';
var SweetAlert = require('sweetalert-react');
var OffersDashboardContainer = require('offers_dashboard_container.js');
var Toolbar = require('toolbar.js');
var MainMenu = require('main_menu.js');
var State = require('offers_state.js'); 
var $ = require('jquery');

//css for this component
require('scss/offers_container.scss');

module.exports = React.createClass({

    displayName: 'OffersContainer',

    componentDidMount: function(){
      var _this = this;
      State.on('update', function(){ _this.forceUpdate(); }); 
      this.getUser(); 
      this.listen();
    }, 

    getInitialState: function(){
      return { 
          user: {features: {offers: false}, subscription_type: 'vip', social_accounts:[]} ,
          swal_text: 'This is placeholder text.',
          swal_title: 'FPO Title',
          swal_show: false,
          swal_type: 'success',
          swal_close_func: false ,
          swal_show_cancel: false
      }
    },

    getUser: function(){
      var _this = this;

      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/user.json');
      xhr.onload = function() {
        if (xhr.status === 200) {
          _this.setState({user: JSON.parse(xhr.responseText)}); 
        }
        else {
          alert('Request failed.  Returned status of ' + xhr.status);
        }
      };
      xhr.send();

    },


    getServerOffers: function(){
	var _this = this;

	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/offers-api/offers');
	xhr.onload = function() {
            if (xhr.status === 200) {
		var offers_data = JSON.parse(xhr.responseText);
		State.get().offers.set(offers_data.offers);
		State.get().locations.set(offers_data.locations);
		State.get().settings.set(offers_data.settings);
            }
            else {
		alert('Request failed.  Returned status of ' + xhr.status);
            }
	};
	xhr.send();

    },

    handleSwalShow: function(title, text, type, closeFunc, show_cancel){
        show_cancel = typeof(show_cancel) !== 'undefined' ? show_cancel : false;
        closeFunc = typeof(closeFunc) !== 'undefined' ? closeFunc : false;
        this.setState({swal_title: title, swal_text: text, swal_type: type, swal_show: true, swal_close_func: closeFunc, swal_show_cancel: show_cancel});
    },

    handleSwalCancel: function(){
        this.setState({swal_show: false});    
    },

    handleSwalConfirm: function(callback){ 
        if(this.state.swal_close_func){
          this.state.swal_close_func()
        }
        this.setState({swal_show: false});
    },

    listen: function(){
      var _this = this;
      $('body').on('swal', function(e, title, text, type, closeFunc, show_cancel){ _this.handleSwalShow(title, text, type, closeFunc, show_cancel); });     
      $('body').on('mongoError', function(e, res){ 
        if(res.code == 11000){ //duplicate url
          $('body').trigger('swal', ['Uh Oh...', 'Looks like someone has already taken that url, try another.', 'error']);        
        }
      });
    },

    render: function(){ 
        var offers = State.get().offers; 

        return(
        <div>
          <MainMenu user={this.state.user} />
          <Toolbar user={this.state.user} />
          <div className={"c-offers-container non-menu-content"}> 
            {React.cloneElement(this.props.children, {offers: offers, user: this.state.user})}
          </div>

          <SweetAlert show={this.state.swal_show} text={this.state.swal_text} title={this.state.swal_title} onConfirm={this.handleSwalConfirm} onEscapeKey={this.handleSwalCancel} type={this.state.swal_type} showCancelButton={this.state.swal_show_cancel} onCancel={this.handleSwalCancel} />

        </div>
        ); 
    }

});
