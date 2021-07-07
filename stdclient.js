const crypto = require('hypercore-crypto')
if(process.argv.length == 3) {
  const key = process.argv[process.argv.length-1];
  const tunnel = require('./relay.js')()
  const keyPair = crypto.keyPair(crypto.data(Buffer.from(key)));
  const pubKey = keyPair.publicKey;
  tunnel.client(pubKey,0,true);
  console.log({pubKey:pubKey.toString('hex')});
} else console.log("usage: hyper-relay-client <key>");

