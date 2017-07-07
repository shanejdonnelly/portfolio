var PRO = PRO || {};
PRO.views = PRO.views || {};

$(function($){

  	'use strict';

    $('#main_contest_content').add('nav#contest').on("click", "a", function(evt) {
      var href = $(this).attr("href");

      evt.preventDefault();
      Backbone.history.navigate(href, true);

    });

      //initialize fancybox
      var init_30day = false;
      $('body').on('click','.fancyBoxLink', function(e){ 
        e.preventDefault(); 
        $(this).fancybox({padding:0,overlayColor:'#000', scrolling:'no'}); 
        //if this is first click, fancybox is set up, but we need it to open too
        if(!init_30day){
          init_30day = true; $(this).trigger('click'); 
        }
      });


    PRO.$pages = $('.content').add('.sidebar');
    PRO.$gallery_sidebar = $('#gallery-sidebar');
    PRO.$contest_sidebar = $('#contest-sidebar');
    PRO.form_complete = false;
    PRO.router = new PRO.AppRouter();
    Backbone.history.start({pushState: true, root: '/pro/2013-fall/contest'});


});
