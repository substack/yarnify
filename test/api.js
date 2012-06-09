var test = require('tap').test;
var yarnify = require('yarnify');

test('api mode', function (t) {
    t.plan(3);
    
    var dirs = [ 'css', 'html' ].map(function (dir) {
        return __dirname + '/widget/' + dir;
    });
    yarnify.knit(dirs, function (err, bundle) {
        t.ok(/^_(\w+)-$/.test(bundle.prefix));
        t.same(
            Object.keys(bundle.files).sort(),
            [ '/css/a.css', '/css/b.css', '/html/rawr.html' ]
        );
        var matches = bundle.source.match(
            new RegExp(bundle.prefix.slice(0,-1), 'g')
        );
        t.equal(matches.length, 7);
    });
});
