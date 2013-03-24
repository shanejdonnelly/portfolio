var LB = LB || {};

jQuery(function( $ ) {

  'use strict';

  /**
*
* INTRO
*
**/

  LB.Intro = {

    start: function(base) {
      var
      img_src = base.$intro_img_wrap.data('intro_image'),
      $img,
      top = 1500 - base.window_height;

      base.$html.scrollTop(0); //make sure we're at the top of page when we begin

      $img = $('<img />')
      .attr('src', img_src)
      .load(function(){
        base.$intro_img_wrap.append($img);
        base.$intro.fadeIn(1000); 

        //scroll down to boat on intro image
        base.$html.animate({scrollTop: top}, 1500, function(){
          setTimeout(function(){base.user_scroll = true; }, 200); //script scrolling done 
          //base.$nav.rollDown({'method': 1, 'indicator_timer':1000}, function(){ 
          base.$intro.find('.text_block').fadeIn(500);
          //});    
        }); 

        //give user time to see landing text, then end intro
        base.intro_timer = setTimeout( function(){ 
          if(base.intro_in_progress){ LB.Intro.end(base, 'hard');} 
        },18000);
      });
    },

    end: function(base, end_style){
      var position;
      end_style = (typeof end_style === 'undefined') ? 'hard' : end_style;      

      base.pageSetup();
      position = $('#' + base.first_section).position().top;
      base.$html.animate({scrollTop: position},1000);

      //setTimeout(function(){ base.$html.css('overflow', 'auto');},500);
      clearTimeout(base.intro_timer);
      base.intro_in_progress = false;
    }

  };
});
