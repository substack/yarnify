#!/usr/bin/env node

var fs = require('fs');
var yarnify = require('../');

var argv = require('optimist').argv;
var cmd = argv._[0];

var dirs = argv._;
if (dirs.length === 0) {
    var s = fs.createReadStream(__dirname + '/usage.txt');
    s.pipe(process.stderr);
    s.on('end', function () { process.exit(1) });
    return;
}

var opts = { base : argv.base };
yarnify.knit(dirs, opts, function (err, y) {
    var outfile = argv.o || argv.outfile || '-';
    if (outfile === '-') {
        console.log(y.source);
    }
    else fs.writeFile(outfile, y.source);
});
