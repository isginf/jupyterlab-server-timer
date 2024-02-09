import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  IToolbarWidgetRegistry,
} from '@jupyterlab/apputils';

import { Widget } from '@lumino/widgets';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

import '../style/index.css';

const SERVER_TIMER = 'jp-Server-Timer';

/*const TOPBAR_TIMER_RED = 'jp-Timer-Red';*/

/**
 * Initialization data for the jupyterlab-server-timer extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-server-timer:plugin',
  description: 'A JupyterLab extension that displays the remaining server run time in the top bar.',
  autoStart: true,
  requires: [ISettingRegistry, IToolbarWidgetRegistry],
  activate: async (
    app: JupyterFrontEnd,
    settingsRegistry: ISettingRegistry,
    toolbarRegistry: IToolbarWidgetRegistry
  ): Promise<void> => {
    console.log('JupyterLab extension jupyterlab-server-timer is activated!');

    var timer = 30;

    await settingsRegistry.load(plugin.id);

    const textNode = document.createElement('div');
    textNode.textContent = timer.toString();

    toolbarRegistry.addFactory('ServerTimer', 'notification', () => {
      const textWidget = new Widget({ node: textNode });
      textWidget.addClass(SERVER_TIMER)
      return textWidget;
    });

    setInterval(() => {
      timer = timer - 1;
      textNode.textContent = timer.toString();
      /*if (timer < 20) {
        textNode.addClass(TOPBAR_TIMER_RED);
      }*/
    }, 1000);
  }
};

export default plugin;
