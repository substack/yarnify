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
    browserify entry.js -o bundle.js
    echo Bundle generated. Do ./make.sh view to open it in a browser.
fi
