var PORT = process.argv[2] || 8000;
var http = require('http');
var url = require('url');
var fs = require('fss');
var path = require('path');
var mime = require('./mime').types;
var config = require('./config');
var utils = require('./utils');
var zlib = require('zlib');

// Create A Static File Server
var server = http.createServer( function(request, response) {
  response.setHeader("Server", "Node/V5");    // set server header
  response.setHeader("Accept-Ranges", "bytes");   // set Accept-Ranges header for breakpoint continuous upload
  var pathname = url.parse(request.url).pathname;   // url pathname
  if (pathname.slice(-1) === '/') {
    pathname = pathname + config.welcome.file;
  }
  var realPath = path.join("assets", path.normalize(pathname.replace(/\.\./g, "")));

  var pathHandle = function (realPath) {

  };
});
