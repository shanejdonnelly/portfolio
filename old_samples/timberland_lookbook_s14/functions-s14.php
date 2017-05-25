<?php
    //2014 Spring
    function outputAccordion($products){
        global $template;
        $html = '<div class="accordion">';

        $index = 0; 
        $num_products = count($products);
        foreach($products as $product){ 
            $default_color = $product['@attributes']['default-color'];
            $img_src = $template->treems_asset("lookbook/". $product['@attributes']['image']);
            $placeholder = $template->treems_asset("lookbook/placeholder.png");


            $html.= '<h3><a href="#">'.$product['name'].'</a></h3>';
            $html.= '<div>';
            $html.= '<p class="shoe-stats">'.$default_color.', '.$product['@attributes']['id'].'</p>';
            $html.= '<p class="price">'.$product['@attributes']['price'].'</p>';
            if(++$index == $num_products){
              $html.= '<img data-original="'.$img_src.'" src="'.$placeholder.'" class="lifestyle" />';
            }
            else{
              $html.= '<img data-original="'.$img_src.'" src="'.$placeholder.'" class="product" />'; 
            }
			$html.= '<div class="social-wrap">';
			$html.= '<span class="st_twitter_large" st_image="'.$img_src.'" st_title="'.$product['name'].'" st_via="Timberland" displayText="Twitter"></span>';
			$html.= '<span class="st_pinterest_large" st_image="'.$img_src.'" st_title="'.$product['name'].'"  st_via="Timberland"  displayText="Pinterest"></span>';
			$html.= '<span class="st_tumblr_large" st_image="'.$img_src.'" st_title="'.$product['name'].'"  st_via="Timberland"  displayText="Tumbler"></span>';
			$html.= '<span class="st_email_large" st_image="'.$img_src.'" st_title="'.$product['name'].'"  st_via="Timberland"  displayText="Email"></span>';
            $html.= '</div></div>';
        }

        $html.= '</div><!-- end .accordion -->';
        echo $html;
    }
?>



