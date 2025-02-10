import type { Editor } from 'grapesjs';

import {
	cmdImport,
	cmdDeviceDesktop,
	cmdDeviceTablet,
	cmdDeviceMobile,
	cmdClear
} from './consts';
import { PluginOptions } from './types/PluginOptions';

export default (editor: Editor, opts: Required<PluginOptions>) => {
	const { Panels } = editor;
	const config = editor.getConfig();
	const swv = 'sw-visibility';
	const expt = 'export-template';
	const osm = 'open-sm';
	const otm = 'open-tm';
	const ola = 'open-layers';
	const obl = 'open-blocks';
	const ful = 'fullscreen';
	const prv = 'preview';
	const iconStyle = 'style="display: block; max-width:22px"';

	config.showDevices = false;

	Panels.getPanels().reset([]);


	const openBl = Panels.getButton('views', obl);
	editor.on('load', () => openBl?.set('active', true));

	// On component change show the Style Manager
	opts.showStylesOnChange && editor.on('component:selected', () => {
	const openSmBtn = Panels.getButton('views', osm);
	const openLayersBtn = Panels.getButton('views', ola);

	// Don't switch when the Layer Manager is on or
	// there is no selected component
	if ((!openLayersBtn || !openLayersBtn.get('active')) && editor.getSelected()) {
		openSmBtn?.set('active', true);
	}
	});
}
