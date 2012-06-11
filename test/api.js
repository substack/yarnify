var test = require('tap').test;
var yarnify = require('../');

var mkdirp = require('mkdirp');
mkdirp.sync(__dirname + '/widget/empty');

test('api mode', function (t) {
    t.plan(3);
    
    var dirs = [ 'css', 'html', 'empty' ].map(function (dir) {
        return __dirname + '/widget/' + dir;
    });
    yarnify.knit(dirs, function (err, bundle) {
        t.ok(/^_(\w+)-$/.test(bundle.prefix));
        t.same(
            Object.keys(bundle.files).sort(),
            [ '/a.css', '/b.css', '/rawr.html' ]
        );
        t.ok(
            new RegExp(bundle.prefix.slice(0,-1), 'g')
            .test(bundle.source)
        );
    });
});
