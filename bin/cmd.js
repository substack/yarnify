#!/usr/bin/env node

var fs = require('fs');
var yarnify = require('../');

var argv = require('optimist').argv;
var cmd = argv._[0];

if (cmd === 'knit') {
    var dirs = argv._.slice(1);
    if (dirs.length === 0)  dirs = [ process.cwd() ];
    
    var opts = { base : argv.base };
    yarnify.knit(dirs, opts, function (err, src) {
        var outfile = argv.o || argv.outfile || '-';
        if (outfile === '-') {
            console.log(src);
        }
        else fs.writeFile(outfile, src);
    });
}
else {
    var s = fs.createReadStream(__dirname + '/usage.txt');
    s.pipe(process.stderr);
    s.on('end', function () { process.exit(1) });
}
