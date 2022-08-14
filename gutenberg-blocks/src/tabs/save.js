const { InnerBlocks, useBlockProps, RichText } = wp.blockEditor;

/**
 * Display block on frontend
 *
 * @param {Object} properties            Component properties.
 * @param {Object} properties.attributes Block attributes.
 */
export const BlockSave = ( properties ) => {

	const { attributes } = properties;
	const { tabHeaders, activeTabFront } = attributes;

	return (
		<section { ...useBlockProps.save() }>
			<ul className="wp-block-gutenberg-tabs__headers" role="tablist">
				{ tabHeaders.map( ( header, index ) => (
					<li
						key={ index }
						className={ `wp-block-gutenberg-tabs__header${ index === activeTabFront ? ' wp-block-gutenberg-tabs__header--active' : '' }` }
						role="tab"
						aria-selected={ index === activeTabFront ? 'true' : 'false' }
						aria-controls={ `tab${ index + 1 }` }
					>
						<button>
							<RichText.Content
								tagName={ 'span' }
								value={ header }
							/>
						</button>
					</li>
				) ) }
			</ul>
			<div className="wp-block-gutenberg-tabs__content">
				<InnerBlocks.Content />
			</div>
		</section>
	);
}
