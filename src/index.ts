import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { requestAPI } from './handler';

import { IStatusBar } from '@jupyterlab/statusbar';

import { Widget } from '@lumino/widgets';

/**
 * Initialization data for the jupyterlab-server-timer extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-server-timer:plugin',
  description: 'A JupyterLab extension that displays the remaining server run time in the top bar.',
  autoStart: true,
  requires: [IStatusBar],  
  activate: (app: JupyterFrontEnd, statusBar: IStatusBar) => {
    console.log('JupyterLab extension jupyterlab-server-timer is activated!');

    requestAPI<any>('get-life-span')
      .then(data => {
        console.log(data);
        
        const divNode = document.createElement('div');
        const spanNode = document.createElement('span');
        spanNode.classList.add("jp-StatusBar-TextItem");
        divNode.appendChild(spanNode)
    
        spanNode.textContent = "xxx";
    
        const statusWidget = new Widget({ node: divNode });
    
        statusBar.registerStatusItem('lab-status', {
          align: 'middle',
          item: statusWidget
        });
        
        var timer = 30;
    
        setInterval(() => {
          timer = timer - 1;
          spanNode.textContent = timer.toString();
          /*if (timer < 20) {
            textNode.addClass(TOPBAR_TIMER_RED);
          }*/
        }, 1000);        
      })
      .catch(reason => {
        console.error(
          `The jupyterlab_server_timer server extension appears to be missing.\n${reason}`
        );
      });
  }
};

export default plugin;
