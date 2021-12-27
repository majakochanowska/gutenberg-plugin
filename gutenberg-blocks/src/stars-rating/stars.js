const pluginUrl = gutenbergBlocks.pluginsUrl; // eslint-disable-line no-undef
const { __ } = wp.i18n;

/**
 * Stars component
 *
 * @param {Object} props             Component properties.
 * @param {string} props.className   CSS class name of the block.
 * @param {number} props.starsNumber Number of stars.
 */
const Stars = ( { className, starsNumber } ) => {

	return (
		<div className={ className } aria-label={ `${ starsNumber } ${ 1 === starsNumber ? __( 'star', 'gutenberg' ) : __( 'stars', 'gutenberg' ) }` }>
			{ [ ...Array( starsNumber ) ].map( ( index ) => <img src={ `${ pluginUrl }/assets/star.svg` } alt="" key={ index } /> ) /* eslint-disable-line unicorn/new-for-builtins */ }
		</div>
	)
}

export default Stars;
