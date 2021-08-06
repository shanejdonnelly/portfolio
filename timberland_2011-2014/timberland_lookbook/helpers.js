var LB = LB || {};

jQuery(function( $ ) {

  'use strict';

/**
*
* HELPERS
*
*/
  LB.Helper = {

    backgroundChange: function(base){

     switch(base.current_section){
       case base.section2:
         $('#section2_bg').fadeIn(1000);
       base.$bgs.not('#section2_bg').fadeOut(1000);
       break;
       case base.section3:
         $('#section3_bg').fadeIn(1000);
       base.$bgs.not('#section3_bg').fadeOut(1000);
       break;
       case base.section4:
         $('#section4_bg').fadeIn(1000);
       base.$bgs.not('#section4_bg').fadeOut(1000);
       break;
       default:
         $('#section1_bg').fadeIn(1000);
       base.$bgs.not('#section1_bg').fadeOut(1000);
       break;
     }
     console.log(base.$bgs)
    },

    evenWidths: function($el1, $el2){
      var 
      el1_width = $el1.first().width(),
      el2_width = $el2.first().width(),
      wider = el1_width;

      if(el2_width > wider){ 
        wider = el2_width;
        $el1.width(el2_width);
        $el2.width(el2_width);
      }
      else{
        $el2.width(el1_width);
        $el1.width(el1_width);
      }      
    },

    processHash: function(hash){
      var hash_array, hash_section;

      hash_array = hash.split("_");
      hash_section = hash_array[0].slice(1, hash_array[0].length);            
      return hash_section;
    },

    getCurrentSection: function(base){
      var 
      current_section,
      html_offset = base.$html.offset().top * -1;

      if( html_offset < base.section1_offset){ current_section = 'Intro'; }
      else if(base.section1_offset < html_offset && html_offset < base.section2_offset){ current_section = base.section1; }
      else if(base.section2_offset < html_offset && html_offset < base.section3_offset){ current_section = base.section2; }
      else if(base.section3_offset < html_offset && html_offset < base.section4_offset){ current_section = base.section3; }
      else if( html_offset > base.section3_offset ){ current_section = base.section4; }

      return current_section;
    },

    trackExternalLink: function($this, type){
      var href = $this.attr('href');
      _gaq.push(['_trackEvent', type, $this.attr('href')]);
      setTimeout(function(){ window.location = href;  }, 100);
    },

    trackShare: function($this){
      _gaq.push(['_trackEvent', 'Share', $this.data('analytic_info')]);
    },

    trackSectionview: function(base){ 
      _gaq.push(['_trackPageview', base.current_section]);
      console.log('section view');
    },

    trackPageview: function(section){
      _gaq.push(['_trackPageview', section]);
    }

  };//end Helper
});
