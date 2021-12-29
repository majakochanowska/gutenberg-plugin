const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { PanelBody, RangeControl } = wp.components;
const { InspectorControls } = wp.blockEditor;

registerBlockType(
	'gutenberg/percentage-indicator',
	{
		title: __( 'Percentage indicator', 'gutenberg' ),
		category: 'common',
		attributes: {
			percentage: {
				type: 'number',
				default: 50,
			}
		},
		example: {
			attributes: {
				percentage: 50,
			},
		},
		edit: ( { className, attributes, setAttributes } ) => {
			const { percentage } = attributes;

			return (
				<>
					<InspectorControls>
						<PanelBody>
							<RangeControl
								label={ __( 'Percentage', 'gutenberg' ) }
								value={ percentage }
								onChange={ ( value ) => setAttributes( { percentage: value } ) }
								min={ 0 }
								max={ 100 }
								initialPosition={ 50 }
								isShiftStepEnabled={ true }
								step={ 1 }
								shiftStep={ 10 }
								withInputField={ true }
							/>
						</PanelBody>
					</InspectorControls>
					<div className={ className }>
						<svg viewBox="0 0 36 36">
							<defs>
								<linearGradient id="strokegradient" x1="0%" y1="0%" x2="100%" y2="0%">
									<stop offset="0%" stopColor="#0d4ac0" />
									<stop offset="100%" stopColor="#1976db" />
								</linearGradient>
							</defs>
							<path className="wp-block-gutenberg-percentage-indicator__circle-background"
								d="M18 2.0845
								a 15.9155 15.9155 0 0 1 0 31.831
								a 15.9155 15.9155 0 0 1 0 -31.831"
							/>
							<path className="wp-block-gutenberg-percentage-indicator__circle"
								strokeDasharray={ `${ percentage }, 100` }
								d="M18 2.0845
								a 15.9155 15.9155 0 0 1 0 31.831
								a 15.9155 15.9155 0 0 1 0 -31.831"
								stroke="url(#strokegradient)"
							/>
							<text x="18" y="21" className="wp-block-gutenberg-percentage-indicator__percentage">{ percentage }%</text>
						</svg>
					</div>
				</>
			)
		},
		save: ( { className, attributes } ) => {
			const { percentage } = attributes;

			/* eslint-disable react/no-unknown-property */
			return (
				<div className={ className }>
					<svg viewBox="0 0 36 36">
						<defs>
							<linearGradient id="strokegradient" x1="0%" y1="0%" x2="100%" y2="0%">
								<stop offset="0%" stop-color="#0d4ac0" />
								<stop offset="100%" stop-color="#1976db" />
							</linearGradient>
						</defs>
						<path className="wp-block-gutenberg-percentage-indicator__circle-background"
							d="M18 2.0845
							a 15.9155 15.9155 0 0 1 0 31.831
							a 15.9155 15.9155 0 0 1 0 -31.831"
						/>
						<path className="wp-block-gutenberg-percentage-indicator__circle"
							stroke-dasharray={ `${ percentage }, 100` }
							d="M18 2.0845
							a 15.9155 15.9155 0 0 1 0 31.831
							a 15.9155 15.9155 0 0 1 0 -31.831"
							stroke="url(#strokegradient)"
						/>
						<text x="18" y="21" className="wp-block-gutenberg-percentage-indicator__percentage">{ percentage }%</text>
					</svg>
				</div>
			);
			/* eslint-enable */
		}
	}
);
