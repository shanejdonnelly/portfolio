;(function ( $, window, document, undefined ) {

  var pluginName = "sgDropdown";

  var defaults = { };

  // The actual plugin constructor
  function Plugin ( element, options ) {
    this.element = element;
    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  // Avoid Plugin.prototype conflicts
  $.extend(Plugin.prototype, {

    sort_options: {},

    init: function () {

      //VARS
      var base = this;
      var $el = $(this.element);
      var $sort_select = $el.find('.sgDropdown-select'); 
      var $sort_dropdown = $el.find('.sgDropdown-dropdown'); 

      //
      //EVENTS
      //

      $sort_select.on('click', function(e){ console.log('click'); $sort_dropdown.hasClass('open') ? base.closeDropdown($sort_dropdown) : base.openDropdown($sort_dropdown); }); 
      //hide the tee time ul if click is elsewhere 
      $(document).on('mouseup', function(e) {
        var target = e.target; 
        //if target is select label, don't close here - let that handle the close
        //otherwise it closes and then opens again
        if(!$sort_select.is(target) && !$sort_dropdown.is(target) && $sort_dropdown.is(':visible')) { base.closeDropdown($sort_dropdown);}
      }); 


    },

    closeDropdown: function($dropdown){
      $dropdown.fadeOut(250).removeClass('open').addClass('closed');   
      //change to arrow down
      $dropdown.prev('.sgDropdown-select').addClass('arrow-down').removeClass('arrow-up');
    },

    openDropdown: function($dropdown){ 
      $dropdown.fadeIn(250).removeClass('closed').addClass('open');        
      //change to arrow up 
      $dropdown.prev('.sgDropdown-select').addClass('arrow-up').removeClass('arrow-down');
    }

  });

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[ pluginName ] = function ( options ) {
    this.each(function() {
      if ( !$.data( this, "plugin_" + pluginName ) ) {
        $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
      }
    });

    // chain jQuery functions
    return this;
  };

})( jQuery, window, document );
