const pubKey = require('./node.js')().serve(Buffer.from(process.argv[process.argv.length-1]), 3001).toString('hex')
console.log(pubKey);
process.on('uncaughtException', (err) => {})

