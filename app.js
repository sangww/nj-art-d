var express = require("express");

var app = new express ();
var http = require("http").Server(app);

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.get('/',function(req,res){
  res.redirect('index.html');
});

http.listen(port,function(){
});