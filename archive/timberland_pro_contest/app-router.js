var PRO = PRO || {};
PRO.views = PRO.views || {};

    'use strict';
$(function($){

    PRO.AppRouter = Backbone.Router.extend({
 
        routes: { 
            ''              : 'home',
            'home'          : 'home',
            'form'          : 'form',
            'form-error'    : 'formError',
            'rules'         : 'rules',
            'thanks'        : 'thanks',
            'photo-gallery' : 'photoGallery',
            'video-gallery' : 'videoGallery',
            'see-the-boot'  : 'seeTheBoot'
       },

        form: function(){
           if(typeof(PRO.views.form) === 'undefined'){ PRO.views.form = new PRO.FormView() }
           PRO.views.form.render();
       },

        formError: function(){
           if(typeof(PRO.views.form) === 'undefined'){ PRO.views.form = new PRO.FormView() }
           PRO.views.form.render();
           $('#form').find('h5.error-msg').show(); 
       },

        home: function(){
            if(typeof(PRO.views.home) === 'undefined'){ PRO.views.home = new PRO.HomeView() }
            PRO.views.home.render();
        },

        photoGallery: function(){
            if(typeof(PRO.views.photoGallery) === 'undefined'){ PRO.views.photoGallery = new PRO.PhotoGalleryView() }
            PRO.views.photoGallery.render();
        },

        rules: function(){
            if(typeof(PRO.views.rules) === 'undefined'){ PRO.views.rules = new PRO.RulesView() }
            PRO.views.rules.render();
        }, 

        seeTheBoot: function(){
            if(typeof(PRO.views.seeTheBoot) === 'undefined'){ PRO.views.seeTheBoot = new PRO.SeeTheBootView() }
            PRO.views.seeTheBoot.render();
        },

        thanks: function(){
            if(true){
                if(typeof(PRO.views.thanks) === 'undefined'){ PRO.views.thanks = new PRO.ThanksView() }
                PRO.views.thanks.render();
            } else{ PRO.router.navigate('form', true); }
        },

        videoGallery: function(){
            if(typeof(PRO.views.videoGallery) === 'undefined'){ PRO.views.videoGallery = new PRO.VideoGalleryView() }
            PRO.views.videoGallery.render();
        },


    });

});
