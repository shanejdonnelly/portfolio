var LB = LB || {};

'use strict';

LB = {

    cacheElements: function(){
        this.$window = $(window);
        this.$bg_wraps = $('.bg_wrap');
        this.$bg_images = $('.bg');
        this.$top_spacers = $('.top-spacer');
        this.$bottom_spacers = $('.bottom-spacer');
        this.$sections = $('section'); 
    },

    changeSection: function(direction){ 
        if(direction === 'down'){ 
            this.$current_section = this.$sections.eq(this.current_section);

            //first set all bg images to relative
            this.$bg_images.css('position', 'relative');
            this.$bg_images.eq(this.prev_section).css('position', 'fixed');
            this.$bg_images.eq(this.current_section).css('position', 'fixed');
            this.$bg_images.eq(this.next_section).css('position', 'fixed');
            this.$bg_images.eq(this.prev_section).css('position', 'relative');
            this.$bg_images.eq(this.next_section + 1);   
        }
        else{ //direction === 'up'

            this.$current_section = this.$sections.eq(this.current_section);

            this.$bg_images.eq(this.current_section).css({ 'position':'fixed' });
            this.$bg_images.eq(this.next_section);

            //load bg images behind
            this.$bg_images.eq(this.prev_section - 1);   
        }
    },

    findCurrentSection: function(direction){
        var $section = $('section:in-viewport'),
        cur_section = this.$sections.index($section),
        base = this;
        console.log(cur_section);


        if(this.current_section !== cur_section && cur_section !== -1){

            this.current_section = cur_section;
            this.next_section = cur_section + 1;
            this.prev_section = cur_section - 1; 
            this.changeSection(direction);

        }

    },

    events: function(){
        var base = this;

        //RESIZE
        this.$window.on('resize', function(){ base.sizeStuff();});

        //SCROLL
        this.$window.on('scroll', function(){ onScroll(); }); 

        //TOUCH
        this.$window.on('touchmove', function(){ onScroll(); });

        //CLICKS
        $('#scroll-down-btn').on('click', function(){
            $('body').animate({scrollTop: base.win_height - 75}, 500);
        });

        function onScroll(){
            base.scroll_pos = base.$window.scrollTop();
            //CHANGING BGS
            if(base.scrollingDown()){
                if(!base.$current_section.find('.bottom-marker').is(":in-viewport") && (base.current_section < base.$sections.length -1)){
                    base.findCurrentSection('down');
                }
            }
            else{ //scrollingUp
                if(!base.$current_section.find('.top-spacer').is(":in-viewport") && (base.current_section > 0)){
                    base.findCurrentSection('up');
                }
            } 
        }
    },

    init: function(chapter, first_image, current_section){
        var 
        base = this,
        $first_section = $('#' + chapter + '_wrap').find('section:eq(0)');

        this.cacheElements(); 

        this.current_section = parseInt(current_section);
        this.prev_section = (this.current_section !== 0) ? (this.current_section - 1) : this.current_section ; 
        this.next_section = this.current_section + 1;

        this.start_scroll_pos = this.$window.scrollTop();
        this.scroll_pos; 
        this.touch_interval;
        this.$current_section = this.$sections.eq(this.current_section);

        this.sizeStuff();

        //set up initial images 
        $('<img/>').attr('src', first_image).load(function() {
            $(this).remove(); // prevent memory leaks as suggested on Stackoverflow

            if(Modernizr.touch){
                base.$bg_images.eq(base.current_section).css('position', 'fixed'); 
                base.$bg_images.eq(base.next_section).css('position', 'fixed');
            }
            else{
                base.$bg_images.css('position', 'fixed');
            }

            $('.yt_wrap').fitVids();
            $('#easter-egg').css('margin-top', base.win_height); 
            $('body').css('overflow', 'auto');               
            //size again now that scroll bar is visible
            base.sizeStuff(); 
            //bind all events
            base.events();
            $('.accordion').accordion({
                icons: {
                    header: 'accordion-icon-closed',
                    activeHeader:'accordion-icon-open'
                },
                active: -1, 
                collapsible: true,
                heightStyle: 'content'
            });

            $('img').not('.accordion img').lazyload({ threshold: base.win_height * 2.5, skip_invisible: false});            
            $('.accordion img').lazyload({ threshold: base.win_height * 1.5, skip_invisible: false, effect: 'fadeIn' });

        }); 
    },

    scrollingDown: function(){
        var 
        current_scroll_pos = this.scroll_pos,
        scrollingDirection = current_scroll_pos > this.start_scroll_pos ? true : false;

        this.start_scroll_pos = current_scroll_pos;
        return scrollingDirection;
    },

    sizeStuff: function(){ 
        var base = this, 
        img_height = 723,
        img_width = 1500,
        window_width = base.$window.width(),
        window_height = base.$window.height(),

        width_ratio = window_width/img_width,
        height_ratio = window_height/img_height,
        temp_height = 0,
        temp_width = 0,
        left = 0;

        this.win_height = window_height;
        this.win_width = window_width;
        this.$top_spacers.height(this.win_height);
        this.$bg_wraps.height(this.win_height);

        base.$bg_images.css('height',window_height - 45);
        temp_width = img_width * height_ratio;
        base.$bg_images.css('width',temp_width);

        left = (temp_width - window_width)/2;
        base.$bg_images.css('left','-'+ left + 'px');

        $('body, html').animate({scrollTop: this.$current_section.offset().top}, 1); 
    }
}

<?php 

$deep_link = $template->lb_deeplink(); 
//deeplink() returns false if there isn't any deep link
$chapter = $deep_link == false ? 'city' : $deep_link[0];
$slide = $deep_link == false ? 'city' : $deep_link[1];
if($chapter == 'beach'){
    $first_image = $template->treems_asset('lookbook/beach_1.jpg');
    $current_section = 16;
}
else if($chapter == 'gas'){
    $first_image = $template->treems_asset('lookbook/gas_1.jpg');
    $current_section = 6;
}
else if($chapter == 'dock'){
    $first_image = $template->treems_asset('lookbook/dock_1.jpg');
    $current_section = 12;
}
else{
    $first_image = $template->treems_asset('lookbook/city_1.jpg');
    $current_section = 0;
}
?>

$(document).ready(function(){
    LB.init('<?=$chapter?>','<?=$first_image?>', '<?=$current_section?>');
});
