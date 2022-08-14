const { InnerBlocks, useBlockProps } = wp.blockEditor;

/**
 * Display block on frontend
 */
export const BlockSave = () => {

	return (
		<div { ...useBlockProps.save() } role="tabpanel">
			<InnerBlocks.Content />
		</div>
	);
}
