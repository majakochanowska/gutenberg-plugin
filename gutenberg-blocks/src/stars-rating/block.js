import Stars from './stars.js';

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor
const { PanelBody, __experimentalNumberControl: NumberControl } = wp.components;

registerBlockType(
	'gutenberg/stars-rating',
	{
		title: __( 'Stars rating', 'gutenberg' ),
		category: 'media',
		icon: 'star-filled',
		attributes: {
			starsNumber: {
				type: 'number',
				default: 1,
			},
		},
		example: {
			attributes: {
				starsNumber: 5,
			},
		},
		edit: ( { className, attributes, setAttributes } ) => {

			const { starsNumber } = attributes;

			return (
				<>
					<InspectorControls>
						<PanelBody
							title={ __( 'Set number of stars', 'gutenberg' ) }
						>
							<NumberControl
								value={ starsNumber }
								onChange={ ( value ) => setAttributes( { starsNumber: Number.parseInt( value ) } ) }
								min={ 1 }
								max={ 5 }
							/>
						</PanelBody>
					</InspectorControls>
					<Stars className={ className } starsNumber={ starsNumber } />
				</>
			)
		},
		save: ( { className, attributes } ) => {

			const { starsNumber } = attributes;

			return (
				<Stars className={ className } starsNumber={ starsNumber } />
			)
		},
	},
);
