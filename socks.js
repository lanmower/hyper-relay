var socks = require('socksv5');

if(process.argv.length == 4) {
  const key = process.argv[process.argv.length-1];
  const port = process.argv[process.argv.length-2];
  var srv = socks.createServer(function(info, accept, deny) {
    accept();
  });
  srv.listen(process.argv[process.argv.length-2], 'localhost', function() {
    console.log('SOCKS server listening on port '+port);
  });
  srv.useAuth(socks.auth.None());
  const pubKey = require('./relay.js')().serve(key, port);
  console.log({pubKey:pubKey.toString('hex')});
  process.on('uncaughtException', (err) => {})
} else console.log("usage: hyper-socks-relay-client <key> <port>");

