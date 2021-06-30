const tunnel = require('./node.js')()
const client = tunnel.client(1080, Buffer.from(process.argv[process.argv.length-1], 'hex'));
process.on('uncaughtException', (err) => {})
