import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  Dialog,
  ICommandPalette,
  showDialog,
  IToolbarWidgetRegistry,
} from '@jupyterlab/apputils';

import { PathExt } from '@jupyterlab/coreutils';

import { Widget } from '@lumino/widgets';

import { 
  ISettingRegistry 
} from '@jupyterlab/settingregistry';

import '../style/index.css';

const SERVER_TIMER = 'jp-Server-Timer';

/*const TOPBAR_TIMER_RED = 'jp-Timer-Red';*/

const TOPBAR_TEXT = 'jp-TopBar-Text';

namespace CommandIDs {
  /**
   * Edit TopBar Text
   */
  export const editText = 'topbar-text:edit-text';
}

/**
 * Initialization data for the jupyterlab-server-timer extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-server-timer:plugin',
  description: 'A JupyterLab extension that displays the remaining server run time in the top bar.',
  autoStart: true,
  requires: [ISettingRegistry, ICommandPalette, IToolbarWidgetRegistry],
  activate: async (
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    settingsRegistry: ISettingRegistry,
    toolbarRegistry: IToolbarWidgetRegistry
  ): Promise<void> => {
    console.log('JupyterLab extension jupyterlab-server-timer is activated!');

    var timer = 30;

    /*const settings = await settingsRegistry.load(plugin.id);
    let text = settings.get('text').composite as string;
    let editable = settings.get('editable').composite as boolean;*/

    const textNode = document.createElement('div');
    textNode.textContent = "xxx";

    toolbarRegistry.addFactory('ServerTimer', 'notification', () => {
      const textWidget = new Widget({ node: textNode });
      textWidget.addClass(SERVER_TIMER);
      textWidget.addClass(TOPBAR_TEXT);
      return textWidget;
    });

    setInterval(() => {
      timer = timer - 1;
      textNode.textContent = timer.toString();
      /*if (timer < 20) {
        textNode.addClass(TOPBAR_TIMER_RED);
      }*/
    }, 1000);

    app.contextMenu.addItem({
      command: CommandIDs.editText,
      selector: `.${TOPBAR_TEXT}`,
      rank: 1,
    });

    function showUpdateTextDialog() {
      const oldText = "xxx";
      showDialog({
        title: 'Edit Top Bar Text',
        body: new EditHandler(oldText),
        buttons: [Dialog.cancelButton(), Dialog.okButton({ label: 'Save' })],
      }).then((result) => {
        if (!result.button.accept) {
          return;
        }
        const text = result.value;
        if (text === null) {
          return;
        }
        settingsRegistry.set(plugin.id, 'text', text);
        textNode.textContent = text;
      });
    }

    app.commands.addCommand(CommandIDs.editText, {
      label: 'Edit Text',
      execute: (args: any) => {
        showUpdateTextDialog();
      },
      isEnabled: () => true,
    });

    if (palette) {
      const category = 'Top Bar';
      palette.addItem({ command: CommandIDs.editText, category });
    }

    app.restored.then(() => {
      
    });
  }
};

class EditHandler extends Widget {
  constructor(oldPath: string) {
    super({ node: Private.createEditNode(oldPath) });
    const ext = PathExt.extname(oldPath);
    const value = (this.inputNode.value = PathExt.basename(oldPath));
    this.inputNode.setSelectionRange(0, value.length - ext.length);
  }

  get inputNode(): HTMLInputElement {
    return this.node.getElementsByTagName('input')[0] as HTMLInputElement;
  }

  getValue(): string {
    return this.inputNode.value;
  }
}

namespace Private {
  export function createEditNode(oldText: string): HTMLElement {
    const body = document.createElement('div');
    const existingLabel = document.createElement('label');
    existingLabel.textContent = 'Old Text';
    const existingPath = document.createElement('span');
    existingPath.textContent = oldText;

    const nameTitle = document.createElement('label');
    nameTitle.textContent = 'New Text';
    const name = document.createElement('input');

    body.appendChild(existingLabel);
    body.appendChild(existingPath);
    body.appendChild(nameTitle);
    body.appendChild(name);
    return body;
  }
}

export default plugin;
