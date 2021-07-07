const tunnel = require('./relay.js')()
const pubKey = tunnel.client(process.argv[process.argv.length-1], 12800);
console.log(pubKey.toString('hex'));