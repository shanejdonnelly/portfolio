
/*********************************************************
*
* Plugin Name : tblTechInner
* Author      : Shane Donnelly
*
*********************************************************/
(function($){

  $.fn.tblTechInner = function(options){ 
    var defaults = {
      'lang'     : 'en',
      'site_url': 'http://technology.timberland.com'
    };

    //call in the default otions
    var options = $.extend(defaults, options);
        
  return this.each(function(){

    //fix Array.indexOf lack of support in IE  -- necessary for loadHash()
    if (!Array.indexOf) {
      Array.prototype.indexOf = function (obj, start) {
        for (var i = (start || 0); i < this.length; i++) {
          if (this[i] == obj) {
            return i;
          }
        }
        return -1;
      }
    }

      $.ajaxSetup({cache:false});
      var $topCats = $('#categories h3 a.h3_category_link'),
       $postLists = $('#categories ul.tech_links'),
       $postListLinks = $postLists.find('a'),
       curPostLocation,
       classNumber = 0,
       prevClassNumber,
       currentPostList,
       firstLoad = true,
       $currentCatDescription,
       state = {}, //for push state
       current_lang = options.lang,
       english_vid_countries = ['en','en-gb','es','it','fr','de'],
       site_url = options.site_url,
       content_url = options.site_url + '/wp-content',
       shop_translation = {
        'en'  : 'Shop Technology',
        'uk'  : 'Shop Technology',
        'es'  : 'Shop',
        'it'  : 'Shop',
        'de'  : 'Shop',
        'fr'  : 'Shop',
        'zh'  : '科技一览',
        'tw'  : '科技一覽',
        'my'  : 'BROWSE TECHNOLOGY',
        'hk'  : '科技一覽',
        'sg'  : 'BROWSE TECHNOLOGY',
        'jp'  : 'Shop'
        };

    /***********************************************************************************************************/
    // PAGE SET UP
    /***********************************************************************************************************/
      function init(){
        $('#content div').addClass('div' + classNumber).addClass('ajaxDiv');
        
        //find and highlight the active top category nav
        highlightNav();
        
        $postListLinks.addClass('notActive');
        $topCats.addClass('notActive');
      
        //pop state listener
        if(Modernizr.history){
            window.onpopstate = function(){
              if(!firstLoad){
                loadHash(location.hash);
              }
            }
        }
        _gaq.push(['_trackPageview']);
      }

    /***********************************************************************************************************/
    // EVENT HANDLERS
    /***********************************************************************************************************/
      
      function init_events(){
      
        /********************************
        * topCat click function
        ********************************/ 

        $('#categories').delegate('a.h3_category_link', 'click', function(e){
          firstLoad = false;
          if($(this).hasClass('active')){
            e.preventDefault();
          }
          else{
            e.preventDefault();
            analyticPush($(this));
            stopVideo(); //in case video is playing
            iterateClassNum();
            var index = $topCats.index($(this));
            highlightCurrent(index,0);
            $currentCatDescription = $(this).parent('h3').next('ul.cat_description_ul');
            currentPostList = $(this).parent('h3').nextAll('ul.tech_links').first();
            var curPostLocation = splitHref(currentPostList.find('li:first a').attr('href'));
            hashIt($(this));
            function animationCallback(){
              verticalPostAnimation();
              sidebarNavSlide(0);//highlights first post link
            }
            loadContent(curPostLocation, animationCallback);
          }
        });//end top cat click function

        /********************************
        * list click function
        ********************************/  
        $('#categories').delegate('li.menuPostLink a.', 'click', function(e){
          firstLoad = false;
          if($(this).hasClass('current')){
            e.preventDefault();
          }
          else{
            e.preventDefault();
            analyticPush($(this));
            stopVideo();
            iterateClassNum();
            hashIt($(this));
            $postListLinks.removeClass('current');
            $(this).addClass('current');
            
            curPostLocation = splitHref($(this).attr('href'));
            
            function animCallback(){
              horizontalAnimate(prevClassNumber,classNumber);
            }
            
            loadContent(curPostLocation,animCallback);
          }
        });
      }	


     /***********************************************************************************************************/
    // AJAX FUNCTIONS
    /***********************************************************************************************************/

      /********************************
      *
      ********************************/
      function loadContent(post_location,callback){
        var custom_video_field = get_custom_video_field();

        $('#content').append('<div class="ajaxDiv" id="div'+ classNumber +'" style="display:none;"></div>');
        $('#div'+ prevClassNumber).css('opacity',0.6);
          $('#wrapper').append('<img id="loader" src="'+ content_url +'/themes/tbl_tech/img/loading.gif" alt="Loading..." />'); 
        var json_url = 'http://staging.timberland.com/technology/fall-2012/'+ current_lang +'/?json=get_post&post_slug=' + post_location +'&custom_fields=image,imageLogo,shopLinks,' + custom_video_field;    
        $.getJSON(json_url , function(data) {
            loadContentCallback(data, callback);
        });

          function get_custom_video_field(){
            var custom_video_field = '';
            if(english_vid_countries.indexOf(current_lang) !== -1){
              custom_video_field = 'video';
            }
            else{
              custom_video_field = 'video-' + current_lang;
            }
            return custom_video_field + ',';
          }
      }
      
      /********************************
      *
      ********************************/  
      function loadContentCallback(post, callback){
        $('#loader').remove();
        //show content that was hidden on category.php to prevent ugly flashes
        $('#catTitle,#contentContainer').show();
        create_new_div(post);
        callback();
      }
      
      /********************************
      *
      ********************************/        
      function create_new_div(current_post){
        var title = current_post.post.title,
        images = current_post.post.custom_fields.image, 
        icon_src = current_post.post.custom_fields.imageLogo,
        content = current_post.post.content,
        videos,
        link = getShopLink(current_post.post.custom_fields.shopLinks, current_lang);
        
        if(english_vid_countries.indexOf(current_lang) !== -1){
          videos = current_post.post.custom_fields.video;
        }
        else{
          videos = current_post.post.custom_fields['video-' + current_lang];
        }
        
        $('#div' + classNumber)
          .append('<h2 class="entry-title">'+ title +'</h2>')
          .append('<a href="'+ link +'" title="" class="shop_collection_link" target="_blank">'+ shop_translation[current_lang] +'</a>')
          .append('<div class="entry-content"><div class="slideshow"></div><div class="textWrap">' + content + '</div><div class="technologyLogo"><img src="' + content_url +'/uploads/'+ icon_src +'" alt="" /></div></div>');

        //remove the slideshow if no images or videos
        if(typeof images === 'undefined' && typeof videos === 'undefined'){
          $('#div' + classNumber).find('.slideshow').remove();
        }
        else{
          $('#div' + classNumber).find('.slideshow').tblTechSlider({
            'images'    : images,
            'videos'    : videos,
            'image_path': 'http://staging.timberland.com/technology/fall-2012/wp-content/uploads/'
          });
        }
        //remove tech logo if empty
        if(typeof icon_src === 'undefined'){
          $('#div' + classNumber).find('.technologyLogo').remove();
        }
        //remove the shop link if it's empty
        if(!link){
          $('#div' + classNumber).find('a.shop_collection_link').remove();
        }
        
        /*
        *
        */
          function getShopLink(links_array, lang){
              var link = "";
              var position = -1;
              $(links_array).each(function(index,value){
                  if(value.indexOf(lang + '|') !== -1){
                      position = index
                      return false;
                  }
              });
              if(position !== -1){
                link = links_array[position].split('|')        
                return link[1];
              }
              else{
                return false;
              }
          
          }
      
      }
      /********************************
      *
      ********************************/
      function loadHash (hash){	
          
          var subCatHashes = ['#footwear-cool', '#footwear-warm','#footwear-dry','#footwear-comfort','#footwear-traction','#footwear-tough','#footwear-eco-conscious','#apparel-cool','#apparel-warm','#apparel-dry','#apparel-comfort','#apparel-tough','#apparel-eco-conscious','#gear-cool','#gear-comfort','#gear-dry'];
          
          if(subCatHashes.indexOf(hash) != -1){
            $('#categories h3 a[href$="' + hash + '"]').trigger('click');
          }
          else{
            var cleanHash =  hash.replace( /^#/, '' );
            var link_index; //index # based on all post links
            var postIndex; //index # based on current category links
            var catIndex;
            
            $postListLinks.each(function(index){
              var href = $(this).attr('href');
              if(href.indexOf(cleanHash) != -1){
                
                //index of the link we want - as part of all post links
                link_index = index;
                //find the category section link that this link is under
                var cat = $(this).parents('ul.tech_links').prevAll('h3').first().children('a');
                //get the index of this category link
                catIndex = $topCats.index(cat);
                //set up the currentPostList var based on the link that was clicked
                currentPostList = $(this).parents('ul.tech_links');
                $currentCatDescription = $(this).parents('ul.tech_links').prev('ul.cat_description_ul');
                //finally, get the index of the link based on its sibling posts
                postIndex = $(currentPostList).find('a').index($(this));
                return false;
              }
            });
            //ajaxDiv set up
            iterateClassNum();
            highlightCurrent(catIndex,link_index);
            //set up our callback
            function animationCallback(){
                verticalPostAnimation();
                sidebarNavSlide(link_index);//highlights this post link
              }
            loadContent(cleanHash,animationCallback);	
          }
      }
      
      /********************************
      *
      ********************************/
      function hashIt(link){
      
        var href = $(link).attr('href');
        var hrefSplit = new Array();
        hrefSplit = href.split('#');
        var postSlug = hrefSplit[1]; 
        if(!Modernizr.history){
          //$.bbq.pushState( '#' + postSlug );
        }
        else{
          history.pushState(state, "page 2", '#' + postSlug);
        }
        return false;
      }
      
    /***********************************************************************************************************/
    // ANIMATION FUNCTIONS
    /***********************************************************************************************************/

      /********************************
      * slide up post list and slide down new set
      ********************************/
      function sidebarNavSlide(index){
        $('ul.cat_description_ul').hide(300);
        $postLists.slideUp(300);
        setTimeout(function(){
          $currentCatDescription.show(30);
          $(currentPostList)
            .slideDown(300)
            .find('a')
            .removeClass('notActive')
            .addClass('active')
            .eq(index)
            .addClass('current');
          },450);
      }
      
      /********************************
      * fades out/in post
      ********************************/
      function verticalPostAnimation(){
        $('#content #div'+ prevClassNumber).fadeOut(
          300	,function(){
            $(this).remove();
          }
        );
        //fade in new content
        setTimeout(
          function(){
            $('#content #div'+ classNumber).fadeIn(300);
          }
        ,450);
      }

      
      /********************************
      *
      ********************************/
      function highlightCurrent(catIndex,postIndex){
        $postLists.find('a')
          .removeClass('active')
          .removeClass('current')
          .addClass('notActive');
        $topCats.removeClass('active').addClass('notActive');
        $topCats.eq(catIndex).removeClass('notActive').addClass('active'); //highlight current category 
        $postListLinks.eq(postIndex).addClass('current');
      }
      
      /********************************
      *
      ********************************/
      function highlightNav(){
        var currentpath = location.pathname;
        for(var x = 0; x < $('#nav li').length; x++){
          var href = $('#nav li a:eq('+ x +')').attr('href');
          if(href.indexOf(currentpath) != -1)$('#nav li a:eq('+ x +')').addClass('active');
        }       
      }
      
      /********************************
      *
      ********************************/
      function horizontalAnimate(oldNum,newNum){
        $('span.post_title').remove();
        var newDiv = $('#content #div'+ newNum);
        $(newDiv).css('left',630);
        var newDivHeight  = $(newDiv).height();
        //$('#content').css('height',newDivHeight);
        
        //slide and fade old div
        $('#content #div'+ oldNum).animate({
          left:-630,
          opacity:0
        },550,
        /*callback to remove old div when animation complete*/
        function(){
          $(this).remove();
          $(newDiv) //slide in new content div
            .show()
            .animate({
              left:0
            },450,'swing'
            //callback 
            ,function(){
              $('#catTitle span.post_title').fadeIn(300);
              
            }
          )
        });
      }
    
    // end animation section
    
    /***********************************************************************************************************/
    // MISC FUNCTIONS
    /***********************************************************************************************************/
      
      /********************************
      *
      ********************************/
      function splitHref(loc){
        var locationArray = loc.split('#');
        return locationArray[1];
      }
      
      /********************************
      * this is used in naming the dynamically 
      * generated div that holds the current post
      ********************************/
      function iterateClassNum(){
        prevClassNumber = classNumber;
        classNumber++;
      }
      
      /********************************
      *
      ********************************/
      function stopVideo(){
        //trickery to stop the youtube vid - resetting the iframe src 
        var iframe = $('#catDescription > div:visible iframe');
        var iframe_src = $('#catDescription > div:visible iframe').attr('src');
        iframe.attr('src',iframe_src);
      }
       
      

      /********************************
      * Start it up 
      ********************************/
      init();
      init_events();
      
      // check for hash on page load
      if(location.hash !== ""){
        loadHash(location.hash);
        return false;
      }
      else{
        $topCats.first().trigger('click');
      }  

  });
  }
})(jQuery);
