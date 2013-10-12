var PRO = PRO || {};

$(function($){

    'use strict';

    PRO.PhotoGalleryView = Backbone.View.extend({

        el: '#photo-gallery',

        events: { 
          'click #next-arrow': 'showNext',
          'click #prev-arrow': 'showPrev' 
        },

        initialize: function(){
          var base = this;
         
          base.$photo_wrap = base.$el.find('#photo-wrap');
          base.gallery_num = 1; 
          base.urls = {}; 
          base.num_galleries; 
          base.getGallery(base.gallery_num, base.initCallback);
  
          if(base.num_galleries > 1){ base.$el.find('#arrow-wrap').show(); }
        },

        render:function(){
            PRO.$pages.hide();
            this.$el.show();
            PRO.$contest_sidebar.show(); 
            window.scroll(0,0);
        },

        ajaxLoading:function($el){
            $el
            .css('opacity', 0.35) 
            $('#ajax-cover').show();
        },

        ajaxDone:function($el){
            $el
            .css('opacity', 1) 
            $('#ajax-cover').hide();
        },

        getGallery: function(gallery_num, callback){
          var base = this;
          base.ajaxLoading(base.$el);
          $.getJSON('http://www.timberlandpro.com/includes/p.php?gallery=' + base.gallery_num, function(data){ 
            base.urls[base.gallery_num] = data.gallery;
            base.num_galleries = data.info;
            base.ajaxDone(base.$el); 
            callback(base);

          });
        },

        initCallback: function(base){

          //give it the first images 
          base.makeGallery(); 
          //bind fancybox to the images
          base.$el.find('a.fancyGallery').fancybox({titlePosition:'inside', padding:0  });

          //DOM stuff 
          if(base.num_galleries > 1){ base.$el.find('#arrow-wrap').show(); } 

        },

        makeGallery: function(){
           var 
              base = this,
              $gallery = $('<div class="gallery-wrapper"  id="gallery-' + base.gallery_num + '" />');

            //step thru each of the current links/photos/comments and create dom elements
            $.each(base.urls[base.gallery_num], function(key, value){
              var 
                $link = $('<a class="fancyGallery" rel="contest-photos" />').attr('href', this.photo).attr('title', this.comments), 
                $img = $('<img/>').attr('src', this.photo).attr('alt', this.comments);

              $link.append($img); 
              $gallery.append($link); 
            });
        
            //clear rows
            $gallery.find('a:nth-of-type(5) > img').css('clear', 'left');

            //append the created content to the page
            base.$photo_wrap.append($gallery); 
        },

        showNext: function(){
            var base = this;

            //iterate base.gallery_num 
            if(base.gallery_num === base.num_galleries){ return false; }
            base.gallery_num++;          

            //hide all galleries
            this.$el.find('.gallery-wrapper').hide();

            //deal with arrows
            this.$el.find('#prev-arrow').css('opacity', '1'); 
            if(base.gallery_num === base.num_galleries){ 
              this.$el.find('#next-arrow').css('opacity', '0.5'); 
            }    

            //see if we've loaded this gallery already
            if(base.$el.find('#gallery-' + base.gallery_num).length){
              this.$el.find('.gallery-wrapper').hide();
              this.$el.find('#gallery-' + base.gallery_num).fadeIn(1000); 
            }
            //if not already loaded
            else{
              //get new data
              base.getGallery(base.gallery_num, callback);    
            }

              function callback(){
                //make new gallery and display
                base.makeGallery()
                  base.$el.find('#gallery-' + base.gallery_num).fadeIn(1000); 
                window.scrollTo(0,0); 
              }

          },

        showPrev: function(){
          var base = this;

          //check that we're not at first gallery
          if(base.gallery_num === 1){ return false; }

          //iterate backwards to prev gallery
          base.gallery_num--;

          //deal with arrows
            this.$el.find('#next-arrow').css('opacity', '1'); 
            if(base.gallery_num === 1){ 
              this.$el.find('#prev-arrow').css('opacity', '0.5'); 
            }    

          //hide and show
            this.$el.find('.gallery-wrapper').hide();
            this.$el.find('#gallery-' + base.gallery_num).fadeIn(1000); 
        }

    });

});
