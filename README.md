ember-cli-basicscroll
==============================================================================

standalone parallax scrolling with CSS variables


Features
------------------------------------------------------------------------------

* Wrapper for [basicScroll](https://basicscroll.electerious.com/) library
* Intuitive implementation for adding parallax scrolling to any element


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-cli-basicscroll
```


Usage
------------------------------------------------------------------------------

Easily add parallax scrolling to any element using the ```{{basic-scroll}}``` modifier.

```handlebars
<div class="box" {{basic-scroll from="bottom-bottom" to="top-top" direct=true props=this.props}}></div>
```

Here are the ```props``` for the parallax box above:

```javascript
import Controller from '@ember/controller';

export default class IndexController extends Controller {
  get props () {
    return {
      '--r': {
        from: '0',
          to: '1turn'
      },
      '--tx': {
        from: '-100px',
          to: '500px'
      }
    }
  }
}
```

Lastly, here is the css for the parallax box above.

```css
html, body {
  height: 1500px;
}

.box {
  top: 500px;
  position: relative;

  width: 5em;
  height: 5em;
  background: linear-gradient(135deg, #3cdddd, #ff1ac6);
  transform: translateX(var(--tx)) rotate(var(--r));
  transition: transform .1s linear;
  will-change: transform;
}
```

See the [basicScroll](https://basicscroll.electerious.com/) documentation for more information on 
how to configure the modifier for parallax scrolling.


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [Apache-2.0](LICENSE.md).
