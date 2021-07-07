const tunnel = require('./relay.js')()
const pubKey= tunnel.client(process.argv[process.argv.length-1], 1080, true);
console.log(pubKey.toString('hex'));