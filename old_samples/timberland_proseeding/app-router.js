var PRO = PRO || {};
PRO.views = PRO.views || {};

$(function($){

    'use strict';

    PRO.AppRouter = Backbone.Router.extend({

        routes: { 
            ''          : 'welcome',
            'welcome'   : 'welcome',
            'form1'     : 'form1',
            'form2'     : 'form2',
            'form3'     : 'form3',
            'thanks'    : 'thanks'
        },

        form1: function(){
            if(typeof(PRO.views.form1) === 'undefined'){ PRO.views.form1 = new PRO.Form1View() }
            if(!PRO.thanks_complete){
                PRO.views.step.render('1');
                PRO.views.form1.render();
            }
        },

        form2: function(){
            if(PRO.form1_complete & !PRO.thanks_complete){
                if(typeof(PRO.views.form2) === 'undefined'){ PRO.views.form2 = new PRO.Form2View() }
                PRO.views.step.render('2');
                PRO.views.form2.render();
            }
            else{ PRO.router.navigate('form1', true); }
        },

        form3: function(){
            if(PRO.form2_complete & !PRO.thanks_complete){
                if(typeof(PRO.views.form3) === 'undefined'){ PRO.views.form3 = new PRO.Form3View() }
                PRO.views.step.render('3');
                PRO.views.form3.render();
            } else{ PRO.router.navigate('form2', true); }

        },

        thanks: function(){
            if(PRO.form3_complete){
                if(typeof(PRO.views.thanks) === 'undefined'){ PRO.views.thanks = new PRO.ThanksView() }
                PRO.views.thanks.render();
                PRO.views.step.render('thanks');
            } else{ PRO.router.navigate('form1', true); }
        },

        welcome: function(){
            if(typeof(PRO.views.welcome) === 'undefined'){ PRO.views.welcome = new PRO.WelcomeView() }
            if(!PRO.thanks_complete){
                PRO.views.welcome.render();
                PRO.views.step.render('welcome');
            }
        }


    });

});
