<?php
global $cat;
global $options;
foreach ($options as $value) {
    if (get_option( $value['id'] ) === FALSE) { $value['id'] = $value['std']; }
    else { $value['id'] = get_option( $value['id'] ); }
    }
?>
<?php 

get_template_part('header');  

?>
<div id="access" class="<?php ?>">
	
		<?php wp_nav_menu( array( 'theme_location' => 'tbl_nav','container_id' => 'nav', 'menu_class' => 'menu' ) ); ?>

	</div>
<!-- this is the category.php file -->

	<div id="container">
		
		<div id="categories">
			

		
      
      <?php
				$description_array = categoryDescriptions($cat);
				sidebarMenu($cat, $description_array);
								
			?>			
		</div>
	
		<div id="contentContainer">

			<div id="content">
			
				<!-- post is dynamically appended here-->

			</div><!-- #content -->
		</div>
		<div style="clear:both;"></div> 
	</div><!-- #container -->
	
<?php get_footer(); ?>
