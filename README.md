Relay tcp listeners over hyperswarm

# Installation
npm install --save hyper-tcp-relay

# remotely
hyper-tcp-relay-server <topicname>

# locally
hyper-tcp-relay-client <topicname> <portnumber>

# PROGRAMMATIC USE

# server
```javascript

const express = require("express")();
express.get('/',(req,res)=>{return 'Hello World'})
express.listen(3001);
const pubKey = require('hyper-tcp-relay')().serve('topic', 3001).toString('hex')
console.log(pubKey);
  
```

# client (server pubkey as first command line argument)

```javascript
  
const tunnel = require('./node.js')()
const client = tunnel.client(1080, Buffer.from(process.argv[process.argv.length-1], 'hex'));
````
  
The tunnel is noise encrypted.
