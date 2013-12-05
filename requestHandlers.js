//var exec = require('child_process').exec;
var querystring = require('querystring');
var fs = require('fs');
var formidable = require('formidable');

function start(response, request) {
    console.log("Request handler 'start' was called at " + new Date());
    var body = "<html>" +
        "<head>" +
        "<meta charset='UTF-8'" +
        "</head>" +
        "<body>" +
        "<form action='/upload' method='post' enctype='multipart/form-data'>" +
        '<input type="file" name="upload"><br>' +
        "<input type='submit' value='Upload File' />" +
        "</form>" +
        "</body>" +
        "</html>";

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log("Request handler 'upload' was called at " + new Date());

    if (request.url === '/upload' && request.method.toLowerCase() == 'post') {
        var form = new formidable.IncomingForm();
        form.uploadDir = "./";
        form.parse(request, function(error, fields, files) {
            console.log("files.upload.path:" + files.upload.path);
            if (files.upload) {
                fs.renameSync(files.upload.path, './test.png');
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(
                    "<form action='/upload' method='post'" +
                    " enctype='multipart/form-data'>" +
                    '再来一张<input type="file" name="upload"><br>' +
                    "<input type='submit' value='Upload File' />" +
                    "</form>"
                );
                response.write('received image:<br/><img src="/show"/>');
                response.end();
            } else {
                response.write('<script>location.reload();</script>');
            }
        });
    } else {
        // show a file upload form
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(
            "<html>" +
            "<head>" +
            "<meta charset='UTF-8'" +
            "</head>" +
            "<body>请选择一张图片" +
            "<form action='/upload' method='post' enctype='multipart/form-data'>" +
            '<input type="file" name="upload"><br>' +
            "<input type='submit' value='Upload File' />" +
            "</form>" +
            "</body>" +
            "</html>"
            );
    }

}

function show(response, request) {
    console.log("Request handler 'show' was called at " + new Date());
    fs.readFile('test.png', 'binary', function(error, file) {
        if (error) {
            response.writeHead(500, {'Content-Type': 'text/plain'});
            response.write(error + '\n');
            response.end();
        } else {
            response.writeHead(200, {'Content-Type': 'image/png'});
            response.write(file, 'binary');
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
