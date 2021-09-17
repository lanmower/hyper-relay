const DHT = require("@hyperswarm/dht");
const crypto = require("hypercore-crypto");
var net = require("net");
var pump = require("pump");
const node = new DHT({});

module.exports = () => {
  return {
    /* share a local port remotely */
    serve: (key, port, stdio, addr="localhost") => {
      const keyPair = Buffer.from(key, 'hex');
      const server = node.createServer();
      server.on("connection", function(socket) {
        if (stdio) pump(process.stdin, socket, process.stdout);
        else {
          var local = net.connect(port, addr);
          pump(socket, local, socket);
        }
      });
      server.listen(keyPair);
      return keyPair.publicKey;
    },
    /* reflect a remote port locally */
    client: (hexPublicKey, port, stdio, addr="localhost") => {
      const publicKey = Buffer.from(hexPublicKey, 'hex');
      if (stdio) {
        const socket = node.connect(publicKey);
        pump(process.stdin, socket, process.stdout);
      } else {
        var server = net.createServer(function(servsock) {
          const socket = node.connect(publicKey);
          pump(servsock, socket, servsock);
        }); 
        server.listen(port, addr);
      }
      return publicKey;
    }
  };
};
