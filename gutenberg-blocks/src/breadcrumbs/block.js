const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { ServerSideRender } = wp.editor;

registerBlockType(
	'gutenberg/breadcrumbs',
	{
		title: __( 'Breadcrumbs', 'gutenberg' ),
		category: 'theme',
		edit: ( { className } ) => {
			return (
				<ServerSideRender
					block="gutenberg/breadcrumbs"
					className={ className }
				/>
			);
		},
	}
);
