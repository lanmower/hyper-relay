const DHT = require("@hyperswarm/dht");
const crypto = require('hypercore-crypto')
var net = require('net');
var pump = require('pump')
const node = new DHT({});

module.exports = () => {
  return {
    /* share a local port remotely */
    serve: (key = 'glitch', port=3001) => {
      const keyPair = crypto.keyPair(crypto.data(Buffer.from(key)));
      const server = node.createServer();
      
      server.on("connection", function (socket) {
        
        var local = new net.Socket();
        
        local.connect(port, 'localhost', function () {
          pump(socket, local, socket, () => { local.end(); socket.end();});
        });
      });
      server.listen(keyPair);
      return keyPair.publicKey;
    },
    /* reflect a remote port locally */
    client: (port = 1080, publicKey) => {
      var server = net.createServer(function (servsock) {
        
        const socket = node.connect(publicKey);
        
        socket.on('open', () => {
          pump(servsock, socket, servsock, () => { servsock.end(); socket.end();})
        })
      });
      server.listen(port, '127.0.0.1');
    }
  }
}
