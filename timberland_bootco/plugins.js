
/*
* Plugin Name : imgResize
* Author      : Shane Donnelly
*/
(function($){

  $.fn.imgResize = function(options){
    var defaults = {
      img_width     : 600,
      img_height    : 600,
      img_url       : '',
      top_offset    : 0,
      position      : 'center' //left, center
    };

    //call in the default otions
    var options = $.extend(defaults, options);
 
    return this.each(function() {
      
      var $element = $(this),
          img_width = options.img_width,
          img_height = options.img_height,
          img_url = options.img_url,
          position = options.position;
          
              
      $element
        .css('background','none')
        .append('<img style="position:fixed;display:block;top:'+ options.top_offset +'px;" src="'+ img_url +'" />');
      
      function scaleImage(){
        var window_width = $(window).width(),
            window_height = $(window).height(),
            width_ratio = window_width/img_width,
            height_ratio = window_height/img_height,
            temp_height = 0,
            temp_width = 0,
            left = 0;

        if(width_ratio > height_ratio){
        //make image width equal windowWidth
          $element.find('img').css('width',window_width);
          temp_height = img_height * width_ratio;
          $element.find('img').css('height',temp_height);
          $element.find('img').css('left', left);
        }
        else{
          $element.find('img').css('height',window_height);
          temp_width = img_width * height_ratio;
          $element.find('img').css('width',temp_width);
   
          if(position === 'center'){
            left = (temp_width - window_width)/2;
            $element.find('img').css('left','-'+ left + 'px');
          }
          else{ //position === 'left'
            $element.find('img').css('left', left);
          }
        }
      }
      
      scaleImage();
      
      $(window).resize(function(){
        scaleImage();
      });
      
    });
  }
})(jQuery);

/*
* Plugin Name : basicImageCycler
* Author      : Shane Donnelly
*/
(function($){

  $.fn.basicImageCycler = function(options){
    var defaults = {
      'images'          : [],
      'slide_text'      : false,
      'text'            : [],
      'text_color'      : [],
      'slide_timer'     : 6000,
      'image_path'      : '',
      'append_images'   : true,
      'append_buttons'  : false,
      'custom_buttons'  : false,
      'prev_button'     : '',
      'next_button'     : '',
      'hover_element'   : false
    };
    
    //call in the default otions
    var options = $.extend(defaults, options);
 
    return this.each(function() {
    
      var $element = $(this),
          image_array = options.images,
          image_path = options.image_path,
          $images,
          num_images,
          cur_image =  0,
          prev_image = 0,
          $hover_element = options.hover_element, 
          slideshow_timer;
      
      init();
      initEvents();
      
      /****************************************
      * Set up
      ****************************************/
      function init(){
        
        if(options.append_images){
          $(image_array).each(function(index, image){
            if(options.text_color[index] === 'black'){
              $element.append('<div class="slide black_text"><img src="' + image_path + image + '" /></div>');
            }
            else{
              $element.append('<div class="slide"><img src="' + image_path + image + '" /></div>');
            }
          });
        };
        
        if(options.slide_text){
          $('.slide').each(function(index){
            $(this).append('<p class="slide_text"><span>' + options.text[index] + '</span></p>');
          });
        };
        
        if(options.append_buttons){
          setTimeout(function(){
          //
          image_height = $element.find('img').first().height();
          if(options.custom_buttons){
            $element.append('<img class="prev_button" style="display:none;" src="'+ options.prev_button +'"/>');
            $element.append('<img class="next_button" style="display:none;"  src="'+ options.next_button +'"/>');
          }
          else{
            $element.append('<p class="prev_button" style="display:none; left:0; bottom:0;">&lt;</p>');
            $element.append('<p class="next_button" style="display:none; right:0;bottom:0;">&gt;</p>');
          }
          $('.prev_button, .next_button').show(500);
          },200)
        }
        
        $element.find('.slide:eq(0)').siblings('.slide').hide();
        $element.removeClass('invisible');
        $element.css('position','relative');
        
        num_images = $element.find('img').length;
        if(num_images > 1){ 
          $images = $element.find('.slide');
          startAutoSlideshow();
        }
      }
          
      /****************************************
      * Events
      ****************************************/
      function initEvents(){
      
        $('.image_cycler').on('click', '.prev_button', function(){
          stopAutoSlideshow(slideshow_timer);
          changeImage('prev');
        });
        
        $('.image_cycler').on('click', '.next_button', function(){
          stopAutoSlideshow(slideshow_timer);
          changeImage('next');
        });
        
        if($hover_element){
          $hover_element.find('li').hoverIntent(
            function(){
              stopAutoSlideshow(slideshow_timer);
              changeImage(false, $(this).index());
            },
            function(){ startAutoSlideshow(); }
          );
        }
        
      }
      
      /****************************************
      *
      * direction 'prev' or 'next' 
      *
      ****************************************/
      function changeImage(direction, hover_index){
        
        prev_image = cur_image;
        
        if(direction){
          if(direction === 'prev'){
            prev_image === 0 ? cur_image = num_images - 1 : cur_image-- ;
          }
          else{
            prev_image === (num_images - 1) ? cur_image = 0 : cur_image++ ;
          }
        }
        else{
          cur_image = hover_index;
        }
          $images.fadeOut(650);
          $images.eq(cur_image).fadeIn(250);
        
      }
      
      /****************************************
      *
      ****************************************/
      function startAutoSlideshow(){
        slideshow_timer = setInterval(function(){changeImage('next');}, options.slide_timer);
      }
      
      /****************************************
      *
      ****************************************/
      function stopAutoSlideshow(timer_name){
        clearInterval(timer_name);
      }

    });
  }
})(jQuery);

/*
* Plugin Name : highlightCurrentLink
* Author      : Shane Donnelly
*/
(function($){

  $.fn.highlightCurrentLink = function(){
    return this.each(function() {
      var $element = $(this);
      var pathname = (window.location.pathname.match(/[^\/]+$/)[0]);
      $element.find("li > a").removeClass("current");
      $element.find("a[href^='" + pathname  + "']").addClass("active");
    });
  }
})(jQuery);

/*
* Even height jQuery plugin
* Shane
*/
(function($){
  $.fn.equalHeight = function(options){
    
    var defaults = {    
      '$el2'       : $('body'),
      '$el_add_to' : $('body')
    };
    
    var options = $.extend(defaults, options);
  
    return this.each(function() {

    var $el1 = $(this),
        $el2 = options.$el2,
        $el_add_to = options.$el_add_to,
        el1_height = $el1.height(),
        el2_height = $el2.height();
        
        if(el1_height < el2_height){
          var add_height = el2_height - el1_height;
          $el_add_to.height($el_add_to.height() + add_height);
        }
      });
    }
})(jQuery);


/*
* Even height jQuery plugin
* Shane
*/
(function($){
  $.fn.verticalAlignText = function(){
    
    return this.each(function() {
        var $box_content = $(this),
        box_content_height = $box_content.height(),
        box_content_margin_top = (225 - box_content_height)/2;
        $box_content.css('margin-top',box_content_margin_top);
        
      });
    }
})(jQuery);
