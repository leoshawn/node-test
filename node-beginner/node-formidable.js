var formidable = require('formidable'),
    http       = require('http'),
    sys        = require('sys');

http.createServer(function(req, res) {
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        // parse a file upload
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files ) {
            res.writeHead(200, {'Content-type': 'text/plain'});
            res.write('received upload:\n\n');
            res.end(sys.inspect({fields: fields, files: files}));
        });
        return;
    }

    // show a file upload form
    res.writeHead(200, {'Contnet-Type':'text/html'});
    res.write(
        '<script>console.log("Fix webkit display");</script>' +
        '<form action="/upload" method="post"' +
        ' enctype="multipart/form-data">' +
        '<input type="text" name="title">' +
        '<input type="file" name="upload" multiple="multiple">' +
        '<input type="submit" value="Upload">' +
        '</form>'
    );
    res.end();
}).listen(8889);
