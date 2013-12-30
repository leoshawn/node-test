var PORT = 8888;
var http = require('http');
var url = require('url');
var path = require('path');

var server = http.createServer(function (request, response) {
  var pathname = url.parse(request.url).pathname;
  console.log('pathname:' + pathname);
  var realPath = "assets" + pathname;
  console.log('realPath:' + realPath);
  path.exists(realPath, function (exists) {
    if (!exists) {
      response.writeHead(404, {
        'Content-Type': 'text/plain'
      });

      response.write('This request URL ' + pathname + ' was not found on this server');
      response.end();
    } else {
      // !important method used for static file
      fs.readFile(realPath, 'binary', function (err, file) {
        if (err) {
          response.writeHead(500, {
            'Content-Type': 'text/plain'
          });

          response.end(err);
        } else {
          response.writeHead(200, {
            'Content-Type': 'text/html'
          });

          // !important method used for static file
          response.write(file, 'binary');
          response.end(err);
        }
      });
    }
  });
  response.write(pathname);
  response.end();
});

server.listen(PORT);
console.log('Server running at PORT:' + PORT + '.');
