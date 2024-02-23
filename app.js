var express = require("express");
var peerExpress = require('express');

var app = new express ();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var Log = require('log'),
    log = new Log('debug')

var port = process.env.PORT || 3333;

var options = { debug: true }

app.use(express.static(__dirname + "/public"));

app.get('/',function(req,res){
  res.redirect('index.html');
});

http.listen(port,function(){
    log.info('info %s',port);
});

