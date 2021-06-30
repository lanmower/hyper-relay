This package relays tcp listeners over hyperswarm, using the createServer/connect noise encrypted channel.

# Installation
npm install --save hyper-tcp-relay

# remotely
hyper-tcp-relay-server <topicname>

# locally
hyper-tcp-relay-client <topicname> <portnumber>

# PROGRAMMATIC USE

# server
```javascript
//serve something over tcp
const express = require("express")();
express.get('/',(req,res)=>{res.send('Hello World')})
express.listen(3001);
//relay that something over hyperswarm
const pubKey = require('hyper-tcp-relay')().serve('topic', 3001).toString('hex')
console.log(pubKey);
```

# client (server pubkey as first command line argument)

```javascript
const tunnel = require('hyper-tcp-relay')()
//connect to remote hyperswarm via local port 1080
const client = tunnel.client(1080, Buffer.from(process.argv[process.argv.length-1], 'hex'));
````
