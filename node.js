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
        
        local.connect(port, 'localhost');
        pump(socket, local, socket);
      });
      server.listen(keyPair);
      return keyPair.publicKey;
    },
    /* reflect a remote port locally */
    client: (port = 1080, key) => {
      var server = net.createServer(function (servsock) {
        const keyPair = crypto.keyPair(crypto.data(Buffer.from(key)));
        const socket = node.connect(keyPair.publicKey);
        pump(servsock, socket, servsock)
      });
      server.listen(port, '127.0.0.1');
    }
  }
}
