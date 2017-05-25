<?php include('includes/header.php'); 
  do_header($lang, $eastern_standard_collection);
  $location = $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
?>

<body class="men eastern_standard">

  <!--[if lt IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->
  <script>eastern_standard_slide_text_array = ['4024R', '4025R', '4026R', '4027R'];</script>
  <div id="bg"></div>
  
  <div class="container">
  
    <!-- 
    *
    main content row 
    *
    -->
    
    <div class="row">
      <?php 
        include('includes/mens_nav.php');
      ?> 
      <div class="span3 main">
        <div class="box">
          <div class="image_cycler">
            <div class="slide">
              <img src="images/men/eastern_standard/4027R_large.jpg" alt="" />
            </div><!-- .slide -->
          </div><!-- .image_cycler -->
          <div class="below_cycler_text_wrap">
            <h2><?= $eastern_standard_collection; ?></h2>
            <p class="main_desc"><?= $eastern_standard_desc; ?></p>
            <h6>~</h6>
          </div>
        </div><!-- .box -->
      </div><!-- .span3 -->       
      
    </div><!-- .row -->
    
    <!-- 
    *
    video row 
    *
    -->
    <?php if($lang != 'zh'){ ?>
        <div class="row">
          <div class="span4">
            <?php 
              span3_video($eastern_standard_video); 
              video_sidebar($eastern_standard_main_title, $eastern_standard_main_content, 'common/ill_06.png');
            ?>
          </div><!-- .span4 -->
        </div><!-- .row -->
    <?php  } //endif ?>
    <!-- 
    *
    details row
    *
    -->
    
    <div class="row">
      <!-- single column, double row detail -->
      <?php detail_box('men/eastern_standard/detail_3.jpg', $eastern_standard_detail3_title, $eastern_standard_detail3_content); ?>
      
      <!-- single column stacked products -->
      <div class="span1">
        <?php product_box($shop, $share, $eastern_standard, $eastern_standard_product1_shop, $eastern_standard_product1_text,$eastern_standard_collection, 'men/eastern_standard/4024R_small.jpg','',  $location); ?>
        <?php product_box($shop, $share, $eastern_standard, $eastern_standard_product2_shop, $eastern_standard_product2_text,$eastern_standard_collection, 'men/eastern_standard/4025R_small.jpg', 'bottom_product_box',  $location); ?>
      </div><!-- .span1 -->        
    
      <?php horz_double_detail_box('men/eastern_standard/detail_2.jpg', $eastern_standard_detail2_title, $eastern_standard_detail2_content ); ?>
    
    </div>
    
    <!-- 
    *
    products row 
    *
    -->
    
    <div class="row">
      <?php span_three_detail_box('men/eastern_standard/detail_1.jpg', $eastern_standard_detail1_title, $eastern_standard_detail1_content, 'common/ill_05.png'); ?>
      
      <!-- single column stacked products -->
      <div class="span1">
        <?php product_box($shop, $share, $eastern_standard, $eastern_standard_product3_shop, $eastern_standard_product3_text,$eastern_standard_collection, 'men/eastern_standard/4026R_small.jpg','',  $location); ?>
        <?php product_box($shop, $share, $eastern_standard, $eastern_standard_product4_shop, $eastern_standard_product4_text,$eastern_standard_collection, 'men/eastern_standard/4027R_small.jpg', 'bottom_product_box',  $location); ?>
      </div><!-- .span1 -->
      
    </div><!-- .row -->

    
        
  </div><!-- .container -->

<?php  include('includes/footer.php'); ?> 
