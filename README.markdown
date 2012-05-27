yarnify
=======

Knit together html, css, and javascript into reusable
[browserifiable](https://github.com/substack/node-browserify)
bundles with minimal side effects.

All the classes, IDs, and css selectors in the knitted files are transformed
with a prefix value to ensure that no conflicts with existing class names will
occur when deploying a widget into an unknown environment.

example
=======

build a widget
--------------

Widgets are just html, css, and javascript.

Just hack up a widget/beep.html:

``` html
<div class="beep">
  <div class="title"></div>
  <div class="body"></div>
</div>
```

then bundle all the html in `widget/` into `widget/yarn.js`:

```
$ yarnify knit widget -o widget/yarn.js
```

now just `require('./yarn')` in a widget/index.js:

``` js
var yarn = require('./yarn');

module.exports = function (title) {
    var elem = yarn('beep.html');
    elem.querySelector('.title').textContent = title;
    
    return {
        body : function (x) {
            elem.querySelector('.body').textContent = x;
        },
        appendTo : function (e) { e.appendChild(elem) }
    };
};
```

Now you can use this widget as a module with browserify!

Just hack up an entry.js:

``` js
var domready = require('domready');

domready(function () {
    var widget = require('./widget');
    var w = widget('robots');
    w.body('in SPACE!');
    w.appendTo(document.body);
});
```

Then browserify it:

```
$ browserify entry.js -o bundle.js
```

Now you can drop the `bundle.js` into some html:

``` html
<html>
<head>
<script src="bundle.js"></script>
</head>
</html>
```

If you make a nifty reusable widget that other people could benefit from,
consider releasing it on npm!

usage
=====

```
Usage: yarnify [directory] OPTIONS

Generate a yarn output bundle from all the html and css files in [directory].

  OPTIONS
    -o output file or '-' (default)
```

methods
=======

These are the methods you can call on generated yarn bundles.

```
var yarn = require('./yarn')
```

var doc = yarn(file)
--------------------

Return the
[documentElement](https://developer.mozilla.org/en/DOM/document.documentElement)
for the html fragment at `file`.

The html fragment is transformed with a prefix value for all classes and IDs, so
to get at the class and ID names from original file, use the wrapped
`doc.querySelector()`, `doc.querySelectorAll()`, `doc.getElementById()`,
or `doc.getElementsByClassName()` methods documented below.

You can pass the `doc` element to jquery or whichever other DOM manipulation
toolkit you please, just be aware that the css selector wrapping in those
libraries won't work as you might expect.

doc.querySelector(selector)
---------------------------

Like the standard
[Element.querySelector](https://developer.mozilla.org/en/DOM/Element.querySelector)
except that classes and IDs will have the document prefix inserted
automatically into the selector.

doc.querySelectorAll(selector)
------------------------------

Like the standard
[Element.querySelectorAll](https://developer.mozilla.org/en/DOM/Element.querySelectorAll)
except that classes and IDs will have the document prefix inserted
automatically into the selector.

doc.getElementById(id)
----------------------

Look up an element by its `id` from the original html before prefixing.

This function would normally be available at the `document`, not the
`documentElement`, but this is a handy place to look up an id with the prefix
value prepended.

doc.getElementsByClassName(name)
--------------------------------

Look up elements by their `class` from the original html before prefixing.

todo
====

### transform and bind css

Add a prefix to every `class` and `id` in the html based on the `package.json`
`name` field with a fallback to the parent directory name.

### bind css files to html files of the same name

Parse the corresponding css file for each html file
and also re-run the rules on appended elements.

### knit static assets (images) into a target directory

`cp -r $src/static $dst`

install
=======

With [npm](http://npmjs.org) do:

```
npm install -g yarnify
```

license
=======

MIT
