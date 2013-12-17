var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

// 通过javascript对象来处理不同URL路径请求
var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

server.start(router.route, handle);
