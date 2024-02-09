import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  IToolbarWidgetRegistry,
} from '@jupyterlab/apputils';

import { Widget } from '@lumino/widgets';

import '../style/index.css';

/*const TOPBAR_TIMER_RED = 'jp-Timer-Red';*/

/**
 * Initialization data for the jupyterlab-server-timer extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-server-timer:plugin',
  description: 'A JupyterLab extension that displays the remaining server run time in the top bar.',
  autoStart: true,
  requires: [IToolbarWidgetRegistry],
  activate: async (
    app: JupyterFrontEnd,
    toolbarRegistry: IToolbarWidgetRegistry
  ) => {
    console.log('JupyterLab extension jupyterlab-server-timer is activated!');

    const textNode = document.createElement('div');
    var timer = 30;
    
    textNode.textContent = timer.toString();

    toolbarRegistry.addFactory('TopBar', 'text', () => {
      const textWidget = new Widget({ node: textNode });
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
