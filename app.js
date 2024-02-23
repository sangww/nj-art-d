var express = require("express");
var peerExpress = require('express');

var app = new express ();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var Log = require('log'),
    log = new Log('debug')

var port = process.env.PORT || 3333;

var ExpressPeerServer = require('peer').ExpressPeerServer;
var peerApp = new peerExpress();
var peerServer = require('http').createServer(peerApp);
var options = { debug: true }
var peerPort = 3366;
peerApp.use('/peerjs', ExpressPeerServer(peerServer, options));

app.use(express.static(__dirname + "/public"));

app.get('/',function(req,res){
  res.redirect('index.html');
});

io.on('connection',function(socket){

  socket.on("join", (id) => {
    console.log('new-connection:', id);
    io.sockets.emit('new-connection', id);
  });

  /*
  socket.on('server-id', (id) => {
    serverid = id;
    console.log('server-id:', serverid);
    io.sockets.emit('server-id', serverid);
  })
  */

  socket.on('message', (value) => handleMessage(value));
  
  function sendMessage(message) {
    io.sockets.emit('message', message);
  }
  
  function handleMessage(value) {
    console.log("message:", value);
    sendMessage(value);
  }
});

http.listen(port,function(){
    log.info('info %s',port);
});

peerServer.listen(peerPort);