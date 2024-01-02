var PRO = PRO || {};

$(function($){

    'use strict';

    PRO.SeeTheBootView = Backbone.View.extend({

        initialize: function(){

            var current = 3, $circles = $('.radiation');

            $circles.addClass('pulse animated');

            setTimeout(function(){
                $('#toe-bullet').trigger('click');
            }, 2500);
        },

        el: '#see-the-boot',

        events:{
            'click .bullet'    : 'showXray'
        },

        render:function(){
            PRO.$pages.hide();

            $('#see_boot').hide();
            $('#return_to_contest').addClass('no-right-margin').show(); 
            $('#see_campaign').show();

            this.$el.show();
            window.scroll(0,0);
        },

        showXray: function(e){
            var $this = $(e.target), index = $('.bullet').index($this), $features = $('.feature_wrap');

            $('.feature_img').fadeOut();
            $this.parent('.radiation_wrap').find('.feature_img').fadeIn(1250);
            $features.fadeOut().eq(index).fadeIn(1250);

        }

    });

});
