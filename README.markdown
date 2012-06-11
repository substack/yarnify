yarnify
=======

Knit together html, css, and javascript into reusable
[browserifiable](https://github.com/substack/node-browserify)
bundles with minimal side effects.

All the classes, IDs, and css selectors in the knitted files are transformed
with a prefix value to ensure that no conflicts with existing class names will
occur when deploying a widget into an unknown environment.

[![build status](https://secure.travis-ci.org/substack/yarnify.png)](http://travis-ci.org/substack/yarnify)

![yarnify](http://substack.net/images/yarnify.png)

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

and write some css for your widget.

The class names you pick here will be completely local to your widget so don't
worry about naming. Further, the rules in the css files themselves are
completely local and are bound explicitly to elements.

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
$ yarnify widget -o widget/yarn.js
```

now just `require('./yarn')` in a widget/index.js:

``` js
var yarn = require('./yarn');

module.exports = function (title) {
    var elem = yarn('beep.html', [ 'beep.css' ]);
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

Install domready and yarnify, then browserify everything up:

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

  yarnify [files or directories] OPTIONS
  
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

var elem = yarn(file, cssFiles=[])
----------------------------------

Return a container div with class `_container` around the html fragment at
`file`. If `file` doesn't exist in the bundle, returns `undefined`.

For each of the css files in `cssFiles`, apply the css  file contents to the
resulting element.

The html fragment is transformed with a prefix value for all classes and IDs, so
to get at the class and ID names from original file, use the wrapped
query selector methods documented below.

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

yarn.prefix, elem._prefix
-------------------------

The prefix prepended to all class and id values.

todo
====

* knit images into the css? and a tool to cut them out again

install
=======

With [npm](http://npmjs.org) do:

```
npm install -g yarnify
```

license
=======

MIT
