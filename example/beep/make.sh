#!/bin/bash

BROWSER=xdg-open
if test -z "$(which $BROWSER)"; then
    BROWSER=open
fi

if test "$1" == "view"; then
    $BROWSER ./many/index.html
    $BROWSER ./simple/index.html
else
    ../../bin/cmd.js widget -o widget/yarn.js
    if test \! -d node_modules; then \
        mkdir node_modules; \
        ln -s ${PWD}/../.. node_modules/yarnify; \
    fi
    browserify simple/entry.js -o simple/bundle.js
    browserify many/entry.js -o many/bundle.js
    echo 'Bundles generated. Do `./make.sh view` to view the output.'
fi
