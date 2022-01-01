<?php
/**
 * Plugin Name: Gutenberg Blocks
 * Author: Maja Kochanowska
 * Description: Plugin with Gutenberg blocks
 * Version: 1.5.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package gutenberg
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';

/**
 * Server side rendered blocks
 */
require_once plugin_dir_path( __FILE__ ) . 'src/breadcrumbs/block.php';
