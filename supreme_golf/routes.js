var SG = SG || {};
//
//http://viget.com/inspire/extending-paul-irishs-comprehensive-dom-ready-execution
//
//A simple way to break out js into chunks that are loaded as needed
//
//Add new routes/paths/methods in the SG object below
//correspond to the controller/action class set on the body
//
SG = {
  common: {
    init: function(){
      SG.bookit();
      SG.not_signed_in();
    }
  },

  contest: {
    init: function(){},

    entry: function(){
      SG.contest_entry();
    } 
  },//end contest


  course_reviews: {
    init: function(){},

    index: function(){
      SG.course_reviews_index();
    },

    new: function(){
      SG.course_reviews_new();
    }
  },//end course_reviews

  deals: {
    init: function(){},

    show: function(){
      SG.deals_show();
    }
  },//end course_reviews

  home: {
    index: function(){
      SG.home_index();
    } 
  },

  registrations: {
    init: function(){
      SG.registrations_init();
    },

    edit: function(){ 
      SG.registrations_edit(); 
    } 
  },//end registrations

  sessions: {
    new: function(){ SG.sessions_new(); }
  },

  tee_times: {
    init: function(){ 
      SG.tee_times_datepicker(); 
      SG.tee_times_common(); 
    },

    city: function(){ SG.tee_times_city(); },

    course: function(){ 
      SG.tee_times_course(); 
      SG.course_reviews_index();
      SG.charts_and_graphs(); 
    }

  },//end tee_times

  users: {
    init: function(){},

    index: function(){
      SG.users_index(); 
    }
  }//end users
}

UTIL = {
  exec: function(controller, action){
    var action = typeof action === 'undefined' ? 'init' : action;

    if(controller !== '' && SG[controller] && typeof SG[controller][action] === 'function'){
      SG[controller][action]();
    }
  },

  init: function(){
    var 
      $body = $('body'), 
      body_classes = $body.attr('class').split(' '),
      controller = '', action = '';

    //depends on controller being first class, action being section class
    controller = body_classes[0].slice(2);
    action = body_classes[1].slice(2);

    UTIL.exec('common');
    UTIL.exec(controller);
    UTIL.exec(controller, action);
  
  }
}

$(document).ready( UTIL.init ); 
