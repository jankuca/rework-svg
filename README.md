**rework-svg**

svg() rework CSS preprocessor plugin

The plugin inlines SVG files into CSS as **data-URIs** while making it possible to style the contents using CSS as it would be possible with SVG files embedded via `<img>`.

## Usage

```xml
<svg>
  <path id="p1" fill="#000000" d="M…" />
  <path id="p2" fill="#000000" d="M…" />
</svg>
```

```javascript
var svg = require('rework-svg');

var css = rework(css_code);
css.use(svg());
```

```css
/* SVG file inlined */
div {
  background-image: url('./img/icon.svg') svg();
}

/* SVG file inlined
 - all paths filled red
 */
div {
  background-image: url('./img/icon.svg') svg({
    path { fill: #FF0000; }
  });
}

/* SVG file inlined
 - the fist path filled green
 - the second path filled red
 */
div {
  background-image: url('./img/icon.svg') svg({
    path#p1 { fill: #00FF00; }
    path[id="p2"] { fill: #FF0000; }
  });
}
```

### Selectors

```css
tagname { }
tagname#id { }
tagname[attr="value"] { }
tagname#id[attr="value"] { }
```

### Properties

Any property/value pair specified in the *sub-stylesheet* passed to `svg()` modifies/adds an attribute to the selected elements.
