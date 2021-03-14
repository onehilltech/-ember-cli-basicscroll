import Modifier from 'ember-modifier';
import { isNone } from '@ember/utils';

import * as basicScroll from 'basicscroll'

export default class BasicScrollModifier extends Modifier {
  _bs = null;

  get options () {
    return this.args.named;
  }

  get start () {
    const { start = true } = this.args.named;
    return start;
  }

  didInstall () {
    let options = Object.assign ({}, this.defaultOptions, this.options, this.computedOptions);
    this._bs = basicScroll.create (options);

    if (this.start) {
      this._bs.start ();
    }
  }

  didUpdateArguments () {
    let start = this.start;

    // Trigger an update this instance.
    this._bs.update ();

    if (this._bs.isActive () !== start) {
      // The active state of the instance has changed. Use the start attribute to
      // either start or stop the instance.

      if (start) {
        this._bs.start ();
      }
      else {
        this._bs.stop ();
      }
    }
  }

  willRemove () {
    this._bs.destroy ();
  }

  get defaultOptions () {
    return { direct: false };
  }

  get computedOptions () {
    return { elem: this.element };
  }

  get position () {
    return window.getComputedStyle (this.element).getPropertyValue ('position');
  }
}
