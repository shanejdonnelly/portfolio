var PRO = PRO || {};

$(function($){

    'use strict';

    PRO.Form3View = PRO.FormView.extend({

        el: '#section3',
        
        events: {
            'click .submit_button'  : 'submitSection',
            'blur input.validate'   : 'validate',
            'keyup input.error'     : 'validate',
            'change #legal_bs'      : 'enableSubmit'
        },

        ajaxLoading:function($el){
            $el
            .css('opacity', 0.35)
            .find('input.btn')
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
                $checkbox = this.$el.find('#legal_bs'),
                $sb = this.$el.find('#form_submit'),
                checked = $checkbox.is(':checked');

            $sb.prop('disabled', !checked);
        },

        render:function(section){
            PRO.$pages.hide();
            this.$el.show();
            window.scrollTo(0,0);
            if(!Modernizr.touch){ this.$el.find('input[name="style_1"]').focus(); }
        },

        submitSection: function(e){
            e.preventDefault();
            var base = this, data;
            //check all inputs
            var no_errors = PRO.Validate.checkAll($('form#pro_seeding fieldset'));
            if(no_errors){
                data = $('#pro_seeding').serialize();
                this.ajaxLoading(this.$el); 
                $.post("<?=$template->treems_url()?>api/tbl_proseeding/add-ambassador", data, function(data){base.submitCallback(data);});
            }
            else{
               PRO.router.navigate('form1', true) 
            }
        },

        submitCallback: function(data){
            this.ajaxDone(this.$el);
            if(data.result === 'failure'){
                alert('There was a problem with your submission, please try again.');
                PRO.router.navigate('form1', true)
            }
            else{
                PRO.form3_complete = true;
                PRO.router.navigate('thanks', true)
            }
        }

    });
});
