'use babel';

import TestPackageOrionView from './test-package-orion-view';
import { CompositeDisposable } from 'atom';

export default {

  testPackageOrionView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.testPackageOrionView = new TestPackageOrionView(state.testPackageOrionViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.testPackageOrionView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'test-package-orion:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.testPackageOrionView.destroy();
  },

  serialize() {
    return {
      testPackageOrionViewState: this.testPackageOrionView.serialize()
    };
  },

  toggle() {
    console.log('TestPackageOrion was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
