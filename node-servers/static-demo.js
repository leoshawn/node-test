var static = require('node-static');
var files = new static.Server('./public');

var http = require('http');
var server = http.createServer(function (req, res) {
  req.addListener('end', function (){
    files.serve(req, res);
  });
}).listen(7878);
