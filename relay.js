const DHT = require("@hyperswarm/dht");
const crypto = require('hypercore-crypto')
var net = require('net');
var pump = require('pump')
const node = new DHT({});
module.exports = () => {
  return {
    /* share a local port remotely */
    serve: (key, port, std) => {
      const keyPair = crypto.keyPair(crypto.data(Buffer.from(key)));
      const server = node.createServer();
      server.on("connection", function (socket) {
        var local = net.connect(port, 'localhost');
        if(std)pump(process.stdin, socket, process.stdout);
        else pump(socket, local, socket);
      });
      server.listen(keyPair);
      return keyPair.publicKey;
    },
    /* reflect a remote port locally */
    client: (key, port, std) => {
      var server = net.createServer(function (servsock) {
        const keyPair = crypto.keyPair(crypto.data(Buffer.from(key)));
        const socket = node.connect(keyPair.publicKey);
        if(std) pump(process.stdin, socket, process.stdout);
        else {
          socket.on('open', () => {
            pump(servsock, socket, servsock);
          });
        }
      });
      server.listen(port, '127.0.0.1');
    }
  }
}
