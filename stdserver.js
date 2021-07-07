const pubKey = require('./relay.js')().serve(Buffer.from(process.argv[process.argv.length-1]), 1080, true).toString('hex')
console.log(pubKey);
