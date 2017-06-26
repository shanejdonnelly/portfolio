var SG = SG || {};

SG.users_index = function(){ 

  init();

  //EVENTS
  $('.m-user-column--edit-button').on('click', function(e){ clickEditButton($(this)); }); 
  $('.m-user-column--cancel-button').on('click', function(e){ clickCancelButton($(this)); }); 
  $('.m-user-column--delete-btn').on('click', function(e){ clickDeleteButton($(this)); });

  //METHODS

  function clickDeleteButton($this){
    var 
    $el = $this.parent('.m-user-column--deal-alert'),
    id = $el.data('deal-id'),
    $loader = $('<div>', {class:'m-user-column--loader'});

    $('#email-alerts').append($loader);

    //remove that id via api call
    $.ajax({
      url: '/api/3.0.0/alerts/' + id + '.json',
      type: 'DELETE',
      success: function(){ 
        $el.remove(); 
        $loader.remove(); 
        notify();
      },
      error: function(){
        $loader.remove(); 
        notify({type: 'error', msg: 'Sorry, try again later'});
      }
    }); 
  }

  function clickCancelButton($this){
    var 
    section = $this.data('section'),
    $section = $('#' + section); 

    $section.removeClass('editable');   
  }

  function clickEditButton($this){
    var 
    section = $this.data('section'),
    $section = $('#' + section),
    done_text = $this.data('donetext'),
    edit_text = $this.data('edittext');

    if($section.hasClass('editable')){
      $this.html(edit_text);
      $section.removeClass('editable');   
    }
    else{
      $this.html(done_text);
      $section.addClass('editable');
    }
  }

  function init(){
    //make the edit buttons appear at same height on desktop
    if(Modernizr.mq('only screen and (min-width: 768px)')){
      $('.m-user-column--top-row').equalHeights(); 
    }

    //use masonry to flow my reviews into 2 columns
    $(window).load(function(){ 
      $('#review-wrap').masonry({
        columnWidth: '.grid-sizer',
        gutter: '.l-user--my-review-gutter',
        itemSelector: '.l-user--my-review-wrap'
      }); 
    });
  }

}

