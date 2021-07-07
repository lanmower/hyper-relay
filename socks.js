var socks = require('socksv5');

var srv = socks.createServer(function(info, accept, deny) {
  accept();
});
srv.listen(1080, 'localhost', function() {
  console.log('SOCKS server listening on port 1080');
});
 
srv.useAuth(socks.auth.None());
const pubKey = require('./relay.js')().serve(Buffer.from(process.argv[process.argv.length-1]), 1080).toString('hex')
console.log(pubKey);
process.on('uncaughtException', (err) => {})
