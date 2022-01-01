import { animateNumberElements } from './functions.js';
import { Icon, arrowUp as arrowUpIcon } from '@wordpress/icons';

const { registerFormatType, toggleFormat } = wp.richText;
const { RichTextToolbarButton } = wp.blockEditor;
const { __ } = wp.i18n;

/**
 * Add Animate number button if selected text is a number (number can have comma and/or plus sign on the end).
 *
 * @param {Object} properties Component properties.
 */
const Edit = ( properties ) => {

	let selectedContent = properties.value.text;

	if ( selectedContent.includes( ',' ) ) {
		selectedContent = selectedContent.replace( ',', '' );
	}

	if ( '+' === selectedContent.slice( -1 ) ) {
		selectedContent = selectedContent.slice( 0, -1 );
	}

	if ( isNaN( selectedContent ) ) { // eslint-disable-line unicorn/prefer-number-properties
		return null
	}

	return (
		<RichTextToolbarButton
			icon={ <Icon icon={ arrowUpIcon } /> }
			title={ __( 'Animate number', 'gutenberg' ) }
			onClick={ () => {
				properties.onChange(
					toggleFormat(
						properties.value,
						{
							type: 'gutenberg/animated-number',
						}
					)
				);
			} }
			isActive={ properties.isActive }
		/>
	);
};

/**
 * Register new format for animated number
 */
registerFormatType(
	'gutenberg/animated-number',
	{
		title: __( 'Animated number', 'gutenberg' ),
		name: 'gutenberg/animated-number',
		tagName: 'span',
		className: 'gutenberg-format-animated-number',
		edit: Edit,
	}
)

/**
 * Animate numbers
 */
window.addEventListener( 'load', () => {

	const checkIfEditorLoaded = setInterval( () => {

		const editor = document.querySelector( '.editor-styles-wrapper' );

		if ( null !== editor ) {

			clearInterval( checkIfEditorLoaded );
			animateNumberElements();
		}
	}, 100 );
} );
