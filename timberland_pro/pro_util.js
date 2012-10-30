/**

*  GLOBALS
*/
shoe_images= {};

var ProUtil = function(app) {
  
  this.helpers({
    
    /*
    * loads images for spinny boot and calls reel initially
    * when featureCircle is clicked, reel is called again in bindFeatureClick
    */
     load_shoes: function(base, category, subcategory){
        shoe_images[subcategory] = [];
        //push images into array
        for (var x = 1; x <= 24; x++) {
          shoe_images[subcategory].push("shoeImages/" + category + "/" + subcategory + "/pro_" + x + ".png");
        }
        //give the accordion some time to slide, then spin in the shoe
        setTimeout(function(){
          $('img#' + subcategory).reel({ images: shoe_images[subcategory], frames: 24, wheelable: false, cw: true, preloader: 19, opening: .25, entry: 6, frame: 21 });
        },3500);
     },
    
    /*
    *
    */  
     swapToAccordion: function swapToAccordion(base, $el){
        base.fadeAll();
        setTimeout(
          function(){
            $('#accordion').fadeIn(300);
            $el.activateSlide();
          },350);
        base.setLogoPosition('bottom');
      },
    
    /*
    *
    */      
      swapToPage: function(base, section) {
        var logoactive = true, path = '';
        
        if(base.soyf_pages.indexOf(section) !== -1){
          logoactive = true;
          path = 'soyf/';
        }
        base.fadeAll();
        
        //check to see if we've already loaded this page
        if(base.elementExists($('#' + section))){
          base.delayedFadeIn(base, $('#' + section), 500, 350);
        }
        else{
          base.$element().append(base.$loader);
          base.centerLoader(base.$loader, 219, 19);
          this.load('ajaxIncludes/' + path + section + '.html' )
            .then(function(html){
              base.$element().append(html)
              base.delayedFadeIn(base, $('#' + section), 500, 350);
            });
        }
        
        var position = logoactive ? 'top' : 'bottom'; 
        $('a.proLogo').css('background-position', position); 
               
      },    
    /*
    * utility function
    */      
      elementExists: function($el){
        var value = $el.length > 0 ? true : false;
        return value;
      },
    /*
    * center #wrapper vertically
    */
      centerWrapper: function(){
      var 
        $el = $('#wrapper'),
        height = $el.height(),
        window_height = $(window).height(),
        top_position = (window_height - height - 61) / 2;
      if(window_height > height){
        $('#wrapper').css('top',top_position); 
      }
    },
    /*
    *
    */      
      fadeAll:  function(){
        $('#subMainArea').fadeOut(400);$('#initialPage').fadeOut(300);
        $('#accordion, .otherPage, .soyf_page').fadeOut(200);        
      },
    
    /*
    * 
    */      
      delayedFadeIn:  function(base, $el, timer, fade_time){
        var x = setTimeout(function () {
          if(base.elementExists(base.$loader)){
            base.$loader.remove();
          }
          $el.fadeIn(fade_time);
        }, timer);                      
      },

    /*
    * for boot detail pages in soyf
    */      
      appendDots:  function(collection, current_boot){
        var base = this;
          $('.' + collection + '_clickArea').load('ajaxIncludes/soyf/'+ collection +'/'+ collection +'_boot_list.html',function(){
            base.highlightCurrentBootDot($('.soyf_clickArea a'));
          });
      },
    
    /*
    * for sharethis links in accordion
    */
    bindShare:  function(category){
      var 
        st_element_id = category + 'Share',
        $st_element = $('#'+ st_element_id),
        st_url = $st_element.data('st_url'),
        st_title = $st_element.data('st_title'),
        st_image = $st_element.data('st_image');
        
      stWidget.addEntry({
        'service':'sharethis',
        'element':document.getElementById(st_element_id),
        'title':st_title,
        'image':st_image,
        'url':st_url
      }); 
    },
    
    /*
    * switching between boots in soyf detail pages
    */      
      changeBoots: function(base, $el, data){
        $el
          .fadeOut(500)
          .promise()
          .done(function(){
            setTimeout(function(){
              $el
                .empty()
                .hide()
                .append(data)
                .fadeIn(500);
              base.highlightCurrentBootDot($('.soyf_clickArea a.soyf_dot'));
            },100);
          })

      },
    
    /*
    * 
    */      
      highlightCurrentBootDot: function($dots){
        var 
          $active = $('body'),
          active_index = 0,
          prev_arrow_href="",
          next_arrow_href="",
          num_dots = $dots.length;
          
        $.each($dots, function(i){
          if($(this).attr('href') == location.hash){
            $active = $(this); 
            active_index = i;
          };
        });
        
        if(active_index === 1){
          prev_arrow_href = $dots.first().attr('href');
        }
        else{
          prev_arrow_href = $dots.eq(active_index - 1).attr('href');
        }
        
        if(active_index === num_dots){
          next_arrow_href = $dots.last().attr('href');
        }
        else{
          next_arrow_href = $dots.eq(active_index + 1).attr('href');
        }
        
        $('.soyf_prev_arrow').attr('href', prev_arrow_href);
        $('.soyf_next_arrow').attr('href', next_arrow_href);
        
        $dots.children('p').css('background-position', 'bottom');
        $active.children('p').css('background-position', 'top');
      },
    
    /*
    *
    */      
      highlightCurrentLink: function($links){
        var $active = $('body');
        $.each($links, function(i){
          $(this).attr('href') == location.hash ? $active = $(this) : x = '';
        });
        $links.removeClass('selected');
        $active.addClass('selected');
        
        if(location.hash.indexOf('industrial') !== -1){
          $('#subHeader li.industrial a').addClass('selected')
        }
        if(location.hash.indexOf('renova') !== -1){
          $('#subHeader li.renova a').addClass('selected')
        }        
      },

    /*
    *  used in Accordion, each feature click requires reel to be called anew
    *  spinny shoe images were already loaded though, so we reuse the array that holds them
    */      
      bindFeatureClick: function(base, category){
        base.$element().on('click', '#'+ category +'_featureClickArea p.featureCircle', function(){
          var index = $(this).index();
          $(this).css('background-position', 'top').siblings().css('background-position', 'bottom');
          $('#'+ category +'_featureCallout').children('div').hide().eq(index).show();
          
          var frame = $(this).data('frame'),
            //TODO MAKE THIS WORK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            //make sure we have an end_frame value
            end_frame = frame === 'undefined' ? 24 : frame;

          $('#' + category + '_imageContainer')
            .empty()
            .append('<img id="' + category + '" class="image"  src="images/transparency.png" width="450" height="450" alt="Timberland PRO®' + category + '" />');

          $('#' + category + '_featureCallout p.pointer').hide();
          $('img#' + category).reel({ images: shoe_images[category], frames: 24, wheelable: false, cw: true, preloader: 19, opening: .25, entry: 6, frame: end_frame - 3 });
          
        });  
      },
      
    /*
    *
    */      
      setLogoPosition: function(position){
        $('a.proLogo').css('background-position', position);    
      },

    /*
    *  this is used between page loads
    */      
      centerLoader: function($el, el_width, el_height){
        var window_width = $(window).width(),
          window_height = $(window).height();
        $el.css('left', (window_width - el_width) / 2); 
        $el.css('top', (window_height - el_height) / 2);
      },
    
    /*
    *
    */      
      firstLetterCap: function(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
      },
        
    /*
    *
    */      
      $loader: $('<p id="loader" style="position:fixed;"><img src="images/loading.gif" alt="Loading" /></p>'),
      
    /*
    *
    */      
      soyf_pages: ['helix', 'endurance', 'helix-collection', 'endurance-collection', 'anti-fatigue'],
		
		/*
		* To prevent the flash of the alt text before image loads
		*/
			appendAltText: function(collection){
				setTimeout(function(){
					var 
						$parent = $('#'+ collection +'_swap_area'),
						alt_text = $parent.find('h1').text();
					$parent.find('img.boot:visible').attr('alt', alt_text);
				}, 1500);
			}
  
  });
  
};

      
