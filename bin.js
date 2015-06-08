#!/usr/bin/env node
require('./index')(function (info) {
    process.stdout.write(JSON.stringify(info, null, 4));
});
