#!/usr/bin/env node

if(process.argv.length == 5) {
  const port = parseInt(process.argv[process.argv.length-3]);
  const addr = parseInt(process.argv[process.argv.length-2]);
  const key = process.argv[process.argv.length-1];
  const pubKey = require('./relay.js')().serve(key, port, false, addr)
} else console.log("usage: hyper-tcp-relay-server <port> <addr> <key>");
