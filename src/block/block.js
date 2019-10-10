/**
 * BLOCK: wk-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';
import { ColorPicker, PanelBody } from '@wordpress/components';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InspectorControls, AlignmentToolbar, BlockControls, RichText } = wp.editor;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'wk/wk-title', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'WK Title' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'wk-blocks' ),
		__( 'wk' ),
		__( 'WK' ),
	],
	attributes: {
		content: {
            type: 'string',
        },
        alignment: {
            type: 'string',
            default: 'none',
        },
		color: {type: 'string'}
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit( props ) {
		function updateContent(event) {
			props.setAttributes({content: event})
		}

		function updateColor(value) {
			props.setAttributes({color: value.hex})
		}

		function updateAlignment(newAlignment) {
			props.setAttributes( { alignment: newAlignment === undefined ? 'none' : newAlignment } );
		}

		return (
			<div>
				<InspectorControls>
					<PanelBody
						title="WK Block Settings"
						icon="welcome-widgets-menus"
						initialOpen={ true }
					>
						<ColorPicker color={props.attributes.color} onChangeComplete={updateColor}></ColorPicker>
					</PanelBody>
				</InspectorControls>
				<BlockControls>
					<AlignmentToolbar
						value={ props.attributes.alignment }
						onChange={ updateAlignment }
					/>
				</BlockControls>
				
				<RichText
                    style={ { textAlign: props.attributes.alignment, color: props.attributes.color } }
                    tagName="h1"
                    onChange={ updateContent }
                    value={ props.attributes.content }
                />
				
			</div>
		);
	},
	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
		let styles = {
			color: props.attributes.color,
			textAlign: props.attributes.alignment,
		};

		return (
			<div>
				<RichText.Content
					style={ styles }
					tagName="h1"
					value={ props.attributes.content }
				/>
			</div>
		);
	},
} );
