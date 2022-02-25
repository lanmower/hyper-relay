const DHT = require("@hyperswarm/dht");
const crypto = require("hypercore-crypto");
var net = require("net");
var pump = require("pump");
const node = new DHT({});

module.exports = () => {
  return {
    /* share a local port remotely */
    serve: (key, port) => {
      const keyPair = crypto.keyPair(crypto.data(Buffer.from(key)));
      const server = node.createServer();
      server.on("connection", function(servsock) {
        console.log('connecting local '+port)
        var socket = net.connect(port, "localhost");
        pump(local, socket, local);
      });
      server.listen(keyPair);
      return keyPair.publicKey;
    },
    /* reflect a remote port locally */
    client: (hexPublicKey, port) => {
      const publicKey = Buffer.from(hexPublicKey, 'hex');
      var server = net.createServer(function(local) {
        const socket = node.connect(publicKey);
        pump(local, socket, local);
      }); 
      server.listen(port, "127.0.0.1");
      return publicKey;
    }
  };
};
