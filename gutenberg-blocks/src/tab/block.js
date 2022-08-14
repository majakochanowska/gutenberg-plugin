import { BlockEdit } from './edit.js';
import { BlockSave } from './save.js';

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

registerBlockType(
	'gutenberg/tab',
	{
		apiVersion: 2,
		title: __( 'Tab', 'gutenberg' ),
		category: 'common',
		parent: [ 'gutenberg/tabs' ],
		edit: BlockEdit,
		save: BlockSave,
	},
);
