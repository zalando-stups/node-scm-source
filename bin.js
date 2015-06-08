#!/usr/bin/env node
var info = require('./index')();
process.stdout.write(JSON.stringify(info, null, 4));
