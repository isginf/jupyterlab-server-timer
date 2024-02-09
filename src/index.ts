import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';

import { IStatusBar } from '@jupyterlab/statusbar';

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
  requires: [IStatusBar],  
  activate: async (
    app: JupyterFrontEnd,
    statusBar: IStatusBar
  ): Promise<void> => {

    const divNode = document.createElement('div');
    const spanNode = document.createElement('span');
    divNode.appendChild(spanNode)

    spanNode.textContent = "xxx";

    const statusWidget = new Widget({ node: divNode });

    statusBar.registerStatusItem('lab-status', {
      align: 'middle',
      item: statusWidget
    });
    
    console.log('JupyterLab extension jupyterlab-server-timer is activated!');

    var timer = 30;
    
    setInterval(() => {
      timer = timer - 1;
      spanNode.textContent = timer.toString();
      /*if (timer < 20) {
        textNode.addClass(TOPBAR_TIMER_RED);
      }*/
    }, 1000);
  }
};

export default plugin;
