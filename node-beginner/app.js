var PORT = 8000;
var mime = require('./mime').types;
var config = require('./config');
var zlib = require('zlib');
var http = require('http');
var server = http.createServer( function (request, response) {
  var pathname = url.parse(request.url).pathname;
  var realPath = "assets" + pathname;

  path.exists(realPath, function (exists) {
    if (!exists) {
      response.writehead(404, {
        'Content-Type': 'text/plain'
      });

      response.write('This request URL ' + pathname + ' was not found on this server. ');
      response.end();
    } else {
      fs.readFile(realPath, "binary", function (err, file) {
        if (err) {
          response.writeHead(500, {
            'Content-Type': 'text/plain'
          });

          response.end(err);
        } else {
          var ext = path.extname(realPath);
          ext = ext ? ext.slice(1) : 'unknown';

          if (ext.match(config.Expires.fileMath)) {
            var contentType = mime[ext] || 'text/plain';
            var expires = new Date();
            expires.setTime(expires.getTime() + config.Expires.maxAge * 1000);
            response.setHeader('Expires', expires.toUTCString());
            // Cache-Control的优先级高于Expires。但有的浏览器不支持Cache-Control
            response.setHeader('Cache-Control', 'max-age=' + config.Expires.maxAge);
            response.writeHead(200, {'Content-Type': contentType});

            fs.stat(realPath, function (err, stat) {
              var lastModified = stat.mtime.toUTCString();
              response.setHeader("Last-Modified", lastModified);
            });

            if (request.headers[ifModifiedSince] && lastModified == request.headers[ifModifiedSince]) {
              response.writeHead(304, 'not Modified');
            } else {

              // gzip support for the static web server
              var raw = fs.createReadStream(realPath);
              var acceptEncoding = request.headers['accept-encoding'] || '';
              var matched = ext.match(config.Compress.match);
              if (matched && acceptEncoding.match(/\bgzip\b/)) {
                response.writeHead(200, 'ok', {
                  'Content-Encoding': 'gzip'
                });
                raw.pipe(zlib.createGzip()).pipe(response);
              } else if (matched && acceptEncoding.match(/\bdeflate\b/)) {
                response.writeHead(200, 'ok', {
                  'Content-Encoding': 'deflate'
                });
                raw.pipe(zlib.createDeflate()).pipe(response);
              } else {
                response.writeHead(200, 'OK');
                raw.pipe(response);
                //response.write(file, 'binary');
                //response.end();
              }
            }
          }
        }
      });
    }
  });
});

server.listen(PORT);
console.log('Server running at port:' + PORT + '.');
