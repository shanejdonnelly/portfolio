var PRO = PRO || {};

$(function($){

    'use strict';

    PRO.LogoCyclerView = Backbone.View.extend({

        el: 'header',

        initialize: function(){
            var base = this;
            this.cacheElements();
            this.last_swipe_right = false;
            this.$el.swipe({
                swipe: function(e, direction){ 
                    clearInterval(base.auto_cycle);
                    (direction === 'left') ? base.swipeLeft(e, direction) : base.swipeRight(e, direction); 
                }
            });
            this.auto_cycle;
            this.cycle();
        },
    
        cacheElements: function(){
            this.$images = this.$el.find('img');
            this.$image_wrappers = this.$el.find('div.logo');
        },

        cycle: function(){
            var base = this;
            this.auto_cycle = setInterval(function(){
                this.swipeLeft('', 'left');
            }, 3000);
        },

        swipeLeft: function(e, direction){

            this.$image_wrappers.each(function(){
                var left = $(this).position().left;

                if(left === -430){
                    $(this).css('left', 760)
                }
                else{
                    if(left === -600){ left = 760; $(this).css('left', left); }
                    $(this).animate({left: left-170}, 300, 'easeOutBack');
                }
            });
        },

        swipeRight: function(e, direction){
            this.$image_wrappers.each(function(){
                var left = $(this).position().left;

                if(left === 590){
                    $(this).css('left', -600)
                }
                else{
                    if(left === 760){ left = -600; $(this).css('left',left ); }
                    $(this).animate({left: left+170}, 300, 'easeOutBack');
                }
            });
        }

    });
});

