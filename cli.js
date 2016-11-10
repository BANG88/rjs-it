#!/usr/bin/env node

'use strict';
var fs = require('fs');
// var getStdin = require('get-stdin');
var meow = require('meow');
var rjsIt = require('./');

var cli = meow([
    'Usage',
    '  $ rjs-it <input file> <output dist>',
    '',
    'Examples',
    '  $ rjs-it app.build.js dist',
]);


rjsIt(cli.input[0], cli.input[1])