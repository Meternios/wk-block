<?php
/**
 * Plugin Name: WK-Blocks — For Gutenberg
 * Plugin URI: https://github.com/Meternios
 * Description: wk-blocks — is a Gutenberg plugin.
 * Author: Florian Hitz
 * Author URI: https://github.com/Meternios
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
