<?php $active_page = 'footwear'; ?>
<?php include('header.php'); ?>
<?php 
    $nine_eye_4112R = "<p>Style: 9-Eye Boot / No: 4112R</p><p>Material: Horween<sup>&reg;</sup> Talisman Full<br/>Grain and Flesh Out</p><p>Color: Brown</p>";
    $nine_eye_4113R = "<p>Style: 9-Eye Boot / No: 4113R</p><p>Material: Horween<sup>&reg;</sup> Longbranch Nubuck</p><p>Color: Wheat</p>";
    $nine_eye_4114R = "<p>Style: 9-Eye Boot / No: 4114R</p><p>Material: Horween<sup>&reg;</sup> Dublin Full Grain</p><p>Color: Rust</p>";
    $nine_eye_4115R = "<p>Style: 9-Eye Boot / No: 4115R</p><p>Material: Horween<sup>&reg;</sup> Dublin Full Grain</p><p>Color: Dark Brown</p>";

    $chukka_4116R = "<p>Style: Chukka / No: 4116R</p><p>Material: Horween<sup>&reg;</sup> Talisman Full<br/>Grain and Flesh Out</p><p>Color: Brown</p>";
    $chukka_4117R = "<p>Style: Chukka / No: 4117R</p><p>Material: Horween<sup>&reg;</sup> Longbranch Nubuck</p><p>Color: Wheat</p>";
    $chukka_4118R = "<p>Style: Chukka / No: 4118R</p><p>Material: Horween<sup>&reg;</sup> Dublin Full Grain</p><p>Color: Dark Brown</p>";
    $chukka_4119R = "<p>Style: Chukka / No: 4119R</p><p>Material: Horween<sup>&reg;</sup>  Dublin Full Grain</p><p>Color: Rust</p>";

    $pull_on_4123R = "<p>Style: Pull On / No: 4123R</p><p>Material: Horween<sup>&reg;</sup> Talisman Full<br/>Grain and Flesh Out</p><p>Color: Brown</p>";
    $pull_on_4124R = "<p>Style: Pull On / No: 4123R</p><p>Material: Horween<sup>&reg;</sup> Longbranch Nubuck</p><p>Color: Wheat</p>";
    $pull_on_4125R = "<p>Style: Pull On / No: 4123R</p><p>Material: Horween<sup>&reg;</sup> Dublin Full Grain</p><p>Color: Rust</p>";
    $pull_on_4126R = "<p>Style: Pull On / No: 4123R</p><p>Material: Horween<sup>&reg;</sup> Dublin Full Grain</p><p>Color: Dark Brown</p>"; 
?>
    <title>Timberland Boot Company&reg; - Footwear</title>
</head>
<body class="footwear">

    <div id="loading">
        <div id="status">
            <p>Footwear <span id="percentage"><span id="number">0</span>%</span></p> 
        </div><!-- #status -->
    </div><!-- #loading -->
    <div id="wrapper">

        <?php include('top_nav.php'); ?>

        <div class="row first-row"> 
            <div class="span4" id="main" >


<!-- ----------------------------------------

TITLE SLIDE 

----------------------------------------- -->
                <div class="row" id="intro" style="position:relative">
                    <div class="span2">
                         <img src="images/footwear/hero-footwear.jpg" alt="Timberland Boot Company&reg; - Boots"/>  
                    </div>
                    <div class="span2"> 
                        <h1>Cordwain Boots</h1>
                        <h2>Constructed with the purest Horween<sup>&reg;</sup> leathers, containing the fewest oils and dyes. Leather outsoles trimmed with Vibram<sup>&reg;</sup> rubber for traction. Goodyear Welted Construction provides time-tested durability, as well as ease of future repair. Made in Wynne, Arkansas.</h2>
                        <img class="icon-logo" src= "images/footwear/horween-logo.png" alt="Horween&reg;" /> 
                        <img class="icon-logo" src="images/footwear/vibram-logo.png" alt="Vibram&reg;" /> 
                    </div>
                </div>

                <div class="row" style="margin-top:25px;">
                    <div class="span4" style="position:relative;">
                         <img src="images/footwear/hero-h2t.jpg" alt="Timberland Boot Company&reg;" />
                         <p class="side_text_box" style="">
                            In fall 2014, Timberland Boot Company<sup>&reg;</sup> introduces the Cordwain Collection&mdash;acknowledging a time when cordwainers were recognized
                            as craftsmen of the finest luxury shoes in the world
                        </p>
                    </div>
                </div>

<!-- ----------------------------------------

9-EYE-BOOT 

----------------------------------------- -->

                <div class="row boot-title" style="margin-top:25px;">
                    <div class="span4" style="position:relative;">
                        <img src="images/footwear/nine-eye-header.jpg" alt="Nine-Eye Boot" /> 
                          <div class="text-block"> 
                                <p>
                                    <span class="small lubalin">Cordwain</span><br/>
                                    <span class="large">9-Eye Boot</span>
                                </p>
                            </div> 
                    </div>
                </div>

                <div class="row">
                    <div class="span4" >
                         <img src="images/footwear/nine-eye-h2t.jpg" alt="Timberland Boot Company&reg;" />

                    </div>
                </div>

                <!-- swipe area -->
                <div class="row" id="nine-eye-swipe">
                    <div class="span4 swiper-container " style="position:relative;">
                            <img src="images/small-arrow.png" class="arrow arrow-left" />
                            <img src="images/small-arrow.png" class="arrow arrow-right" />
                        <div class="swiper-wrapper nine-eye-wrapper">

                            <div class="swiper-slide">
                                 <img src="images/footwear/nine-eye-slider1.jpg" alt="Timberland Boot Company&reg;" />
                                 <div class="swiper-text product-detail">
<?=$nine_eye_4112R?>
									<p class="resize-icon">&nbsp;</p>
                                </div>
                            </div><!-- .swiper-slide -->
                            <div class="swiper-slide">
                                 <img src="images/footwear/nine-eye-slider2.jpg" alt="Timberland Boot Company&reg;" /> 
                                 <div class="swiper-text product-detail">
<?=$nine_eye_4113R?>
									<p class="resize-icon">&nbsp;</p>
                                </div> 
                            </div><!-- .swiper-slide -->
                            <div class="swiper-slide">
                                 <img src="images/footwear/nine-eye-slider3.jpg" alt="Timberland Boot Company&reg;" /> 
                                 <div class="swiper-text product-detail">
<?=$nine_eye_4114R?>
									<p class="resize-icon">&nbsp;</p>
                                </div> 
                            </div><!-- .swiper-slide -->
                            <div class="swiper-slide">
                                 <img src="images/footwear/nine-eye-slider4.jpg" alt="Timberland Boot Company&reg;" />
                                 <div class="swiper-text product-detail">
<?=$nine_eye_4115R?>
									<p class="resize-icon">&nbsp;</p>
                                </div>
                            </div><!-- .swiper-slide --> 
                        </div><!-- .swiper-wrapper -->
                    </div>
                </div>

<!-- ----------------------------------------

CHUKKA

----------------------------------------- -->
                <div class="row boot-title">
                    <div class="span4" style="position:relative;">
                        <img src="images/footwear/chukka-header.jpg" alt="Timberland Boot Company - Chukka" /> 
                          <div class="text-block"> 
                                <p>
                                    <span class="small lubalin">Cordwain</span><br/>
                                    <span class="large">Chukka</span>
                                </p>
                            </div> 
                    </div>
                </div>

                <div class="row">
                    <div class="span4">
                         <img src="images/footwear/chukka-h2t.jpg" alt="Timberland Boot Company&reg;" />
                    </div>
                </div>

                <!-- swipe area -->
                <div class="row" id="chukka-swipe">
                    <div class="span4 swiper-container" style="position:relative;">
                            <img src="images/small-arrow.png" class="arrow arrow-left" />
                            <img src="images/small-arrow.png" class="arrow arrow-right" />
                        <div class="swiper-wrapper chukka-wrapper">

                            <div class="swiper-slide">
                                 <img src="images/footwear/chukka-slider1.jpg" alt="Timberland Boot Company&reg;" />
                                 <div class="swiper-text product-detail">
<?=$chukka_4116R?>
									<p class="resize-icon">&nbsp;</p>
                                </div>
                            </div><!-- .swiper-slide -->
                            <div class="swiper-slide">
                                 <img src="images/footwear/chukka-slider2.jpg" alt="Timberland Boot Company&reg;" /> 
                                 <div class="swiper-text product-detail">
<?=$chukka_4117R?> 
									<p class="resize-icon">&nbsp;</p>
                                </div> 
                            </div><!-- .swiper-slide -->
                            <div class="swiper-slide">
                                 <img src="images/footwear/chukka-slider3.jpg" alt="Timberland Boot Company&reg;" /> 
                                 <div class="swiper-text product-detail">
<?=$chukka_4118R?> 
									<p class="resize-icon">&nbsp;</p>
                                </div> 
                            </div><!-- .swiper-slide -->
                            <div class="swiper-slide">
                                 <img src="images/footwear/chukka-slider4.jpg" alt="Timberland Boot Company&reg;" />
                                 <div class="swiper-text product-detail">
<?=$chukka_4119R?> 
									<p class="resize-icon">&nbsp;</p>
                                </div>
                            </div><!-- .swiper-slide --> 
                        </div><!-- .swiper-wrapper -->
                    </div>
                </div>

<!-- ----------------------------------------

PULL-ON

----------------------------------------- -->

                <div class="row boot-title">
                    <div class="span4" style="position:relative;">
                        <img src="images/footwear/pull-on-header.jpg" alt="Pull-On Boot" /> 
                          <div class="text-block"> 
                                <p>
                                    <span class="small lubalin">Cordwain</span><br/>
                                    <span class="large">Pull-On Boot</span>
                                </p>
                            </div> 
                    </div>
                </div>

                <div class="row">
                    <div class="span4" >
                         <img src="images/footwear/pull-on-h2t.jpg" alt="Timberland Boot Company&reg; - Pull-On Boot" />

                    </div>
                </div>

                <!-- swipe area -->
                <div class="row" id="pull-on-swipe">
                    <div class="span4 swiper-container " style="position:relative;">
                            <img src="images/small-arrow.png" class="arrow arrow-left" />
                            <img src="images/small-arrow.png" class="arrow arrow-right" />
                        <div class="swiper-wrapper pull-on-wrapper">

                            <div class="swiper-slide">
                                 <img src="images/footwear/pull-on-brown-slider.png" alt="Timberland Boot Company&reg; - Pull-On Boot" />
                                 <div class="swiper-text product-detail">
<?=$pull_on_4123R?>
									<p class="resize-icon">&nbsp;</p>
                                </div>
                            </div><!-- .swiper-slide -->
                            <div class="swiper-slide">
                                 <img src="images/footwear/pull-on-wheat-slider.png" alt="Timberland Boot Company&reg; - Pull-On Boot" /> 
                                 <div class="swiper-text product-detail">
<?=$pull_on_4124R?>
									<p class="resize-icon">&nbsp;</p>
                                </div> 
                            </div><!-- .swiper-slide -->
                            <div class="swiper-slide">
                                 <img src="images/footwear/pull-on-rust-slider.png" alt="Timberland Boot Company&reg; - Pull-On Boot" /> 
                                 <div class="swiper-text product-detail">
<?=$pull_on_4125R?>

									<p class="resize-icon">&nbsp;</p>
                                </div> 
                            </div><!-- .swiper-slide -->
                            <div class="swiper-slide">
                                 <img src="images/footwear/pull-on-darkbrown-slider.png" alt="Timberland Boot Company&reg; - Pull-On Boot" />
                                 <div class="swiper-text product-detail">
<?=$pull_on_4126R?>

									<p class="resize-icon">&nbsp;</p>
                                </div>
                            </div><!-- .swiper-slide --> 
                        </div><!-- .swiper-wrapper -->
                    </div>
                </div>

            </div><!-- #main -->
        </div><!-- row -->
    </div> <!-- #wrapper -->

<!-- BOOTS OVERLAY -->
<div class="overlay swiper-container boots-overlay">
  <div class="slide-wrap swiper-wrapper boots-overlay-wrapper">

    <!-- nine-eye slides -->
    <div class="slide swiper-slide">
      <img src="images/footwear/nine-eye-slider1.jpg"/>
      <div class="product-detail">
<?= str_replace('<br/>', ' ', $nine_eye_4112R)?> 
      </div> 
    </div><!-- .slide -->
    <div class="slide swiper-slide">
      <img src="images/footwear/nine-eye-slider2.jpg"/>
      <div class="product-detail">
<?= str_replace('<br/>', ' ', $nine_eye_4113R)?> 
      </div> 
    </div><!-- .slide --> 
    <div class="slide swiper-slide">
      <img src="images/footwear/nine-eye-slider3.jpg"/>
      <div class="product-detail">
<?= str_replace('<br/>', ' ', $nine_eye_4114R)?>
      </div> 
    </div><!-- .slide --> 
    <div class="slide swiper-slide">
      <img src="images/footwear/nine-eye-slider4.jpg"/>
      <div class="product-detail">
<?= str_replace('<br/>', ' ', $nine_eye_4115R)?>
      </div> 
    </div><!-- .slide -->

    <!-- chukka slides -->
    <div class="slide swiper-slide">
      <img src="images/footwear/chukka-slider1.jpg"/>
      <div class="product-detail">
<?= str_replace('<br/>', ' ', $chukka_4116R)?> 
      </div> 
    </div><!-- .slide -->
    <div class="slide swiper-slide">
      <img src="images/footwear/chukka-slider2.jpg"/>
      <div class="product-detail">
<?= str_replace('<br/>', ' ', $chukka_4117R)?> 
      </div> 
    </div><!-- .slide --> 
    <div class="slide swiper-slide">
      <img src="images/footwear/chukka-slider3.jpg"/>
      <div class="product-detail">
<?= str_replace('<br/>', ' ', $chukka_4118R)?>
      </div> 
    </div><!-- .slide --> 
    <div class="slide swiper-slide">
      <img src="images/footwear/chukka-slider4.jpg"/>
      <div class="product-detail">
<?= str_replace('<br/>', ' ', $chukka_4119R)?>
      </div> 
    </div><!-- .slide -->
    <!-- pull-on slides -->
    <div class="slide swiper-slide">
      <img src="images/footwear/pull-on-brown-slider.png"/>
      <div class="product-detail">
<?= str_replace('<br/>', ' ', $pull_on_4123R)?> 
      </div> 
    </div><!-- .slide -->
    <div class="slide swiper-slide">
      <img src="images/footwear/pull-on-wheat-slider.png"/>
      <div class="product-detail">
<?= str_replace('<br/>', ' ', $pull_on_4124R)?> 
      </div> 
    </div><!-- .slide --> 
    <div class="slide swiper-slide">
      <img src="images/footwear/pull-on-rust-slider.png"/>
      <div class="product-detail">
<?= str_replace('<br/>', ' ', $pull_on_4125R)?>
      </div> 
    </div><!-- .slide --> 
    <div class="slide swiper-slide">
      <img src="images/footwear/pull-on-darkbrown-slider.png"/>
      <div class="product-detail">
<?= str_replace('<br/>', ' ', $pull_on_4126R)?>
      </div> 
    </div><!-- .slide -->
  </div><!-- .slide-wrap -->

  <div class="pagination boot-pagination">  </div>
  
  <img src="images/small-arrow.png" class="arrow arrow-left" />
  <img src="images/small-arrow.png" class="arrow arrow-right" />

  <span class="close">&times;</span>
</div><!-- boots-overlay -->

<?php include('footer.php'); ?>
