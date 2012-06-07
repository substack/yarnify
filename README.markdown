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

and write some css for your widget, any filename will do.

The class names you pick here will be completely local to your widget so don't
worry about naming.

``` css
.beep {
    margin: auto;
    width: 400px;
}

.title {
    font-weight: bold;
}

.body {
    padding: 20px;
    background-color: rgb(48,51,55);
    color: rgb(220,230,240);
    border-radius: 10px;
}
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
var widget = require('./widget');

domready(function () {
    var w = widget('robots');
    w.body('in SPACE!');
    w.appendTo(document.body);
});
```

Install domready, a local yarnify, and browserify everything up:

```
$ npm install domready yarnify
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

Now you have a reusable bundle that won't clobber any class or ID names in the
webapps where you might want to use the widget!

If you make a nifty reusable widget that other people could benefit from,
consider releasing it on npm!

usage
=====

```
Usage:

  yarnify knit [files or directories] OPTIONS
  
    Bundle css and html files and directories into a single javascript file.
    
    OPTIONS
      -o output file or '-' (default)

```

methods
=======

These are the methods you can call on generated yarn bundles.

```
var yarn = require('./yarn')
```

var elem = yarn(file)
---------------------

Return a container div with class `_container` around the html fragment at
`file`. If `file` doesn't exist in the bundle, returns `undefined`.

The html fragment is transformed with a prefix value for all classes and IDs, so
to get at the class and ID names from original file, use the wrapped
`elem.querySelector()`, `elem.querySelectorAll()`, `elem.getElementById()`,
or `elem.getElementsByClassName()` methods documented below.

You can pass the `elem` to jquery or whichever other DOM manipulation
toolkit you please, just be aware that the css selector wrapping in those
libraries won't work as you might expect.

elem.querySelector(selector)
----------------------------

Like the standard
[Element.querySelector](https://developer.mozilla.org/en/DOM/Element.querySelector)
except that classes and IDs will have the document prefix inserted
automatically into the selector.

The returned element will be wrapped with prefix-aware selectors.

elem.querySelectorAll(selector)
-------------------------------

Like the standard
[Element.querySelectorAll](https://developer.mozilla.org/en/DOM/Element.querySelectorAll)
except that classes and IDs will have the document prefix inserted
automatically into the selector.

The returned elements will be wrapped with prefix-aware selectors.

elem.getElementById(id)
-----------------------

Look up an element by its `id` from the original html before prefixing.

This function would normally be available at the `document`
but this is a handy place to look up an id with the prefix value prepended.

The returned element will be wrapped with prefix-aware selectors.

elem.getElementsByClassName(name)
---------------------------------

Look up elements by their `class` from the original html before prefixing.

The returned elements will be wrapped with prefix-aware selectors.

elem.addClass(name)
-------------------

Add an unprefixed class name string `name`.

`name` will be prefixed and added to the `elem.className` if the element doesn't
already have the class.

elem.removeClass(name)
----------------------

Remove an unprefixed class name string `name`.

`name` will be prefixed and removed from the `elem.className` if the element has
the class.

elem.hasClass(name)
-------------------

Return whether the element has the unprefixed class name string `name` in its
`elem.className`.

`name` will be prefixed before checking for class membership.

attributes
==========

elem.pre
--------

The prefix prepended to all class and id values.

todo
====

* knit standalone static assets like images into a target directory:

```
cp -r $src/static $dst
```

install
=======

With [npm](http://npmjs.org) do:

```
npm install -g yarnify
```

license
=======

MIT
