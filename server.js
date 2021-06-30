const express = require("express")();
express.get('/',(req,res)=>{return 'Hello World'})
express.listen(3001);

const pubKey = require('./node.js')().serve(Math.random().toString(), 3001).toString('hex')
console.log(pubKey);
process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err)
})

