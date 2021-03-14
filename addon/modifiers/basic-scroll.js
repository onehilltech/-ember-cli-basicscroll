import Modifier from 'ember-modifier';
import { isNone } from '@ember/utils';

import * as basicScroll from 'basicscroll'

export default class BasicScrollModifier extends Modifier {
  _bs = null;

  get options () {
    return this.args.named;
  }

  get startBasicScroll () {
    const { startBasicScroll = true } = this.args.named;
    return startBasicScroll;
  }

  didInstall () {
    let options = Object.assign ({}, this.defaultOptions, this.options, this.computedOptions);
    this._bs = basicScroll.create (options);

    if (this.startBasicScroll) {
      this._bs.start ();
    }
  }

  willRemove () {
    this._bs.destroy ();
  }

  get defaultOptions () {
    return { direct: false };
  }

  get computedOptions () {
    return { elem: this.element, from: this.from, to: this.to }
  }

  get from () {
    let from = this.args.named.from || 'auto';

    if (isNone (from)) {
      return null;
    }

    if (from !== 'auto') {
      return from;
    }

    // Use the position style of this element to determine the value.

    switch (this.position) {
      case 'absolute':
        return this.element.parentElement.offsetTop + this.element.offsetTop;

      case 'relative':
        return this.element.clientTop;

      case 'fixed':
        return this.element.offsetTop;

      default:
        return null;
    }
  }

  get to () {
    let to = this.args.named.to || 'auto';

    if (isNone (to)) {
      return null;
    }

    if (to !== 'auto') {
      return to;
    }

    switch (this.position) {
      case 'absolute':
        return this.element.parentElement.offsetTop + this.element.offsetHeight;

      case 'relative':
        return this.element.offsetHeight;

      default:
        return null;
    }
  }

  get distance () {
    return this.to - this.from;
  }

  get position () {
    return window.getComputedStyle (this.element).getPropertyValue ('position');
  }
}
