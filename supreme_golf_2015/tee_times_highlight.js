var SG = SG || {};

SG.highlightMaxDiscount = function($table){

  var max = 0, max_index = 0, max_array = [], $td = $table.find('td.savings');

  //finds lowest price index
  $td.each(function(i){
    var $this = $(this), current = parseInt($this.data('savings')); 
    if(current >= max){ 
      max = current; 
      max_index = i;
    } 
  });

  //put lowest into array first
  max_array.push(max_index);

  //find any with same price
  $td.each(function(i){
    var $this = $(this), current = parseInt($this.data('savings'));

    if(current === max){ 
      max_array.push(i); 
    } 
  });

  //if all are same price, do nothing
  if(max_array.length >= $td.length){ 
    //chirp, chirp 
  }
  else{ 
    //add our lowest price style hook
    $.each(max_array, function(index, value){ 
      var 
        $current_td = $td.eq(value),
        $players_amenities = $current_td.siblings('.players, .amenities').find('i');

      $current_td.parent('tr').addClass('lowest-price');
      //change amenities icons
      $players_amenities.addClass('bestdeal');
      
    }); 
  }
  $table.addClass('highlighted');
};//end highlight lowest tee_time


