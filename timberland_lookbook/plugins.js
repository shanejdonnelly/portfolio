/*
*
* RollDown Nav
*
*/
;(function( $ ){

  $.fn.rollDown = function( options, callback ) {  

    var settings = $.extend( {
      'interval'        : 20,
      'li_height'       : 6,
      'method'          : 1,
      'indicator_timer' : 0
    }, options);

    return this.each(function() {        
      
      var 
        $el = $(this),
        $indicator = $el.find('#indicator'),
        $lis = $el.find('#main_nav_ul li'),
        num_lis = $lis.length,
        index = num_lis,
        cur_top = 0,
        timer;
      
      $el.fadeIn(1500);
      
      if(settings.method === 1){
        timer = setInterval(function(){ dropIn(); }, settings.interval);
        
        function dropIn(){
            
            $lis.eq(index).animate({'top': index * (settings.li_height +1), 'height': settings.li_height}, 500);
            if(index === 1){ 
              clearInterval(timer);
              setTimeout(function(){ $lis.first().animate({'height':27, 'top':-21}, 500); }, 500);
              if (typeof callback === 'function') { // make sure the callback is a function
                setTimeout(function(){
                  callback.call(this); // brings the scope to the callback
                }, 500);
              }
              
              setTimeout(function(){ 
                $indicator.fadeIn(500); 
                $lis.find('p').fadeIn(500); 
                $lis.not(':first').css('border-top', '1px solid gray').css('margin-top', 0);
              }, settings.indicator_timer);
            }
            index--;
        } 
      }
      else{
        $lis.each(function(){
          $(this).animate({'top': cur_top, 'height': settings.li_height}, 1000);
            cur_top = cur_top + (settings.li_height + 1);
        });
      }
      
    });

  };
})( jQuery );

/*
*
* Get height of hidden element 
*
*/
;(function( $ ){

  $.fn.hiddenHeight = function( ) {  
                
        var
          $el = $(this);

        $el.css({
            visibility: 'hidden',
            display:    'block'
        });

        height = $el.height();
        console.log(height);

        $el.css({
            visibility: 'visible',
            display:    'none'
        });
        
       return height;       
   
  };
})( jQuery );
  
/*
*
* Open Product Callout
*
*/
;(function( $ ){

  $.fn.openCallout = function( options ) {  

    var settings = $.extend( {
      "width" :  235,
      "height":  186
    }, options);

    return this.each(function() {        
      
      var 
        $callout = $(this).parents('.product_callout, .info_callout'),
        $content = $callout.find('h3, p'),
				$color_wrapper = $callout.find('.color_wrapper'),
        $h6 = $(this).parent('h6'),
        $open_button = $(this),
        $close_button = $callout.find('.close_button'),
        height = 0,
        $open_callout = '',
        horz_direction = $callout.data('horz_direction'),
        left = (typeof horz_direction === "undefined") ? 0 : (settings.width * -1),
        vert_direction = $callout.data('vert_direction'),
        top = (typeof vert_direction === "undefined") ? 0 : (settings.height * -1),
				final_height, num_colors;
				
				function findHeight($el, chars){
					var 
						lines = ( $el.text().length / chars ),
						height = ( Math.ceil(lines) * 18 ) + 16;
					return height;
				}
      
			num_colors = $callout.find('.color').length;
			
				$callout.find('p').each(function(){   
					height += findHeight($(this), 35);
					console.log($(this).text() + ' ' + height)
				});
				height += ($callout.find('h3').text().length > 0) ? findHeight($callout.find('h3'), 30) : 8 ;
				console.log(height)
				if(num_colors > 0){
					height += (num_colors < 7) ? 16 : 45;
					console.log(height)
				}
			
			
      //close any open sibling callouts
      $open_callout = $callout.parent().find('.open_callout').find('.close_button');
      if($open_callout !== '' ){
        $open_callout.closeCallout();
      }
      
      //in case it's an info callout
      $callout.removeClass('round_btn');
      
      $callout.removeClass('closed_callout').addClass('open_callout');
      $open_button.fadeOut(500, function(){ 
        //if(left !== 0){ $h6.css('left', 220); }
        $close_button.fadeIn(500);
        $close_button.css('display', 'block');
      });
      
			final_height = (height === 0) ? settings.height : (height);
      $callout.animate({ 'width' : settings.width , 'height' : final_height, 'margin-left': left, 'margin-top': top }, 500, 
        //callback - visibility is necessary to grab the height when content is "hidden"
        function(){ 
          $content.fadeIn(350);      
          $color_wrapper.css('visibility', 'visible');
					$callout.find('.shop_button').fadeIn(350);
          $callout.find('.share_button').fadeIn(350);
      });
    });

  };
})( jQuery );
  
/*
*
* Close Product Callout
*
*/
;(function( $ ){

  $.fn.closeCallout = function( options ) {  

    var settings = $.extend( {
      
    }, options);

    return this.each(function() {        

      var 
        $callout = $(this).parents('.product_callout, .info_callout'),
        $content = $callout.find('h3, p'),
				$color_wrapper = $callout.find('.color_wrapper'),
        $h6 = $(this).parent('h6'),
        $open_button = $callout.find('.open_button, .info_button'),
        $close_button = $(this),
        height = 0;        
      
      $callout.removeClass('open_callout').addClass('closed_callout');
      
      $close_button.fadeOut(150, function(){ 
        $h6.css('left', 0); //in case the direction is left and we've moved the button to the right
        $open_button.fadeIn(150);
      });
      
      $callout.find('.shop_button').fadeOut(150);
      $callout.find('.share_button').fadeOut(150);
      
      $content.fadeOut(250); 
			$color_wrapper.css('visibility', 'hidden');
      $callout.animate({ 'width' : 22 , 'height' : 22, 'margin-left':0, 'margin-top':0 }, 300, function(){
        //if it's an info callout we need to round the corners after we close it
        if($callout.hasClass('info_callout')){ $callout.addClass('round_btn'); }        
      });
      
      
    });

  };
})( jQuery );

/*
*
* Scale nav Indicator to represent window size
*
*/
;(function( $ ){

  $.fn.sizeIndicator = function( options ) {  

    var settings = $.extend( {
      'nav': $('nav')
    }, options);

    return this.each(function() {        

      var 
        $el = $(this),
        $nav = settings.nav,
        el_height = $el.height(),
        ratio = $(window).height() / el_height,
        indicator_height = $nav.height() * ratio,
        $indicator = $nav.find('#indicator');      
        
      $indicator.height(indicator_height);
      
    });
  };
})( jQuery );

/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2012 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.8.1-dev
 *
 */
;(function(a,b){var c=a(b);a.fn.lazyload=function(d){function h(){var b=0;e.each(function(){var c=a(this);if(g.skip_invisible&&!c.is(":visible"))return;if(!a.abovethetop(this,g)&&!a.leftofbegin(this,g))if(!a.belowthefold(this,g)&&!a.rightoffold(this,g))c.trigger("appear"),b=0;else if(++b>g.failure_limit)return!1})}var e=this,f,g={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null};return d&&(undefined!==d.failurelimit&&(d.failure_limit=d.failurelimit,delete d.failurelimit),undefined!==d.effectspeed&&(d.effect_speed=d.effectspeed,delete d.effectspeed),a.extend(g,d)),f=g.container===undefined||g.container===b?c:a(g.container),0===g.event.indexOf("scroll")&&f.bind(g.event,function(a){return h()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,c.one("appear",function(){if(!this.loaded){if(g.appear){var d=e.length;g.appear.call(b,d,g)}a("<img />").bind("load",function(){c.hide().attr("src",c.data(g.data_attribute))[g.effect](g.effect_speed),b.loaded=!0;var d=a.grep(e,function(a){return!a.loaded});e=a(d);if(g.load){var f=e.length;g.load.call(b,f,g)}}).attr("src",c.data(g.data_attribute))}}),0!==g.event.indexOf("scroll")&&c.bind(g.event,function(a){b.loaded||c.trigger("appear")})}),c.bind("resize",function(a){h()}),a(document).ready(function(){h()}),this},a.belowthefold=function(d,e){var f;return e.container===undefined||e.container===b?f=c.height()+c.scrollTop():f=a(e.container).offset().top+a(e.container).height(),f<=a(d).offset().top-e.threshold},a.rightoffold=function(d,e){var f;return e.container===undefined||e.container===b?f=c.width()+c.scrollLeft():f=a(e.container).offset().left+a(e.container).width(),f<=a(d).offset().left-e.threshold},a.abovethetop=function(d,e){var f;return e.container===undefined||e.container===b?f=c.scrollTop():f=a(e.container).offset().top,f>=a(d).offset().top+e.threshold+a(d).height()},a.leftofbegin=function(d,e){var f;return e.container===undefined||e.container===b?f=c.scrollLeft():f=a(e.container).offset().left,f>=a(d).offset().left+e.threshold+a(d).width()},a.inviewport=function(b,c){return!a.rightofscreen(b,c)&&!a.leftofscreen(b,c)&&!a.belowthefold(b,c)&&!a.abovethetop(b,c)},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return!a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})})(jQuery,window)

/* Scroll stop plugin
/* http://james.padolsey.com/javascript/special-scroll-events-for-jquery/ */
;(function(){var a=jQuery.event.special,b="D"+ +(new Date),c="D"+(+(new Date)+1);a.scrollstart={setup:function(){var c,d=function(b){var d=this,e=arguments;c?clearTimeout(c):(b.type="scrollstart",jQuery.event.handle.apply(d,e)),c=setTimeout(function(){c=null},a.scrollstop.latency)};jQuery(this).bind("scroll",d).data(b,d)},teardown:function(){jQuery(this).unbind("scroll",jQuery(this).data(b))}},a.scrollstop={latency:300,setup:function(){var b,d=function(c){var d=this,e=arguments;b&&clearTimeout(b),b=setTimeout(function(){b=null,c.type="scrollstop",jQuery.event.handle.apply(d,e)},a.scrollstop.latency)};jQuery(this).bind("scroll",d).data(c,d)},teardown:function(){jQuery(this).unbind("scroll",jQuery(this).data(c))}}})()

// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

// make it safe to use console.log always
;(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
;(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());

/*
 * jQuery doTimeout: Like setTimeout, but better! - v1.0 - 3/3/2010
 * http://benalman.com/projects/jquery-dotimeout-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($){var a={},c="doTimeout",d=Array.prototype.slice;$[c]=function(){return b.apply(window,[0].concat(d.call(arguments)))};$.fn[c]=function(){var f=d.call(arguments),e=b.apply(this,[c+f[0]].concat(f));return typeof f[0]==="number"||typeof f[1]==="number"?this:e};function b(l){var m=this,h,k={},g=l?$.fn:$,n=arguments,i=4,f=n[1],j=n[2],p=n[3];if(typeof f!=="string"){i--;f=l=0;j=n[1];p=n[2]}if(l){h=m.eq(0);h.data(l,k=h.data(l)||{})}else{if(f){k=a[f]||(a[f]={})}}k.id&&clearTimeout(k.id);delete k.id;function e(){if(l){h.removeData(l)}else{if(f){delete a[f]}}}function o(){k.id=setTimeout(function(){k.fn()},j)}if(p){k.fn=function(q){if(typeof p==="string"){p=g[p]}p.apply(m,d.call(n,i))===true&&!q?o():e()};o()}else{if(k.fn){j===undefined?e():k.fn(j===false);return true}else{e()}}}})(jQuery);