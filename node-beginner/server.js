var http = require('http');
var url = require('url');
var PORT = 8888;

// 使用route
function start(route, handle) {
  function onRequest(request, response) {
    //var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log('Request for ' + pathname + ' received at:' + new Date());

    // 为request设置编码
    //request.setEncoding('utf8');

    // 接收到数据时触发
    //request.addListener('data', function(postDataChunk) {
    //  postData += postDataChunk;
    //  console.log('Received POST data chunk "' + postDataChunk + '".');
    //});

    // 接收完一次请求的所有数据时触发
    //request.addListener('end', function() {
      route(pathname, handle, response, request/*, postData*/);
    //});
  }

  http.createServer(onRequest).listen(PORT);
  console.log('Server started on port ' + PORT + ' at:' + new Date());
}
// 使用exports关键字将本文件作为nodejs的自定义模块
exports.start = start;
