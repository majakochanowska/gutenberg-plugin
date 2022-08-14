import { BlockEdit } from './edit.js';
import { BlockSave } from './save.js';

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

registerBlockType(
	'gutenberg/tabs',
	{
		apiVersion: 2,
		title: __( 'Tabs', 'gutenberg' ),
		category: 'common',
		attributes: {
			tabHeaders: {
				type: 'array',
				default: [ __( 'Tab 1', 'gutenberg' ), __( 'Tab 2', 'gutenberg' ), __( 'Tab 3', 'gutenberg' ) ],
			},
			activeTab: {
				type: 'number',
				default: 0,
			},
			activeTabFront: {
				type: 'number',
				default: 0,
			},
		},
		edit: BlockEdit,
		save: BlockSave,
	},
);
