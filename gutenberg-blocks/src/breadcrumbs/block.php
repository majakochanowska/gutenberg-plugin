<?php // phpcs:disable PSR1.Files.SideEffects.FoundWithSymbols
/**
 * Breadcrumbs block
 *
 * @package gutenberg
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// phpcs:enable PSR1.Files.SideEffects.FoundWithSymbols

add_action( 'init', 'register_breadcrumbs_block' );

/**
 * Register Gutenberg block
 */
function register_breadcrumbs_block() {

	register_block_type(
		'gutenberg/breadcrumbs',
		array(
			'editor_script'   => 'gutenberg-blocks-js',
			'render_callback' => 'render_breadcrumbs_block',
		)
	);
}

/**
 * Render breadcrumbs block
 */
function render_breadcrumbs_block() {

	global $post;

	$parent     = '';
	$ancestors  = array_reverse( get_post_ancestors( $post ) );
	$posts_page = get_option( 'page_for_posts' );

	foreach ( $ancestors as $ancestor ) {

		$parent_page_object = get_post( $ancestor );
		$parent_title       = $parent_page_object->post_title;
		$parent_link        = '';

		if ( empty( $parent_page_object->post_content ) ) {
			$parent_link = $parent_title;
		} else {
			$parent_link = '<a href=' . esc_url( get_permalink( $ancestor ) ) . '>' . esc_html( $parent_title ) . '</a>';
		}

		$parent .= '<li class="wp-block-gutenberg-breadcrumbs__parent">' . $parent_link . '</li>';
	}

	if ( is_single() && '0' !== $posts_page ) {

		$posts_page_ancestors = array_reverse( get_post_ancestors( $posts_page ) );
		$posts_page_title     = get_the_title( $posts_page );

		foreach ( $posts_page_ancestors as $posts_page_ancestor ) {

			$posts_page_parent_object = get_post( $posts_page_ancestor );
			$posts_page_parent_title  = $posts_page_parent_object->post_title;
			$posts_page_parent_link   = '';

			if ( empty( $posts_page_parent_object->post_content ) ) {
				$posts_page_parent_link = $posts_page_parent_title;
			} else {
				$posts_page_parent_link = '<a href=' . esc_url( get_permalink( $posts_page_ancestor ) ) . '>' . esc_html( $posts_page_parent_title ) . '</a>';
			}

			$parent .= '<li class="wp-block-gutenberg-breadcrumbs__parent">' . $posts_page_parent_link . '</li>';
		}

		$parent .= '<li class="wp-block-gutenberg-breadcrumbs__parent"><a href=' . esc_url( get_permalink( $posts_page ) ) . '>' . esc_html( $posts_page_title ) . '</a></li>';
	}

	return '<nav ' . get_block_wrapper_attributes() . ' aria-label="' . esc_html( __( 'breadcrumb', 'gutenberg' ) ) . '">
				<ul>
					<li><a href=' . esc_url( home_url() ) . '>' . esc_html( __( 'Home', 'gutenberg' ) ) . '</a></li>'
					. $parent .
					'<li>' . esc_html( $post->post_title ) . '</li>
				</ul>
			</nav>';
}
