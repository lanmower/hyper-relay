if(process.argv.length == 4) {
  const key = process.argv[process.argv.length-1];
  const port = process.argv[process.argv.length-2];
  const pubKey = require('./relay.js')().serve(process.argv[process.argv.length-1], process.argv[process.argv.length-2])
  console.log({pubKey:pubKey.toString('hex')});
} else console.log("usage: hyper-tcp-relay-server <port> <key>");
