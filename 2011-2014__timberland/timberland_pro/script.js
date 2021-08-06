(function($) {

  var Pro = $.sammy('#wrapper', function() {
    /**
    *  DEPENDENCIES
    */
    this.use(ProUtil);
    
    /**
    *  VARIABLES
    */
    var $accordion    = $('#accordion'),
        loaded    = {
          industrialhelix     : false,
          industrialendurance : false,
          industrialtitan     : false,
          industrialwomen     : false,
          renovaprofessional  :	false,
          renovacaregiver	    :	false,
          valor		            :	false,
          fiveStar            : false
        },
    base_title = "Timberland PRO® : ";
    
    /**
    *  ROUTES
    */
    //ROUTE: Home
    this.get('#!/home', function(context) {
      $accordion.hide();$('.otherPage, .soyf_page').hide();$('#subMainArea').fadeIn(300);$('#initialPage').fadeIn(300);
      this.setLogoPosition('top');
      document.title = base_title + 'Home';
      _gaq.push(['_trackEvent', 'Page View', location.hash]);
    });

    
    //ROUTE: Pages
    this.get('#!/page/:page', function(context) {
      var page = this.params['page'];
      this.swapToPage(this, page);
      this.highlightCurrentLink($('#subHeader a'));
      document.title = base_title + this.firstLetterCap(page);
      _gaq.push(['_trackEvent', 'Page View', location.hash]);
    });
        
    //ROUTE: Accordion
    this.get('#!/category/:category', function(context) {
      
      var category = this.params['category'],
        cat_parent = category,
        subcategory = '',
        base = this;
        
      if(category.indexOf('industrial') !== -1){
        subcategory = category.split('industrial')[1];
        cat_parent = 'industrial';
      }
      if(category.indexOf('renova') !== -1){
        subcategory = category.split('renova')[1];
        cat_parent = 'renova';
      }

        
      if(!loaded[category] && $accordion.is(':hidden')){
        base.log('not loaded, accordion hidden');
        base.load('ajaxIncludes/' + category + '.html')
          .then(function(html){
              $('#'+ cat_parent +'Container').children().hide().end().append(html);
              base.swapToAccordion(base, $('dt#accordion' + cat_parent));
              base.load_shoes(base, cat_parent, category);
              base.bindFeatureClick(base, category);
              //set the page as loaded
              loaded[category] = true;
              base.bindShare(category);
          });
      }
      else if(!loaded[category] && $accordion.is(':visible')){
        base.log('not loaded, accordion visible');
        base.load('ajaxIncludes/' + category + '.html')
          .then(function(html){
              $('#'+ cat_parent +'Container').children().hide().end().append(html);
              $('dt#accordion' + cat_parent).activateSlide();
              base.load_shoes(base, cat_parent, category);
              base.bindFeatureClick(base, category);
               //set the page as loaded
              loaded[category] = true; 
              base.bindShare(category);
          });
      }
      else if(loaded[category] && $accordion.is(':hidden')){
        base.log('loaded, accordion hidden');
        if(category !== 'valor' && category !== 'fiveStar'){
          $('#'+ cat_parent +'Container').children().hide();
        }
        base.swapToAccordion(base, $('dt#accordion' + cat_parent));
        setTimeout(function(){
          
            $('#' + category ).fadeIn(500);
          
        },750);
      }
      else{
        base.log('loaded, accordion visible');
        $('dt#accordion' + cat_parent).activateSlide();
        if(category !== 'valor' && category !== 'fiveStar'){
          $('#' + category )
            .siblings()
            .fadeOut(500)
            .promise()
            .done(function(){
              $('#' + category ).fadeIn(500);
            });
        }
      }
      this.highlightCurrentLink($('#subHeader a'));
      this.highlightCurrentLink($('.subSectionNav a'));
      
      document.title = base_title + base.firstLetterCap(cat_parent);
      _gaq.push(['_trackEvent', 'Page View', location.hash]);
    });
    //END ROUTE: Accordion

    //ROUTE: Stay On Your Feet Boots
    this.get('#!/:collection/:boot', function(context) {
      var collection = this.params['collection'],
        boot = this.params['boot'],
        container = '#'+ collection +'-collection',
        base = this;
      
      base.setLogoPosition('top');
      
      if(!base.elementExists($(container))){
        base.fadeAll();
        base.load('ajaxIncludes/soyf/' + collection + '-collection.html')
          .then(function(html){
            base.$element().append(html);
            base.delayedFadeIn(base, $(container), 500, 500);
            base.load('ajaxIncludes/soyf/' + collection + '/' + boot +'.html' )
            .then(function(boot_html){
              base.changeBoots(base, $('#'+ collection +'_swap_area'), boot_html);
              base.appendDots(collection, boot);
              base.highlightCurrentBootDot($('.soyf_clickArea a.soyf_dot'));
							base.appendAltText(collection);
            });

          });
      }
      else if($(container).is(':hidden')){
        base.fadeAll();
        base.delayedFadeIn(base, $(container), 500, 500);
        base.load('ajaxIncludes/soyf/' + collection + '/' + boot +'.html' )
          .then(function(boot_html){
            base.changeBoots(base, $('#'+ collection +'_swap_area'), boot_html);
						base.appendAltText(collection);
          });
      }
      else{
        base.load('ajaxIncludes/soyf/' + collection + '/' + boot +'.html' )
          .then(function(boot_html){
            base.changeBoots(base, $('#'+ collection +'_swap_area'), boot_html);
            base.appendAltText(collection);
          });
      }
      this.highlightCurrentLink($('#subHeader a'));
      document.title = base_title + base.firstLetterCap(collection);
      _gaq.push(['_trackEvent', 'Page View', location.hash]);
    });
    //END ROUTE: SOYF Boots
    
    //ROUTE: 404
    this.notFound = function() {
      location = '#!/home';
    };
                

  }); //end Pro app
  
  Pro.run();  
  
})(jQuery);

$(document).ready(function(){ 

  /**
  *
  * EVENTS
  *
  */
  //this if for SOYF video boxes
  $('.fancy_video').live('click', function() {
    var href = $(this).attr('href');
    $.fancybox({
        'padding'		: 0,
        'autoScale'		: false,
        'transitionIn'	: 'none',
        'transitionOut'	: 'none',
        'width'		: 680,
        'height'		: 495,
        'href'			: href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
        'type'			: 'swf',
        'swf'			: {
          'wmode'		: 'transparent',
          'allowfullscreen'	: 'true'
        }
      });

    return false;
  });
  //this is for SOYF Flash box (boot that jumpropes, etc)
  $('.fancy_flash').live('click', function(e){
      e.preventDefault();
      var href=$(this).attr('href');
      $.fancybox({
        'type': 'iframe',
        'href':href,
        'padding':0,
        'margin':0,
        'width':1020,
        'height':600
      });
  })
  //analytics tracking
  $('.ga_event').live('click', function(e){
    var 
      event = $(this).data('event'),
      sku = $(this).data('shop_shoe') ? $(this).data('shop_shoe') : 'missing sku';
    _gaq.push(['_trackEvent', event, sku]);
    
  });
  //SOYF Anti-fatigue swap feature
  $('#wrapper').on('click', '#featureClickArea p.soyf_boot_selector', function(){
    var index = $(this).index(),
      $feature_divs = $('#aft_featureCallout').children('div');
    $(this).css('background-position', 'top').siblings().css('background-position', 'bottom');
    $feature_divs.fadeOut(300);
    $feature_divs.promise().done( function(){$feature_divs.eq(index).fadeIn(500)});
  });
  //SOYF change image when multiple colors of same boot
  $( 'span.colorChange').live('click', function(){
     var $hidden_boot = $('img.boot:hidden');
     $('img.boot').fadeOut(300).promise().done(function(){
        $hidden_boot.fadeIn(500);
      }); 
     var $hidden_span = $('span.colorChange:hidden');
     $('span.colorChange').hide();
     $hidden_span.show();
  });

  /**
  *
  * RANDOM BITS
  *
  */
	
  //fix for IE -- home page images link to inner accordion pages
  if($.browser.msie){
    $('#initialPage .mainAreaDiv').live('click', function(e){
      var href = $(this).find('p a.initialPageDiv').attr('href');
      location = href;
    });
  }
  //fix so clicking the accordion dt links to section
  $('#accordion dt').live('click', function(){
    var href = $(this).find('a').attr('href');
    location = href;
  });
   
  //no hash? we'll see about that
  if (location.hash == '') location.hash = '#!/home';

  //fire up the accordion plugin
  $('#accordion').easyAccordion({
      autoStart: false,
      slideNum: false
  });
  
  //fire up fancybox for the home page 30-day guarantee area
  try{
    //initialize fancybox
    $('#fancyBoxLink').fancybox({padding:0,overlayColor:'#000'});
  }
  catch(e){}
  
  //fixes for iPad
  if(navigator.platform == 'iPad' || navigator.platform == 'iPhone' || navigator.platform == 'iPod'){
    //fix Where To Buy link breaking to two lines on iPad
    $('ul.navRight li:eq(3)').css('width','110px');
    //get rid of 1px line between dt and dd
    $('#accordion dd').css('margin-left','-9px');
    //fix google map sidebar, not showing scroll TODO
    $('#whereToBuyWrapper #sidebar').css('overflow','scroll');
  }
  
});





