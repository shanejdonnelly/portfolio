$(document).ready(function(){
    
 //jquery easing, adding here instead of adding whole jQuery UI 
(function(){var e={};$.each(["Quad","Cubic","Quart","Quint","Expo"],function(t,n){e[n]=function(e){return Math.pow(e,t+2)}});$.extend(e,{Sine:function(e){return 1-Math.cos(e*Math.PI/2)},Circ:function(e){return 1-Math.sqrt(1-e*e)},Elastic:function(e){return e===0||e===1?e:-Math.pow(2,8*(e-1))*Math.sin(((e-1)*80-7.5)*Math.PI/15)},Back:function(e){return e*e*(3*e-2)},Bounce:function(e){var t,n=4;while(e<((t=Math.pow(2,--n))-1)/11){}return 1/Math.pow(4,3-n)-7.5625*Math.pow((t*3-2)/22-e,2)}});$.each(e,function(e,t){$.easing["easeIn"+e]=t;$.easing["easeOut"+e]=function(e){return 1-t(1-e)};$.easing["easeInOut"+e]=function(e){return e<.5?t(e*2)/2:1-t(e*-2+2)/2}})})()

    //cache jQuery objects
    var $window = $(window), $wrapper = $('#wrapper'), $overlay = $('.overlay'), $bags_overlay = $('.bags-overlay');
    var $boots_overlay = $('.boots-overlay');
    //make these globally accessible so they can be opened in onClick of sliders on page
    var bagsOverlay, bootsOverlay;
    var video_started = false;
 
    /*
    *
    * PRELOAD IMAGES
    *
    */
    loadImages(); 

    function loadImages(){
        var 
        $progress = $('progress'), 
        $images = $wrapper.find('img'), 
        num_images = $images.length, 
        num_loaded_images = 0;

        //center the progress bar vertically
        $progress.attr('max', num_images);

        $images.each(function(){
            $(this).imagesLoaded().always(updateProgress);
        });
        function updateProgress(){
            var current_percentage; 

            ++num_loaded_images;
            current_percentage = Math.round(num_loaded_images/num_images * 100);
            $('#percentage #number').html(current_percentage + '');
           
           if(num_loaded_images === num_images){ init(); } 

        }

    }

    /*
    *
    * EVENTS
    *
    */
    $window.on('resize', onResize);

    $('body').on('touchstart scroll', function(){
        if(!video_started){
            $('.footwear video')[0].play();
            video_started = true;
        }
    });
    //drop down menu 
    $wrapper.find('#nav-icon').on('click', toggleNav);

    //bags overlay open
    $('.bags .swatch-wrap').on('click', function(e){ 
        var index = $(this).data('index');

        $bags_overlay.fadeIn(500); 
        bagsOverlay.swipeTo(index);
    });

    //close all overlays
    $overlay.find('.close').on('click', closeOverlay);

    //END EVENTS


    function init(){
        var width = $window.width(), height = $window.height();
        imagesLoaded();
        if($('.home').length)sizeDummyRow();
        sizeVideo(width, height);
        sizeBootBits(); 
        sizeOverlays(width, height);
        initOverlaySliders();
        initBootSliders();
    }

    function onResize(){
        var width = $window.width(), height = $window.height();
        if($('.home').length)sizeDummyRow(); 
        sizeVideo(width, height); 
        sizeBootBits(); 
        sizeOverlays(width, height);
    }

    function sizeDummyRow(){
        var nav_height = $('#top-nav').height();
        $('#dummy-row').height(nav_height);
    }

    function sizeVideo(win_width, win_height){
        if($('.home').length){
            var vid_ratio = 462/1024,
                vid_height = win_width * vid_ratio,
                vid_width = win_width;
            $('video').height(vid_height).width(vid_width);
        }
/*        if($('.footwear').length){
            var doc_width = $('body').innerWidth(),
                vid_ratio = 824/1024,
                vid_height = doc_width/2 * vid_ratio,
                vid_width = doc_width/2;
            $('video').height(vid_height).width(vid_width);
        }
*/
    }

    function imagesLoaded(){
        $('#loading').hide();
        $wrapper.show();
//        $('.footwear').lazyVideo({threshold: 75});
    }
    /*
    *
    * OVERLAYS
    * 
    */

    //height_ratio is hard coded, needs to change if overlay images change size 
    function sizeOverlays(win_width, win_height){
        var 
        $images = $overlay.find('.slide img'),
        top, height,
        height_ratio = 1208/1536,  
        num_images = $images.length;

        //center pagination
        $overlay.find('.pagination').each(function(){ 
            pag_width = $overlay.find('.boot-pagination').length ? 420 : 70;
            var width = $(this).width(), left = (win_width / 2)  - (pag_width / 2); 
            $(this).css('left', left); 
        });

        //make slide-wrap wide enough to contain all images
        $overlay.find('.slide-wrap').width(win_width * num_images);
        
        //make images width of slide-wrap
        $images.width(win_width - 4); 

        //make slides full height and width
        $overlay.add('.slide').width(win_width).height(win_height);

        //vertically center overlay images
        height = win_width * height_ratio;
        top = (win_height - height) / 2; 
        $images.css('top', top);
              
    }

    function openOverlay(){
//        $('body').css({'position': 'fixed', 'overflow':'hidden' });    
    }

    function closeOverlay(){
  //      $('body').css({'position':'static', 'overflow':'auto' });
        $overlay.fadeOut(500);
    }
    //END OVERLAYS

    /*
    *
    * DROP DOWN NAV
    *
    */
    function toggleNav(){
        var 
        $nav = $wrapper.find('#nav-drop-down'), 
        nav_open = $nav.is(':visible'),
        nav_height = $nav.height(); 

        nav_open ? closeNav() : openNav();

        function closeNav(){
            $nav.animate({'bottom':0}, 350, 'easeOutExpo',  function(){$(this).hide(); });
        }
        function openNav(){
            $nav.show().animate({'bottom':nav_height * -1}, 350, 'easeOutQuad' );        
        }
    }
    //END DROP DOWN

    /*
    *
    * SLIDERS
    *
    */

    function sizeBootBits(){ 
        //size the swiper area for two slides - making sure it is responsive to window size
        var swiper_width = $wrapper.find('.swiper-container').first().width();
        $wrapper.find('#main .swiper-slide').width(swiper_width * 0.5);
        $wrapper.find('#main .swiper-slide img').width((swiper_width * 0.5) - 2);
        $wrapper.find('#main .swiper-slide .swiper-text').width((swiper_width * 0.5) - 22); 
    } 

    function initOverlaySliders(){

        //start up slider plugin

        if($bags_overlay.length){
            //BAGS
            bagsOverlay = $bags_overlay.swiper({
                slidesPerView: 1, mode:'horizontal', loop: true, calculateHeight: false, watchActiveIndex: true, pagination: '.pagination', paginationClickable:true 
            }); 
            $bags_overlay.find('.arrow-left').on('click',  function(){ bagsOverlay.swipeTo(bagsOverlay.activeLoopIndex-1); } );
            $bags_overlay.find('.arrow-right').on('click', function(){ bagsOverlay.swipeTo(bagsOverlay.activeLoopIndex+1); } );
        }

        if($boots_overlay.length){
            //9-EYE
            bootsOverlay = $boots_overlay.swiper({
                slidesPerView: 1, mode:'horizontal', loop: true, calculateHeight: false, watchActiveIndex: true, pagination: '.boot-pagination', paginationClickable:true,
                
            }); 
            $boots_overlay.find('.arrow-left').on('click',  function(){ bootsOverlay.swipeTo(bootsOverlay.activeLoopIndex-1); } );
            $boots_overlay.find('.arrow-right').on('click', function(){ bootsOverlay.swipeTo(bootsOverlay.activeLoopIndex+1); } );
        }
    }
    
    function initBootSliders(){
        var $chukka_swipe = $('#chukka-swipe'), $nine_eye_swipe = $('#nine-eye-swipe'), $pull_on_swipe = $('#pull-on-swipe');

        chukkaSwiper = $chukka_swipe.find('.swiper-container').swiper({
            slidesPerView: 2, mode:'horizontal', loop: true, calculateHeight: true, watchActiveIndex: true, 
            onSlideClick:function(){ $boots_overlay.fadeIn(500); openOverlay(); bootsOverlay.swipeTo((chukkaSwiper.clickedSlideIndex-2) + 4);  },
            wrapperClass: 'chukka-wrapper'

        });
        nineEyeSwiper = $nine_eye_swipe.find('.swiper-container').swiper({
            slidesPerView: 2, mode:'horizontal', loop: true, calculateHeight: true, watchActiveIndex: true, 
            onSlideClick:function(){ $boots_overlay.fadeIn(500); openOverlay(); bootsOverlay.swipeTo(nineEyeSwiper.clickedSlideIndex-2); },
            wrapperClass: 'nine-eye-wrapper'
 
        });
        pullOnSwiper = $pull_on_swipe.find('.swiper-container').swiper({
            slidesPerView: 2, mode:'horizontal', loop: true, calculateHeight: true, watchActiveIndex: true, 
            onSlideClick:function(){ $boots_overlay.fadeIn(500); openOverlay();bootsOverlay.swipeTo((pullOnSwiper.clickedSlideIndex-2) + 8);  },
            wrapperClass: 'pull-on-wrapper'
 
        });

        $nine_eye_swipe.find('.arrow-left').on('click',  function(){ nineEyeSwiper.swipeTo(nineEyeSwiper.activeLoopIndex-1); } );
        $nine_eye_swipe.find('.arrow-right').on('click', function(){ nineEyeSwiper.swipeTo(nineEyeSwiper.activeLoopIndex+1); } );
        $chukka_swipe.find('.arrow-left').on('click',  function(){ chukkaSwiper.swipeTo(chukkaSwiper.activeLoopIndex-1); } );
        $chukka_swipe.find('.arrow-right').on('click',  function(){ chukkaSwiper.swipeTo(chukkaSwiper.activeLoopIndex+1); } );
        $pull_on_swipe.find('.arrow-left').on('click',  function(){ pullOnSwiper.swipeTo(pullOnSwiper.activeLoopIndex-1); } );
        $pull_on_swipe.find('.arrow-right').on('click',  function(){ pullOnSwiper.swipeTo(pullOnSwiper.activeLoopIndex+1); } );

    }
    //END SLIDERS
    
});
