# node-scm-source

Creates a `scm-source` JSON object according to [Zalando STUPS documentation](http://stups.readthedocs.org/en/latest/user-guide/application-development.html#docker).

## Usage

Synchronous use (only with Node 0.12 or better):

    var scm = require('node-scm-source');
    scm();
    > { revision: '79c5e3549682f918c81bdf36a4e361e0360d0c8e',
      url: 'git:git@github.com:zalando-stups/node-scm-source.git',
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

## NPM Scripts and CLI

For convenience, it exposes `scm-source` command to that outputs the information to STDOUT which can be used from `package.json` script:


```js
// package.json
{
    ...
    "scripts": {
        "scm": "scm-source > scm-source.json"
    },
    ...
    "devDependencies": {
        "node-scm-source": "latest",
        ...
    }
```

And then you could do `npm run scm` to generate the file. You could also install this package globally to provide access to `scm-source` command from your favorite shell.
