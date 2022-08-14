const { InnerBlocks } = wp.blockEditor;
const { select } = wp.data;

/**
 * Display block in editor
 *
 * @param {Object} properties          Component properties.
 * @param {string} properties.clientId Block id.
 */
export const BlockEdit = ( properties ) => {

	const { clientId } = properties;

	const { getBlockRootClientId, getBlockAttributes, getBlockOrder } = select( 'core/block-editor' );
	const parentBlock = getBlockRootClientId( clientId );
	const parentBlockAttributes = getBlockAttributes( parentBlock );
	const childBlocks = getBlockOrder( parentBlock );

	return (
		<div className={ `wp-block-gutenberg-tab${ parentBlockAttributes.activeTab === childBlocks.indexOf( clientId ) ? ' wp-block-gutenberg-tab--active' : '' }` }>
			<InnerBlocks
				template={ [ [ 'core/paragraph' ] ] }
				templateLock={ false }
			/>
		</div>
	);
}
