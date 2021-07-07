const crypto = require('hypercore-crypto')
if(process.argv.length == 4) {
  const key = process.argv[process.argv.length-1];
  const port = parseInt(process.argv[process.argv.length-2]);
  const tunnel = require('./relay.js')()
  const keyPair = crypto.keyPair(crypto.data(Buffer.from(key)));
  const pubKey = keyPair.publicKey;
  tunnel.client(pubKey,port);
} else console.log("usage: hyper-relay-client <port> <key>");

