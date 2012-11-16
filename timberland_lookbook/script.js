jQuery(function( $ ) {
  
	'use strict';
  
/**
*
*  LOOKBOOK
*
**/

	var Lookbook = {
    
		intro_timer: '',
    intro_in_progress: true,
    window_height: 600,
    user_scroll: false, //start as false to prevent triggering scroll event from Intro script
    
    init: function() {
			this.cacheElements();
      this.bindEvents();
      this.windowResize();
      this.routes();
		},
    
		bindEvents: function() {
      var base = this;
      
      // Scroll
      base.$window.on('scroll', function(){ Events.scrollEvent(base);} );
      // window resize
      base.$window.resize( function(){ base.windowResize(); } );      
      // Nav Click
      base.$nav.find('ul#main_nav_ul li').on( 'click' , function(e){ Events.navClick(e, base, $(this)); });
      // Product & Info Callout click open and close
      base.$callouts.find('.info_button').on('click', function(){ $(this).openCallout({'height':125}); });
      base.$callouts.find('.open_button').on('click', function(){ $(this).openCallout(); });
      base.$callouts.find('.close_button').on('click', function(){ $(this).closeCallout(); });      
      //Nav hover
      Events.navHover(base);
      // Section link click
      base.$el.find('a.section_link').on( 'click' , function(e){ Events.sectionLinkClick(e, base, $(this)); });
      //image mousover pan
      base.$pan_images.on('mouseenter', function(){ Events.panImageMouseenter(base, $(this)); });
      base.$pan_images.on('mouseleave', function(){ Events.panImageMouseleave(base, $(this)); });
			//pretend movie rollover
      base.$el.find('.gif_rollover').on('mouseenter', function(){ Events.gifRolloverEnter(base, $(this)); });
      //nav search icon hover
      base.$nav.find('#nav_search').on('mouseenter', function(){ Events.navSearchEnter(base); });
      base.$nav.find('#nav_search').on('mouseleave', function(){ Events.navSearchLeave(base); });
		},
        
		cacheElements: function() {
      this.$html = $('html, body');
      this.$window = $(window);
			this.$el = $('#container');
      this.$nav = $('nav');
      this.$intro = $('#intro');
      this.$sections = this.$el.find('section.chapter');
      this.$intro_img_wrap = this.$intro.find('#intro_image_wrap');
      this.$callouts = this.$el.find('.product_callout, .info_callout');
      this.$pan_images = this.$el.find('.pan_image');
		},
    
    pageSetup: function(){
      $('img').lazyload({threshold:1200, event:"scrollstop", effect:"fadeIn"});
      Helper.evenWidths($('.shop_button'), $('.share_button'));
    },

    routes: function(){
      var 
        base = this,
        hash = location.hash,
        hash_section, position;

      if(hash === ''){
        Intro.start(base);
      }
      else{
        hash_section = Helper.processHash(hash);
        base.intro_in_progress = false;
        base.user_scroll = true;
        base.pageSetup();
        
        position = $(hash).position().top -11;
        setTimeout(function(){
          base.$html.animate({scrollTop: position},750, 
            function(){
              base.$nav.rollDown({'method': 1});
            }
          );
        },500);        
        setTimeout(function(){ 
          base.$intro_img_wrap.append('<img src="images/sailboat.jpg" />'); 
          base.$intro.find('.text_block').fadeIn(500);
        }, 1000);
      }
    },

    windowResize: function(){
      var base = this;
      base.window_height = $(window).height();
      base.$el.sizeIndicator({ 'nav': base.$nav });
    }
        
  }; //end Lookbook

/**
*
* EVENTS
*
**/

  var Events = {

    sectionLinkClick: function(e, base, $this){
      e.preventDefault();
      if(base.intro_in_progress){ Intro.end(base, 'hard'); }
      
      var
        section = $this.data('section'),
        position = $('#' + section ).position().top;

      base.$html.animate({scrollTop: position},750);
    },
     
    scrollEvent: function(base){
      var      
        el_top = base.$el.offset().top,
        offset = el_top - (base.$window.scrollTop() - 1050),
        nav_ratio = ( base.$nav.height() - base.$nav.find('#nav_search').height() -3 ) / (base.$html.height() -1050),
        nav_position = (offset * -1) * nav_ratio + 2; //2 is added for padding
      if(base.intro_in_progress && base.user_scroll){ Intro.end(base, 'scroll'); }
      base.$nav.find('#indicator').animate({ 'top' : nav_position }, 20);
    },
    
    navClick: function(e, base, $this){
      e.preventDefault();
      if(base.intro_in_progress){ Intro.end(base, 'hard'); }
      
      var
        $clicked = $this.parent('a'),
        section = $clicked.data('section'),
        position = $('#' + section ).position().top;

      base.$html.animate({scrollTop: position},750);
    },
    
    navHover: function(base){
      
      base.$nav.find('ul#main_nav_ul').on({
        mouseenter: function(){
          var $tooltip = base.$nav.find('#tooltip');
          
          $(this).find('#indicator').fadeOut(250);
          $tooltip.fadeIn(250);
          
          //mousemove
          base.$nav.mousemove( function(e){
            var tooltip_top = e.pageY - base.$nav.offset().top - 9;
            $tooltip.css('top', tooltip_top);
          });
          
          //mouseenter sections
          $(this).find('div').not('#indicator, #tooltip').on({
              mouseenter: function(){
                $tooltip.html('<p>' + $(this).data('tooltip') + '</p>');
              },
              mouseleave: function(){
                $tooltip.html(' ');
              }
            });
        },
        mouseleave: function(){
          base.$nav.find('#tooltip').fadeOut(250);
          $(this).find('#indicator').fadeIn(250);
        }
      });
    }, //end Nav hover
    
    navSearchEnter: function(base){
      var 
        $flyout = base.$nav.find('#search_flyout'),
        height = $flyout.height(),
        width = $flyout.width();
			$.doTimeout('nav_search', 250, function(){
				if(typeof $flyout.data('height') === 'undefined'){
					$flyout.data('height', height);
					$flyout.data('width', width);
				}
				else{
					height = $flyout.data('height');
					width = $flyout.data('width');
				}
					
				$flyout
					.css({'height':24, 'width':24})
					.show()
					.animate({'height':height, 'width': width}, 500 );
			});
    },
    
    navSearchLeave: function(base){
      var
        $flyout = base.$nav.find('#search_flyout');
			$.doTimeout('nav_search', 250, function(){
				$flyout.animate({'height':24, 'width':24}, 500, function(){$flyout.hide(); });
			});
    },
    
    panImageMouseenter: function(base, $this ){
      var 
        left = $this.css('left'),
        right = $this.css('right'),
        top = $this.css('top'),
        bottom = $this.css('bottom');
      
      if($this.hasClass('pan_top')){ //.pan_top css class
        $this.animate({'top':0 }, 2000, function(){animate_back($this, 'top', top); });
      }
      else if($this.hasClass('pan_bottom')){ //.pan_bottom css class
        $this.animate({'bottom':0 }, 2000, function(){animate_back($this, 'bottom', bottom); });
      }      
      else if($this.hasClass('pan_right')){ //.pan_right css class
        $this.animate({'right':0 }, 2000, function(){animate_back($this, 'right', right); });
      }
      else{ //.pan_left css class
        $this.animate({'left':0 }, 2000, function(){animate_back($this, 'left', left); });        
      }
      
      function animate_back($el, direction, value){
        var 
          animation_args = {};
          animation_args[direction] = value;
        
        if($el.hasClass('animate_back')){
          setTimeout(function(){$el.animate(animation_args, 2000);}, 1000);
        }
      }
    },
    
    panImageMouseleave: function(base, $this){
      $this.stop();
    },
		
		gifRolloverEnter: function(base, $this){
      $this.find('img').hide();
      $this.find('img.anim_gif').show();
		}
        
  }; //end Events

/**
*
* INTRO
*
**/

  var Intro = {
        
		start: function(base) {
      var
        img_src = base.$intro_img_wrap.data('intro_image'),
        $img,
        top = 1500 - base.window_height;
       
       base.$html.scrollTop(0); //make sure we're at the top of page when we begin
        
        $img = $('<img />')
          .attr('src', 'images/' + img_src)
          .load(function(){
            base.$intro_img_wrap.append($img);
            base.$intro.fadeIn(1000);
            base.pageSetup();
            
            
            //scroll down to boat on intro image
            base.$html.animate({scrollTop: top}, 1500, function(){
              setTimeout(function(){base.user_scroll = true; }, 200); //script scrolling done 
              base.$nav.rollDown({'method': 1, 'indicator_timer':1000}, function(){ 
                base.$intro.find('.text_block').fadeIn(500);
              });    
            });
            
            //give user time to see landing text, then end intro
            base.intro_timer = setTimeout( function(){ 
              if(base.intro_in_progress){ Intro.end(base, 'slow');} 
            }, 14000);
          });
		},
    
    end: function(base, end_style){
      var position;
      end_style = (typeof end_style === 'undefined') ? 'slow' : end_style;      
      /*
      if(end_style === 'slow'){
        //shrink the intro while scrolling to keep page at top of window
        base.$intro.animate({'height': 0, 'opacity': 0}, 1000 );
        base.$html.animate({scrollTop: 0}, 1000 );      
      }
      else if(end_style === 'hard'){
        base.pageSetup();
        base.$intro.css('height', 0);
      }
      */
      
      if(end_style === 'scroll' || end_style === 'hard'){ 
        base.pageSetup(); 
      }
      else{
        position = $('#arrival').position().top;
        base.$html.animate({scrollTop: position},750);
      }
      
      //setTimeout(function(){ base.$html.css('overflow', 'auto');},500);
      clearTimeout(base.intro_timer);
      base.intro_in_progress = false;
    }
    
  };

/**
*
* HELPERS
*
**/
	var Helper = {
    
    evenWidths: function($el1, $el2){
      var 
        el1_width = $el1.first().width(),
        el2_width = $el2.first().width(),
        wider = el1_width;
      
      if(el2_width > wider){ 
        wider = el2_width;
        $el1.width(el2_width);
        $el2.width(el2_width);
      }
      else{
        $el2.width(el1_width);
        $el1.width(el1_width);
      }      
    },

    processHash: function(hash){
      var hash_array, hash_section;
      
      hash_array = hash.split("_");
      hash_section = hash_array[0].slice(1, hash_array[0].length);            
      return hash_section;
    }
    
	};//end Helper

  //START THE APP
	Lookbook.init();

});
