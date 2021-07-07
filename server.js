if(process.argv.length == 4) {
  const key = process.argv[process.argv.length-1];
  const port = parseInt(process.argv[process.argv.length-2]);
  const pubKey = require('./relay.js')().serve(key, port)
} else console.log("usage: hyper-tcp-relay-server <port> <key>");
