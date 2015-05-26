# node-scm-source

Creates a `scm-source` JSON object according to [Zalando STUPS documentation](http://stups.readthedocs.org/en/latest/user-guide/application-development.html#docker).

## Usage

Synchronous use (only with Node 0.12 or better):

    var scm = require('node-scm-source');
    scm();
    > { revision: '79c5e3549682f918c81bdf36a4e361e0360d0c8e',
      url: 'git@github.com:zalando-stups/node-scm-source.git',
      status: '',
      author: 'npiccolotto' }

Asynchronous use (mandatory with everything below Node 0.12):

    var scm = require('node-scm-source');
    scm(function(json) {
        // do something    
    });

`node-scm-source` will throw an error if you try to use it synchronously on Node <0.12.

## Example integration with gulp

    // using sync api here
    var scm = require('node-scm-source'),
        fs = require('fs'),
        gulp = require('gulp');
    gulp.task('scm', function(done) {
        fs.writeFile('scm-source.json', JSON.stringify(scm(), null, 4), done);
    });
