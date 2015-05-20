# node-scm-source

Creates a `scm-source` JSON object according to [Zalando STUPS documentation](http://stups.readthedocs.org/en/latest/user-guide/application-development.html#docker). Note that at this time it relies on `child_process.execSync` which is available only since **Node 0.12**. You will get an error with `0.11` or lower.

## Usage

    var scm = require('node-scm-source');
    scm();
    > { revision: '79c5e3549682f918c81bdf36a4e361e0360d0c8e',
      url: 'git@github.com:zalando-stups/node-scm-source.git',
      status: '',
      author: 'npiccolotto' }
