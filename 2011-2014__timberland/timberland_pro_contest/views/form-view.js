var PRO = PRO || {};

$(function($){

    'use strict';

    PRO.FormView = Backbone.View.extend({

        el: '#form',
       
        events: {
            'click #submit-button'         : 'submitSection',
            'blur input.validate'          : 'validate',
            'keyup input.error'            : 'validate',
            'change input#actual-upload'   : 'updateFileName',
            'change #desktop-comments': 'addName',
            'change #mobile-comments' : 'addName', 
            'change input#over18'          : 'enableSubmit'
        },

        initialize: function(){ 

        },

        render: function(){
            //TODO wire this up
            PRO.form_complete = true;
            PRO.$pages.hide();
            this.$el.show();
            PRO.$gallery_sidebar.show();       
            window.scrollTo(0,0);
        }, 
/*
  HELPER FUNCTIONS
*/
        addName: function(e){
          var $el = $(e.target);
          $el.attr('name', 'comments');
        },
        ajaxLoading:function($el){
            $el
            .css('opacity', 0.35)
            .find('#submit-button')
            .hide();
            $('#ajax-cover').show();
        },

        ajaxDone:function($el){
            $el
            .css('opacity', 1)
            .find('input.btn')
            .show();
            $('#ajax-cover').hide();
        },


        enableSubmit: function(e){
            var 
                $checkbox = $(e.target),
                $sb = this.$el.find('#submit-button'),
                checked = $checkbox.is(':checked');
            $sb.prop('disabled', !checked);
           
           if(checked){ 
            
              $sb.removeClass('disabled');

            }
            else{
           
              $sb.addClass('disabled');

            }
        },

        submitSection: function(e){
            e.preventDefault();
            var base = this, data;

            floodlightTrack();

            if(window.FormData){
                data = new FormData();    
            }

            //check all inputs
            var no_errors = PRO.Validate.checkAll($('#contest-form'));
            if(no_errors){
              $('#contest-form').submit();
              this.ajaxLoading($('#form'));
            }
            else{
               PRO.router.navigate('form', true) 
            }

            function floodlightTrack() {
                    var click1 = new Image();
                    var axel = Math.random() + "";
                    var ord = axel * 1000000000000000000;
                    click1.src = 'http://15631.fls.doubleclick.net/activityi;src=16231;type=timbe207;cat=deskt149' + ord + '?'; 

            }

        },

        updateFileName: function(e){
          var 
            input = $(e.target).val(),
            input_array = input.split('\\'),
            file_name = 'C:/.../' + input_array[input_array.length -1];
        
          $('#file-upload-name').val(file_name).removeClass('error');

        },

        validate: function(e){
            var 
            $this = $(e.target),
            valid = PRO.Validate.check($this.attr('name'), $this.val()); 

            if(valid){
                $this.removeClass('error');
            }
            else{ 
                $this.addClass('error');
            }
        }
    });

});
