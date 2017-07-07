var PRO = PRO || {};

$(function($){

    'use strict';
    
    PRO.valid_skus = '';
    $('#sku-datalist').find('option').each(function(){PRO.valid_skus += ' ' ; PRO.valid_skus += $(this).val(); });

    PRO.Validate = {
        email: function(email){
            var re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;
            return re.test(email);
        },
        notEmpty: function(string){
            var re = /^[ ]*$/;
            return re.test(string) ? false : true;
        },
        sameVal: function(name){
            var $inputs = $('input[name ^= ' + name + ']'),
                initial_value='', match = false;
            $inputs.each(function(){
                var value = $(this).val();
                if(value === initial_value){ match = true; }
                else{ initial_value = value; }
            });
            return match;
        },
        sku: function(sku){
            var re = /^[0-9A-Za-z]{5}$/, right_length, valid;
            right_length =  re.test(sku);
            valid = (PRO.valid_skus.indexOf(sku) !== -1) ? true : false;
            return valid && right_length;
        },
        zip: function(zip){
            var valid5, valid9,
                re5 = /^[0-9]{5}$/,
                re9 = /^[0-9]{5}-[0-9]{4}$/;
            valid5 = re5.test(zip);
            valid9 = re9.test(zip);
            return (valid5 || valid9) ? true : false;
        },
        alphaNumeric10: function(code){
            var re = /^[0-9A-Za-z]{10}$/;
            return re.test(code);
        },
        check: function(name, value, optional){
            var valid;
            optional = (typeof optional === 'undefined') ? '' : optional;

            if(name === 'email'){
                valid = PRO.Validate.email(value);
            }
            else if(name === 'zip'){
                valid = PRO.Validate.zip(value);
            }
            else if(name.match(/^style/)){
                valid = (PRO.Validate.sku(value) & !PRO.Validate.sameVal('style')) ? true : false;
            }
            else if(name === 'code'){
                valid = (PRO.Validate.alphaNumeric10(value));
            }
            else{
                valid = PRO.Validate.notEmpty(value);
            }
            return valid;
        },

        checkAll: function($el){
           var no_errors = true; 
            $el.find('.validate').each(function(){
                var valid, name = $(this).attr('name'), value = $(this).val();
                valid = PRO.Validate.check(name, value);
                if(!valid){ 
                    no_errors = false; 
                    $(this).addClass('error'); 
                }
            });
            return no_errors;
        }   
    };
});
