<?php 

    $pgxml = $product->treems_xml();
    $template_path = $template->treems_template_path('full');
    
    include($template_path.'includes/functions-s14.php');
?>

<?php
$masthead_src = $template->treems_asset('lookbook/lookbook-masthead.png');
$section_logo_src = $template->treems_asset('lookbook/lookbook-masthead-small-black.png');
$placeholder = $template->treems_asset("lookbook/placeholder.png");
?>

<?php include($template_path.'includes/city.php');?>
<?php include($template_path.'includes/gas.php');?>
<?php include($template_path.'includes/dock.php');?>
<?php include($template_path.'includes/beach.php');?>


        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an outdated browser. <a href="http://browsehappy.com/">Upgrade your browser today</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to better experience this site.</p>
        <![endif]-->

