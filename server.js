if(process.argv.length == 4) {
  const pubKey = require('./relay.js')().serve(Buffer.from(process.argv[process.argv.length-1]), process.argv.length-2).toString('hex')
  console.log(pubKey);
} else console.log('usage ')
