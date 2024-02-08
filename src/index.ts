import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the jupyterlab-server-timer extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-server-timer:plugin',
  description: 'A JupyterLab extension that displays the remaining server run time in the top bar.',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyterlab-server-timer is activated!');
  }
};

export default plugin;
