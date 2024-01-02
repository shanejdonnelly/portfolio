
function show_videos($is_slideshow=true,$postid, $count=999, $height=272, $width=476, $margin_left='62px') {
	switch(qtrans_getLanguage()){
		case "tw": $ext = '-tw'; break;
		case "zh": $ext = '-zh'; break;
		case "jp": $ext = '-jp'; break;
		case "hk": $ext = '-hk'; break;
		case "sg": $ext = ''; break;
		case "my": $ext = ''; break;
		case "en":
		case "en-gb":
		default:		
		$ext = ''; 
		break;
	}
	if($is_slideshow){ 
		$pre = '<div class="slide">'; 
		$epre = "</div>"; 
	}else{ 
		$pre = ''; 
		$epre = '';
  }
	$thumb_pre = '<div class="slide_thumb" style="opacity:0.6">';
  
	$customfield = 'video'.$ext;
	if ( get_post_meta($postid, $customfield, true) ){ 
		$videos = get_post_meta($postid, $customfield, false);
    $play_button = '<img src="' . site_url() . '/wp-content/uploads/play_thumb.png" class="play" />';
		$html = array();
    //$html[0] = '';
    //$html[1] = array();
		$i = 0;
		foreach($videos as $video){
			if($i <= $count){ //limit to one video on home page
				if(qtrans_getLanguage() == 'zh'){
					//$html[0] .= $pre.'<embed style="margin-left:'.$margin_left.'" src="'.$video.'" quality="high" width="'.$width.'" height="'.$height.'" align="middle" allowScriptAccess="always" allowFullScreen="true" mode="transparent" type="application/x-shockwave-flash"></embed>'.$epre;					
          $html[$i] = $video;
				}else{
					//$html[0] .= $pre.'<iframe style="margin-left:'.$margin_left.'" class="youtube-player" type="text/html" width="'.$width.'" height="'.$height.'" src="http://www.youtube.com/embed/'.$video.'?rel=0&amp;autohide=1&amp;wmode=opaque&amp;showinfo=0&amp;enablejsapi=1" frameborder="0"> </iframe>'.$epre;
          $html[$i] = $video;
				}
			} //end if
		$i++;
		} //end foreach
	} //endif 
	return $html;
}

function categoryDescriptions($thisCat){
  if($thisCat == 3){ //footwear
    $args1 = array('category'=> 23,'meta_key'=>'order','orderby'=>'meta_value_num','numberposts'=>20 );
    $descPosts = get_posts( $args1 ); 
  }
  else if($thisCat == 13){ //apparel
    $args1 = array('category'=> 24,'meta_key'=>'order','orderby'=>'meta_value_num','numberposts'=>20  );
    $descPosts = get_posts( $args1 ); 
  }
  else if($thisCat == 19){ //gear
    $args1 = array('category'=> 25,'meta_key'=>'order','orderby'=>'meta_value_num','numberposts'=>20  );
    $descPosts = get_posts( $args1 ); 
  }
  
  $desc_array = array();
  foreach($descPosts as $post){
    array_push($desc_array, __($post -> post_content));
  }
  
  return $desc_array;
  
}

function getFootwearDescriptions(){  
  $args1 = array('category'=> 23,'meta_key'=>'order','orderby'=>'meta_value_num','numberposts'=>20 );
  $descPosts = get_posts( $args1 ); 

  $desc_array = array();
  foreach($descPosts as $post){
    array_push($desc_array, __($post -> post_content));
  }
  
  return $desc_array;
  
}
