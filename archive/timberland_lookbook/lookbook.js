var LB = LB || {};

jQuery(function( $ ) {

  'use strict';

/**
* 
* lookbook.timberland.com
*
* LOOKBOOK
*
*/

  LB.Lookbook = {
    
    /* edit seasonal sections */
    section1: 'on_the_go',
    section2: 'in_the_city',
    section3: 'heritage',
    section4: 'celebrate',
    /* end sections */

    intro_timer: '',
    intro_in_progress: true,
    window_height: 600,
    user_scroll: false, //start as false to prevent triggering scroll event from Intro script
    prev_section: 'Intro',
    current_section: '',

    init: function() {
      this.cacheElements();
      this.bindEvents();
      this.windowResize();
      this.deeplink = '<?= $lookbook->lb_deeplink("|") ?>';
      this.routes(this.findEntrySection(this.deeplink));
      this.watchViewport();
      this.first_section = "on_the_go";
    },

    bindEvents: function() {
      var base = this;

      //share tracking
      base.$el.find('a.share').on('click', function(e){ e.preventDefault(); LB.Helper.trackShare($(this)); });
      //external link tracking
    //  base.$nav.find('#search_flyout a.guide_link').on('click', function(e){ e.preventDefault(); LB.Helper.trackExternalLink($(this), 'Guide Link'); });      
      base.$html.find('a.shop_link').on('click', function(e){ e.preventDefault(); LB.Helper.trackExternalLink($(this), 'Shop Link'); });      
      // Scroll
      base.$window.on('scroll', function(){ LB.Events.scrollEvent(base);} );  
      // window resize
      base.$window.resize( function(){ base.windowResize(); } );      
      // Product & Info Callout click open and close
      base.$callouts.find('.info_button').on('click', function(){ $(this).openCallout({'height':125}); });
      base.$callouts.find('.open_button').on('click', function(){ $(this).openCallout(); });
      base.$callouts.find('.close_button').on('click', function(){ $(this).closeCallout(); });      
      // Section link click
      base.$el.find('a.section_link').on( 'click' , function(e){ LB.Events.sectionLinkClick(e, base, $(this)); });
      //image mousover pan
      base.$pan_images.on('mouseenter', function(){ LB.Events.panImageMouseenter(base, $(this)); });
      base.$f13_nav.find('li').on({
        'mouseenter': function(){ LB.Events.f13NavEnter(base, $(this)) },
        'mouseleave': function(){ LB.Events.f13NavLeave(base, $(this)) }
      });
      base.$f13_nav.find('#lookbook_sections a').on('click', function(e){ LB.Events.sectionLinkClick(e, base, $(this)); });
      base.$el.on('section_change', function(){LB.Helper.trackSectionview(base); LB.Helper.backgroundChange(base);});
    },

    cacheElements: function() {
      this.$html = $('html, body');
      this.$window = $(window); 
      this.$el = $('#container');
      this.$nav = $('nav');
      this.$f13_nav = $('nav#f13_nav');
      this.$intro = $('#intro');
      this.$sections = this.$el.find('section.chapter');
      this.$intro_img_wrap = this.$intro.find('#intro_image_wrap');
      this.$callouts = this.$el.find('.product_callout, .info_callout');
      this.$pan_images = this.$el.find('.pan_image');
      this.section1_offset = this.$el.find('#' + this.section1).offset().top;
      this.section2_offset = this.$el.find('#' + this.section2).offset().top;
      this.section3_offset = this.$el.find('#' + this.section3).offset().top;
      this.section4_offset = this.$el.find('#' + this.section4).offset().top;
      this.$bgs = $('.background');
    },

    findEntrySection: function(deeplink){
      var array, section = '';
      if(deeplink !== ''){ 
        array = deeplink.split('|'); 
        section = array[0];
      }
      return section;
    },

    fixURL: function(url_entry){
      //	var no_lang = (location.pathname.indexOf('<?=$lookbook->treems_lang()?>') === -1) ? false : true; 
      if(url_entry === 'invalid'){ 
        var
        langs = ['en-gb', 'fr', 'es', 'it', 'de', 'jp', 'my', 'sg', 'zh', 'tw', 'hk'], 
        path = location.pathname,
        my_lang = 'en', //default is en
        state, IE_location;			

        for(var key = 0; key < langs.length; key++){
          if(path.indexOf(langs[key]) !== -1){
            my_lang = langs[key];
            break;
          }
        }

        state = '/' + my_lang + '/<?=$lookbook->lb_path()?>/';
        IE_location = '<?=$lookbook->treems_link()?>';

        if(Modernizr.history){ window.history.pushState(null, 'title', state); }
        else{ /*location = IE_location*/ }
      }

    },

    pageSetup: function(){
      $('img').lazyload({threshold:1200, event:"scrollstop", effect:"fadeIn"});
      LB.Helper.evenWidths($('.shop_button'), $('.share_button'));
    },

    routes: function(section){
      var 
      base = this,
//      hash = location.hash,
      //hash_section, 
      $intro_img,
      position;

      if(section === ''){
        LB.Intro.start(base);
      }
      else{
        //hash_section = LB.Helper.processHash(hash);
        base.intro_in_progress = false;
        base.user_scroll = true;
        base.pageSetup();

        position = $('#' + section).position().top -11;
        setTimeout(function(){
          base.$html.animate({scrollTop: position},750 /*, 
                             function(){
                               base.$nav.rollDown({'method': 1});
                             }*/
                            );
        },500);        
        setTimeout(function(){ 
          $intro_img = $('<img />')
            .attr("src", "<?= $lookbook->treems_asset('lookbook/main_image.jpg'); ?>")
            .attr('alt', 'Timberland Lookbook')
            .load(function(){
              base.$intro_img_wrap.append($intro_img);
            });
          base.$intro.find('.text_block').fadeIn(500);
        }, 1000);
      }
    },
    /**
     * Rather than attach more to a scroll event, 
     * this checks what the current section is every 300ms
     */
    watchViewport: function(){
      var base = this;
      setInterval(function(){
        base.prev_section = base.current_section;
        base.current_section = LB.Helper.getCurrentSection(base);
        if(base.prev_section !== base.current_section){
          base.$el.trigger('section_change');
          console.log('triggered');
        }
      }, 300);

    },

    windowResize: function(){
      var base = this;
      base.window_height = $(window).height();
      //base.$el.sizeIndicator({ 'nav': base.$nav });
    }

  }; //end Lookbook

  //START THE APP
  LB.Lookbook.init();

});
