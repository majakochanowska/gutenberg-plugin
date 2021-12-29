<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package gutenberg
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const VERSION = '1.3.0';

/**
 * Enqueue Gutenberg block assets for both backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function enqueue_backend_assets() {
	// Register block styles for both frontend + backend.
	wp_enqueue_style( 'gutenberg-blocks-css', esc_url( plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ) ), array( 'wp-editor' ), VERSION );

	// Register block editor script for backend.
	wp_enqueue_script( 'gutenberg-blocks-js', esc_url( plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ) ), array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), VERSION, true );

	// Register block editor styles for backend.
	wp_enqueue_style( 'gutenberg-blocks-editor-css', esc_url( plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ) ), array( 'wp-edit-blocks' ), VERSION );

	// Localize main plugin directory.
	wp_localize_script( 'gutenberg-blocks-js', 'gutenbergBlocks', array( 'pluginsUrl' => plugins_url( '', dirname( __FILE__ ) ) ) );
}

/**
 * Enqueue assets for frontend.
 */
function enqueue_frontend_assets() {

	wp_enqueue_script( 'gutenberg-blocks-frontend-js', esc_url( plugins_url( 'dist/frontend.build.js', dirname( __FILE__ ) ) ), array( 'wp-i18n' ), VERSION, true );
	wp_enqueue_style( 'gutenberg-blocks-css', esc_url( plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ) ), array(), VERSION );
}

add_action( 'enqueue_block_editor_assets', 'enqueue_backend_assets' );
add_action( 'wp_enqueue_scripts', 'enqueue_frontend_assets' );
