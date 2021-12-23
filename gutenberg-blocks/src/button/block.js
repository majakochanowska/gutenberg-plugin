const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { ToggleControl, PanelBody } = wp.components;
const { __ } = wp.i18n;

/**
 * Add Open In Popup and Scroll To Section attributes
 *
 * @param {Object} settings Settings for the block.
 * @param {string} name     Name of the block.
 */
const addAttributes = ( settings, name ) => {

	if ( 'core/button' === name ) {

		settings.attributes = Object.assign( settings.attributes, {
			openInPopup: {
				type: 'boolean',
				default: false,
			},
			scrollToSection: {
				type: 'boolean',
				default: false,
			},
		} );

	}

	return settings;
}

addFilter(
	'blocks.registerBlockType',
	'GutenbergBlocks/add-attributes',
	addAttributes,
);

/**
 * Add Link behaviour panel in Inspector Controls.
 */
const linkBehaviourPanel = createHigherOrderComponent( ( BlockEdit ) => {
	return ( properties ) => {

		const {
			name,
			attributes,
			setAttributes,
			isSelected,
		} = properties;

		const {
			openInPopup,
			scrollToSection,
		} = attributes;

		return (
			<Fragment>
				<BlockEdit { ...properties } />
				{ isSelected && 'core/button' === name &&
					<InspectorControls>
						<PanelBody
							title={ __( 'Link behaviour', 'gutenberg' ) }
						>
							<ToggleControl
								label={ __( 'Open link in popup', 'gutenberg' ) }
								checked={ !! openInPopup }
								onChange={ () => setAttributes( { openInPopup: ! openInPopup } ) }
								help={ __( 'Set as link media url, e.g. https://player.vimeo.com/video/111111111', 'gutenberg' ) }
								disabled={ !! scrollToSection }
							/>
							<ToggleControl
								label={ __( 'Scroll to section', 'gutenberg' ) }
								checked={ !! scrollToSection }
								onChange={ () => setAttributes( { scrollToSection: ! scrollToSection } ) }
								help={ __( 'Set as link id of section, e.g. #loremipsum', 'gutenberg' ) }
								disabled={ !! openInPopup }
							/>
						</PanelBody>
					</InspectorControls>
				}
			</Fragment>
		);
	};
}, 'linkBehaviourPanel' );

addFilter(
	'editor.BlockEdit',
	'GutenbergBlocks/link-behaviour-panel',
	linkBehaviourPanel,
);

/**
 * Add 'data-rel' attribute if Open In Popup or Scroll To Section option is enabled
 *
 * @param {Object} extraProperties Block properties.
 * @param {Object} blockType       Blocks object.
 * @param {Object} attributes      Blocks attributes.
 */
const addDataAttribute = ( extraProperties, blockType, attributes ) => {

	const { openInPopup, scrollToSection } = attributes;

	if ( openInPopup && 'core/button' === blockType.name ) {
		return {
			...extraProperties,
			'data-rel': 'popup',
			role: 'button',
			'aria-haspopup': 'dialog',
		}
	}

	if ( scrollToSection && 'core/button' === blockType.name ) {
		return {
			...extraProperties,
			'data-rel': 'section',
		}
	}

	return extraProperties;

}

addFilter(
	'blocks.getSaveContent.extraProps',
	'GutenbergBlocks/add-data-attribute',
	addDataAttribute,
);
