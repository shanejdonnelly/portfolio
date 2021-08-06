var LB = LB || {};

jQuery(function( $ ) {

  'use strict';


/**
*
* EVENTS
*
*/

  LB.Events = {

    f13NavEnter: function(base, $this){
      $this.doTimeout('hover_delay', 250, function(){
        $this.find('.f13_nav_flyout').fadeIn(500);
      });
    },

    f13NavLeave: function(base, $this){
      $this.doTimeout('hover_delay', 250, function(){
        $this.find('.f13_nav_flyout').fadeOut(500);
      });
    },

    sectionLinkClick: function(e, base, $this){
      e.preventDefault();
      if(base.intro_in_progress){ LB.Intro.end(base, 'hard'); }

      var
      section = $this.data('section'),
      position = $('#' + section ).position().top,
      current_path = location.pathname,
      path = current_path;

      //    if(current_path.slice(-1) !== '/'){ path = path + '/'; }

      base.$html.animate({scrollTop: position},750);
      //      if(Modernizr.history){ window.history.replaceState(null, 'title', path + section); }     
    },

    scrollEvent: function(base){
      var      
      el_top = base.$el.offset().top,
      offset = el_top - (base.$window.scrollTop() - 1050),
      nav_ratio = ( base.$nav.height() - base.$nav.find('#nav_search').height() -3 ) / (base.$html.height() -1050),
      nav_position = (offset * -1) * nav_ratio + 2; //2 is added for padding
      if(base.intro_in_progress && base.user_scroll){ LB.Intro.end(base, 'scroll'); }
      base.$nav.find('#indicator').animate({ 'top' : nav_position }, 20);
    },

    navClick: function(e, base, $this){
      e.preventDefault();
      if(base.intro_in_progress){ LB.Intro.end(base, 'hard'); }

      var
      $clicked = $this.parent('a'),
      section = $clicked.data('section'),
      position = $('#' + section ).position().top;

      base.$html.animate({scrollTop: position},750);

      //if we're not already in this section, track a new pageview
      //if($('#' + section ).isnot(':in-viewport')){ LB.Helper.trackPageview(section); }
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
              var tooltip_html = '<p>' + $(this).data('tooltip') + '</p>';
              $('#tooltip').css('background-position', $(this).data('tooltip-image'));
              $tooltip.html(tooltip_html);
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
      $content = $flyout.find('li a'),
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
        $content.hide().fadeIn(500);
        $flyout
        //					.css({'height':24, 'width':24})
        .show()
        .animate({'height':108, 'width': 155}, 500 );
      });
    },

    navSearchLeave: function(base){
      var
      $flyout = base.$nav.find('#search_flyout'),
      $content = $flyout.find('li a');
      $.doTimeout('nav_search', 250, function(){
        $content.fadeOut(400);
        $flyout.animate({'height':24, 'width':24}, 500, function(){$flyout.hide(); });
      });
    },

    panImageMouseenter: function(base, $this ){
      var 
      left = $this.css('left'),
      right = $this.css('right'),
      top = $this.css('top'),
      bottom = $this.css('bottom'),
      position = $this.data('position'),
      duration = ( $this.data('pan-speed') === '' ) ? 2000 : $this.data('pan-speed'),
      in_motion = $this.data('in_motion');
      /* 
      if($this.hasClass('already_animated')){
      if($this.hasClass('pan_top')){ //.pan_top css class
      $this.stop().animate({'top':position }, {'queue':false, 'duration': duration}).removeClass('already_animated');
      }
      else if($this.hasClass('pan_bottom')){ //.pan_bottom css class
      $this.stop().animate({'bottom':position }, {'queue':false, 'duration': duration}).removeClass('already_animated');
      }      
      else if($this.hasClass('pan_right')){ //.pan_right css class
      $this.stop().animate({'right':position }, {'queue':false, 'duration': duration}).removeClass('already_animated');
      }
      else{ //.pan_left css class
      $this.stop().animate({'left':position }, {'queue':false, 'duration': duration}).removeClass('already_animated');        
      }		
      }
      else{              */
      if(in_motion !== 'true'){
        $this.data('in_motion', 'true');
        if($this.hasClass('pan_top')){ //.pan_top css class
          $this.animate({'top':0 }, {'queue':false, 'duration': duration}).addClass('already_animated').data('position', top);
        }
        else if($this.hasClass('pan_bottom')){ //.pan_bottom css class
          $this.animate({'bottom':0 }, {'queue':false, 'duration': duration}).addClass('already_animated').data('position', bottom);
        }      
        else if($this.hasClass('pan_right')){ //.pan_right css class
          $this.animate({'right':0 }, {'queue':false, 'duration': duration}).addClass('already_animated').data('position', right);
        }
        else{ //.pan_left css class
          $this.animate({'left':0 }, {'queue':false, 'duration': duration}).addClass('already_animated').data('position', left);        
        }
        _gaq.push(['_trackEvent', 'Animation Fired', $this.attr('src')]);
        // }
      }
    },

    gifRolloverEnter: function(base, $this){
      $this.find('img').hide();
      $this.find('img.anim_gif').show();
    },

    sectionChange: function(base){
      LB.Helper.trackSectionview(base);
    }
  }; //end Events
});
