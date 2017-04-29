#!/usr/bin/env node
const meow = require('meow')
import rjsIt from './index'

var cli = meow([
    'Usage',
    '  $ rjs-it <input file> <output dist>',
    '',
    'Examples',
    '  $ rjs-it app.build.js dist',
])


rjsIt(cli.input[0], cli.input[1])
