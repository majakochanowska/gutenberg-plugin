const { __ } = wp.i18n;
const { InnerBlocks, useBlockProps, RichText } = wp.blockEditor;
const { select, dispatch } = wp.data;
const { Tooltip, Dashicon } = wp.components;
const { createBlock } = wp.blocks;

/**
 * Display block in editor and create block settings
 *
 * @param {Object}   properties               Component properties.
 * @param {Object}   properties.attributes    Block attributes.
 * @param {Function} properties.setAttributes Set block attributes.
 * @param {string}   properties.clientId      Block id.
 */
export const BlockEdit = ( properties ) => {

	const { attributes, setAttributes, clientId } = properties;
	const { tabHeaders, activeTab } = attributes;

	const blockProperties = useBlockProps();

	/**
	 * Change text on tab header.
	 *
	 * @param {string} header Tab header title.
	 * @param {number} index  Index of selected tab header.
	 */
	const updateTabsTitle = ( header, index ) => {

		const newHeaders = tabHeaders.map( ( item, index_ ) => {
			if ( index === index_ ) {
				item = header;
			}
			return item;
		} );

		setAttributes( {
			tabHeaders: newHeaders
		} );
	}

	/**
	 * Set active tab.
	 *
	 * @param {number} selectedTab Index of selected tab.
	 */
	const updateActiveTab = ( selectedTab ) => {
		const { getBlockOrder } = select( 'core/block-editor' );
		const childBlocks = getBlockOrder( clientId );
		const { updateBlockAttributes } = dispatch( 'core/block-editor' );

		setAttributes( {
			activeTab: selectedTab
		} );

		for ( const childBlockId of childBlocks ) {
			updateBlockAttributes( childBlockId, {
				activeTab: selectedTab
			} );
		}
	}

	/**
	 * Add new tab.
	 */
	const addTab = () => {
		const { insertBlock } = dispatch( 'core/block-editor' );
		const tabItemBlock = createBlock( 'gutenberg/tab' );

		insertBlock( tabItemBlock, tabHeaders.length, clientId );
		setAttributes( {
			tabHeaders: [
				...tabHeaders,
				__( 'New tab', 'gutenberg' )
			]
		} );
	}

	/**
	 * Remove tab.
	 *
	 * @param {number} selectedTab Index of selected tab.
	 */
	const removeTab = ( selectedTab ) => {
		const { removeBlock } = dispatch( 'core/block-editor' );
		const { getBlockOrder } = select( 'core/block-editor' );
		const childBlocks = getBlockOrder( clientId );
		let newActiveTab = 0;

		removeBlock( childBlocks[ selectedTab ], false );

		if ( selectedTab < activeTab ) {
			newActiveTab = activeTab - 1;
		} else if ( selectedTab > activeTab ) {
			newActiveTab = activeTab;
		}

		setAttributes( {
			tabHeaders: tabHeaders.filter( ( value, index ) => index !== selectedTab ),
			activeTab: newActiveTab
		} );

	}

	return (
		<div { ...blockProperties }>
			<ul className="wp-block-gutenberg-tabs__headers">
				{ tabHeaders.map( ( header, index ) => (
					<li
						key={ index }
						className={ `wp-block-gutenberg-tabs__header${ index === activeTab ? ' wp-block-gutenberg-tabs__header--active' : '' }` }
					>
						{ 1 < tabHeaders.length && (
							<Tooltip text={ __( 'Remove tab', 'gutenberg' ) }>
								<button
									className="wp-block-gutenberg-tabs__remove"
									onClick={ () => removeTab( index ) }
								>
									<Dashicon icon="no" />
								</button>
							</Tooltip>
						) }
						<button onClick={ () => updateActiveTab( index ) } >
							<RichText
								tagName={ 'span' }
								value={ header }
								onChange={ ( value ) => updateTabsTitle( value, index ) }
							/>
						</button>
					</li>
				) ) }
				<li className="wp-block-gutenberg-tabs__header wp-block-gutenberg-tabs__header--add">
					<Tooltip text={ __( 'Add tab', 'gutenberg' ) }>
						<button onClick={ () => addTab() } >
							<Dashicon icon="plus" />
						</button>
					</Tooltip>
				</li>
			</ul>
			<div className="wp-block-gutenberg-tabs__content">
				<InnerBlocks
					template={ [ [ 'gutenberg/tab' ], [ 'gutenberg/tab' ], [ 'gutenberg/tab' ] ] }
					allowedBlocks={ [ 'gutenberg/tab' ] }
				/>
			</div>
		</div>
	);
}
