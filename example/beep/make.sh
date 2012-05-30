#!/bin/bash

if test -z "$BROWSER"; then
    BROWSER=firefox
fi

if test "$1" == "view"; then
    $BROWSER ./index.html
else
    ../../bin/cmd.js knit widget -o widget/yarn.js
    if test \! -d node_modules; then \
        mkdir node_modules; \
        ln -s ${PWD}/../.. node_modules/yarnify; \
    fi
    browserify simple/entry.js -o simple/bundle.js
    browserify many/entry.js -o many/bundle.js
    echo 'Bundles generated. Do `./make.sh view` to view the output.'
fi
