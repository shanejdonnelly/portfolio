<?php 
	//$lookbook->treems_core("treems_utility");

	// Store Lookbook XML into an array
	//$lbxml = $xml->treems_xml();
    $pgxml = $product->treems_xml();
    $template_path = $template->treems_template_path('full');
    
    include($template_path.'includes/functions-s14.php');
?>

<?php
$masthead_src = $template->treems_asset('lookbook/lookbook-masthead.png');
$section_logo_src = $template->treems_asset('lookbook/lookbook-masthead-small-black.png');
$placeholder = $template->treems_asset("lookbook/placeholder.png");
?>

<img src="<?= $template->treems_asset('lookbook/loading.gif'); ?>" id="loader" alt="Loading" />

<div id="supawrap" class="<?=$template->treems_lang()?>">
    <img id="scroll-down-btn" class="easeinout" style="display:block !important;" src="<?=$template->treems_asset('lookbook/arrow-down.png')?>" alt="Scroll down to see the Timberland Spring 2014 Lookbook" />

<?php 
    if($template->treems_lang() == 'cn'){
        include($template_path.'includes/cn/product_callouts.php'); 
        include($template_path.'includes/cn/city.php');
        include($template_path.'includes/cn/ready.php');
        include($template_path.'includes/cn/harborside.php');
        include($template_path.'includes/cn/coast.php');
    } 
    else if($template->treems_lang() == 'hk'){
        include($template_path.'includes/hk/product_callouts.php'); 
        include($template_path.'includes/hk/city.php');
        include($template_path.'includes/hk/ready.php');
        include($template_path.'includes/hk/harborside.php');
        include($template_path.'includes/hk/coast.php');
    } 
    else if($template->treems_lang() == 'jp'){
        include($template_path.'includes/jp/product_callouts.php'); 
        include($template_path.'includes/jp/city.php');
        include($template_path.'includes/jp/ready.php');
        include($template_path.'includes/jp/harborside.php');
        include($template_path.'includes/jp/coast.php');
    }
    else if($template->treems_lang() == 'kr'){
        include($template_path.'includes/kr/product_callouts.php'); 
        include($template_path.'includes/kr/city.php');
        include($template_path.'includes/kr/ready.php');
        include($template_path.'includes/kr/harborside.php');
        include($template_path.'includes/kr/coast.php');
    }
    else if($template->treems_lang() == 'my'){
        include($template_path.'includes/my/product_callouts.php'); 
        include($template_path.'includes/my/city.php');
        include($template_path.'includes/my/ready.php');
        include($template_path.'includes/my/harborside.php');
        include($template_path.'includes/my/coast.php');
    } 
    else if($template->treems_lang() == 'sg'){
        include($template_path.'includes/sg/product_callouts.php'); 
        include($template_path.'includes/sg/city.php');
        include($template_path.'includes/sg/ready.php');
        include($template_path.'includes/sg/harborside.php');
        include($template_path.'includes/sg/coast.php');
    } 
    else if($template->treems_lang() == 'tw'){
        include($template_path.'includes/tw/product_callouts.php'); 
        include($template_path.'includes/tw/city.php');
        include($template_path.'includes/tw/ready.php');
        include($template_path.'includes/tw/harborside.php');
        include($template_path.'includes/tw/coast.php');
    } 
    else{
        include($template_path.'includes/en/product_callouts.php'); 
        include($template_path.'includes/en/city.php');
        include($template_path.'includes/en/ready.php');
        include($template_path.'includes/en/harborside.php');
        include($template_path.'includes/en/coast.php');
    }
?>
</div><!-- end #supawrap -->

        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an outdated browser. <a href="http://browsehappy.com/">Upgrade your browser today</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to better experience this site.</p>
        <![endif]-->

