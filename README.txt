This package relays tcp listeners over hyperswarm, using the createServer/connect noise encrypted channel.

The cli tools are symetric topics, but one can
easily spawn a client programatically that uses
a public key instead of a topic, to make your
relayed process publicly available.

# Installation
npm install --save hyper-tcp-relay -g

## TCP Relay

### remotely
### relay from a hyper-relay client to a local server
hyper-tcp-relay-server <topicname> <portnumber>

### locally
### relay from a local server to a hyper-relay server
hyper-tcp-relay-client <topicname> <portnumber>

## STDIO Relay

### remotely
hyper-relay-server <topicname>

### locally
hyper-relay-client <topicname>

# PROGRAMMATIC USE

You can check out the use of the relay in the socks example socks.js as a programmatic forwarder for a local server, this same process can do reverse http servers, sip phone calls, or anything else.
