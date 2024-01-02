var PRO = PRO || {};

$(function($){

    'use strict';

    PRO.FormView = Backbone.View.extend({

        el: 'form#pro_seeding',
       
        initialize: function(){ 
            this.model =  PRO.form_model;
        },

        events: {
            'click .submit_button'  : 'submitSection',
            'blur input.validate'   : 'validate',
            'keyup input.error' : 'validate'
        },

        save: function($this){
            var content = {}, key = $this.attr('name');
            content[key] = $this.val();
            this.model.set(content);
            this.model.get(key);
        },

        validate: function(e){
            var 
            $this = $(e.target),
            valid = PRO.Validate.check($this.attr('name'), $this.val()),
            message = $this.data('error-msg'),
            $error_msg = $this.next('span.error_msg'), 
            $icon = $this.prev('span.icon');

            //set up a default error message
            message = (typeof(message) === 'undefined') ? 'This field is required.' : message;

            //append error/valid icon if not already there
            if(!$icon.length){ $this.before('<span class="icon"></span>'); }

            if(valid){
                $this.removeClass('error').addClass('valid');
                $error_msg.remove();
                $this.prev('.icon').removeClass('error_icon').addClass('valid_icon');
                this.save($this);
            }
            else{ 
                $this.addClass('error');
                $this.prev('.icon').removeClass('valid_icon').addClass('error_icon');
                if(!$error_msg.length) 
                    $this.after('<span class="error_msg">'+ message +'</span>');
            }
        },

    });

});
