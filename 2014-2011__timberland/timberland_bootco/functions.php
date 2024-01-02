<?php
  function do_header($lang, $title = ''){
    $title_spacer = $title != '' ? ' : ' : '';
    
    echo '<!doctype html>
    <!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="'. $lang .'"> <![endif]-->
    <!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="'. $lang .'"> <![endif]-->
    <!--[if IE 8]>    <html class="no-js lt-ie9" lang="'. $lang .'"> <![endif]-->
    <!--[if gt IE 8]><!--> <html class="no-js" lang="'. $lang .'"> <!--<![endif]-->
    <head>
      <meta charset="utf-8">
      <title>Timberland Boot Company&reg;'. $title_spacer . $title . '</title>
      <meta name="description" content="">
      <meta name="viewport" content="width=device-width" />
      <link rel="stylesheet" href="http://corp.timberland.com/timberframe/css/tblGlobalContent.css" type="text/css" media="all" />
      <link rel="stylesheet" href="css/fancybox/fancy.css">
      <link rel="stylesheet" href="css/style.css">
      <!--[if lte IE 8]><link rel="stylesheet" href="css/ie.css"><![endif]-->
      <!--[if lt IE 8]><style>p.slide_text{ display:none; }</style><![endif]-->
      <script src="js/libs/modernizr-2.5.3.min.js"></script>

    </head>';  
  }
  
  /*
  * 3 span for iframe - pairs with video_sidebar()
  * 
  * 3 column wide 
  * 2 rows high (video height is less than standard row height)
  */  
  function span3_video($video){
    echo '<div class="span3 no_margin detail">
            <div class="box video">
              <iframe width="699" height="393" src="http://www.youtube.com/embed/' . $video . '?showinfo=0&wmode=transparent" frameborder="0" allowfullscreen></iframe>
            </div>
          </div><!-- .span3 -->';
  }
  

  /*
  * 3 span for image insteade of iframe - pairs with video_sidebar()
  * 
  * 3 column wide 
  * 2 rows high (video height is less than standard row height)
  */    
  function span3_image($img_src, $title){
    echo '<div class="span3 no_margin detail">
            <div class="box video">
              <img src="' . $img_src . '" alt="'. $title .'" />
            </div>
          </div>';
  }
  
  /*
  * 1 column, 2 row detail box without image - pairs with span3_image() or span3_video()
  * 
  * 1 column wide 
  * 2 rows high (video height is less than standard row height)
  */  
  function video_sidebar($title, $content, $icon_src = ''){
    echo '<div class="span1 no_margin">
            <div class="box video_sidebar detail"  style="">';
    if($icon_src != ''){
      echo '<img src="images/'. $icon_src .'" alt="' . $title . '" style="padding-top:10px;" class="icon" />';
    }
    echo     '<div class="video_inner_content_wrapper">
                <h2>' . $title . '</h2>
                <p>' . $content . '</p>
                <h6>~</h6>
              </div>
            </div>
          </div><!-- .span1 -->';
  }

  /*
  * Product box - product text below image, with roll out bar featuring Share and Shop links
  * 
  * 2 columns wide
  * 1 rows high
  *
  */   
  function product_box($shop_text, $share_text, $name, $shop_link, $product_text, $collection, $img_src, $position = '', $st_url){
    echo '<div class="box product_box ' . $position . '">
            <div class="roll_out_bar"><p class="roll_out">';
    if($shop_link != ''){
      echo '<a class="ga_shop" data-sku = "'. $product_text .'"  href="' . $shop_link .'" title="' . $shop_text . ' ' . $name . '">' . $shop_text .'</a> ~ ';
    }
    echo '<span data-collection = "'. $collection .'" data-sku = "'. $product_text .'" st_image="http://staging.timberland.com/bootco/2012-fall/bootco/images/'. $img_src .'" st_url="http://'. $st_url .'&st='. rand(1, 100000) .'" st_title="Timberland Boot Company&reg; : '. $product_text .'" class="st_sharethis_custom ga_share">'. $share_text .'</span>
          </p>
          </div><!-- .roll_out_bar -->
          <img src = "images/' . $img_src . '" title="" />
          <p class="product_text">' . $product_text . '</p>
        </div><!-- .product_box -->';
  }
  
  /*
  * Vertical detail box, with image on top and text below
  * 
  * 1 column wide 
  * 2 rows high
  */
  function detail_box($img_src, $title, $content, $no_border=false){
    if($no_border){
      $image_src = '<img src = "images/'. $img_src .'" alt="'. $title .'" />';
    }
    else{
      $image_src = '<img class="border" src = "images/'. $img_src .'" alt="'. $title .'" />';
    }
    echo '<div class="span1 vert_detail_box detail">
            <div class="box double_height_product_box details">
            '. $image_src .'
              <div class="inner_content_wrapper">
                <h2>'. $title .'</h2>
                <p>'. $content .'</p>
                <h6>~</h6>
              </div>
            </div>
          </div><!-- .span1 -->';
  }
  
  /*
  * Horizontal detail box, with image on left or right and text beside
  * 
  * 2 columns wide
  * 1 rows high
  *
  * Optional Params:
  * $bottom_box = 'bottom_product_box' ~ adjusts margin for bottom boxes
  * $left_img ~ Defaults to image on left
  */  
  function horz_detail_box($img_src, $title, $content, $bottom_box = '', $left_img = true){
    echo '<div class="span2 no_margin horz_detail_box detail"><div class="box product_box '. $bottom_box .'">';
    if($left_img){
      echo '<div class="span1 no_margin"><img src = "images/'. $img_src .'" alt="'. $title .'" /></div>';
    }
    echo '<div class="span1 no_margin"><div class="inner_content_wrapper" style="margin-left:11px;"><h2>'. $title .'</h2><p style="padding:0;">'. $content .'</p><h6>~</h6></div></div>';
    if(!$left_img){
      echo '<div class="span1 no_margin" style="margin-left:8px;"><img src = "images/'. $img_src .'" alt="'. $title .'" style="border-left:1px solid #330000;border-right:0;" /></div>';
    }
    echo '</div></div>';
  }

  /*
  * Horizontal double detail box
  *  
  *   IMAGE
  *  _______
  *
  *   TEXT
  * 
  * 2 columns wide
  * 2 rows high
  *
  */ 
  function horz_double_detail_box($img_src, $title, $content, $no_border=false, $position = ''){
    if($no_border){
      $image_src = '<img src = "images/'. $img_src .'" alt="'. $title .'" />';
    }
    else{
      $image_src = '<img class="border" src = "images/'. $img_src .'" alt="'. $title .'" />';
    }
    echo '<div class="span2">
            <div class="box double_height_product_box detail '. $position .'">
              ' . $image_src . '
              <div class="inner_content_wrapper">
                <h2>' . $title . '</h2>
                <p>' . $content . '</p>
                <h6>~</h6>
              </div>
            </div>
          </div>';
  }
  
  /*
  * Vertical double detail box
  *  
  *         |
  *   IMAGE | TEXT
  *         |
  *
  * 2 columns wide
  * 2 rows high
  *
  */ 
  function vert_double_detail_box($img_src, $title, $content, $no_border=false, $icon_src = ''){
    if($no_border){
      $image_src = '<img src = "images/'. $img_src .'" alt="'. $title .'" />';
    }
    else{
      $image_src = '<img  src = "images/'. $img_src .'" alt="'. $title .'" style="border-bottom:none;border-right:1px solid #330000;"/>';
    }
    echo '<div class="span2">
            <div class="box double_height_product_box detail">
              <div class="span1 no_margin">
                ' . $image_src . '
              </div>
              <div class="span1 no_margin">';
    if($icon_src !== ''){
      echo '<img src="images/'. $icon_src .'" alt="'. $title .'" style="padding-top:5px;" class="icon" />';
    }
    echo        '<div class="vert_inner_content_wrapper">
                  <h2>'. $title .'</h2>
                  <p>'. $content .'</p>
                  <h6>~</h6>
                </div>
              </div>
            </div>
          </div>';
  }

  /*
  * 3 span detail box - 2 x 2 image (462px), next to 1 x 2 text
  * 
  * 3 columns wide
  * 2 rows high
  *
  */ 
  function span_three_detail_box($img_src, $title, $content, $icon_src = ''){
    echo '<div class="span3">
        <div class="span2 no_margin">
          <div class="box detail">
            <img src="images/'. $img_src .'" alt="'. $title .'" />
          </div>
        </div>
        <div class="span1 no_margin">
          <div class="box double_height_product_box pad_left detail">';
    if($icon_src !== ''){
      echo '<img src="images/'. $icon_src .'" alt="'. $title .'" style="padding-top:5px;" class="icon" />';
    }
    echo '<div class="vert_inner_content_wrapper">
          <h2>'. $title .'</h2>
            <p>'. $content .'</p>
            <h6>~</h6>
          </div>
          </div>
        </div>
      </div>';
  }
  
  /*
  * Full width detail box - 2 x 2 image (462px) and 2 x 2 detail text, shorter video height (363px)
  *
  * 4 columns wide
  * 2 rows high
  *
  */ 
  function double_double($img_src, $title, $content, $icon_src = ''){
    echo '      <div class="span4">
        
          <div class="span2 no_margin">
            <div class="box video">
              <img src="images/'. $img_src .'" alt="'. $title .'" />
            </div>
          </div>
          <div class="span2 no_margin">
            <div class="box video_sidebar detail">';
    if($icon_src != ''){
      echo '<img style="margin-top:20px;" src="images/'. $icon_src .'" alt="'. $title .'" class="icon" />';
    };
    echo      '<div class="video_inner_content_wrapper">
                <h2>'. $title .'</h2>
                <p>'. $content .'</p>
                <h6>~</h6>
              </div>
            </div>
          </div>
        
      </div><!-- .span4 -->';
  }
?>
