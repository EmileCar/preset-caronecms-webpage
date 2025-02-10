import type { Editor, Plugin } from 'grapesjs';
import blocks from './blocks';
import commands from './commands';
import panels from './panels';
import { PluginOptions } from './types/PluginOptions';
import { UIStyleOptions } from './types/UIStyleOptions';

const plugin: Plugin<PluginOptions> = (editor, opts: Partial<PluginOptions> = {}) => {
	const config: Required<PluginOptions> = {
		blocks: ['link-block', 'quote', 'text-basic'],
		modalImportTitle: 'Import',
		modalImportButton: 'Import',
		modalImportLabel: '',
		modalImportContent: '',
		importViewerOptions: {},
		textCleanCanvas: 'Are you sure you want to clear the canvas?',
		showStylesOnChange: true,
		...opts,
	};

	// Load blocks
	blocks(editor, config);

	// Load commands
	commands(editor, config);

	// Load panels
	panels(editor, config);
}

const setupStyle = (config: Required<UIStyleOptions>) => {
	const prefix = 'gjs-';
	let cssString = '';

	[
		['one', config.primaryColor],
		['two', config.secondaryColor],
		['three', config.tertiaryColor],
		['four', config.quaternaryColor],
	].forEach(([cnum, ccol]) => {
		cssString += `
			.${prefix}${cnum}-bg {
				background-color: ${ccol};
			}
			.${prefix}${cnum}-color {
				color: ${ccol};
			}
			.${prefix}${cnum}-color-h:hover {
				color: ${ccol};
			}
		`;
	});

	cssString += `
		.gjs-pn-btn.gjs-pn-active {
			background-color: ${config.activeColor};
		}
	`;

	const style = document.createElement('style');
	style.innerText = cssString;
	document.head.appendChild(style);
}

export default plugin;
