var PRO = PRO || {};
PRO.views = PRO.views || {};

$(function($){

  	'use strict';
    PRO.form_model = new PRO.FormModel();	
	PRO.$pages = $('.pages');
    PRO.form1_complete = false; PRO.form2_complete = false; PRO.form3_complete = false; PRO.thanks_complete = false;
    PRO.views.step = new PRO.StepsView();
    PRO.router = new PRO.AppRouter();
    Backbone.history.start({pushState: true, root: '<?=$template->treems_local_path()?>a'});


});
