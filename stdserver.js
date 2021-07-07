if(process.argv.length == 3) {
  const key = process.argv[process.argv.length-1];
  const pubKey = require('./relay.js')().serve(key, 0, true)
  console.log({pubKey:pubKey.toString('hex')});
} else console.log("usage: hyper-relay-server <key>");

