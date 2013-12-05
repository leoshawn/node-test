function route(handle, pathname, response, request) {
    console.log('About to route a request for ' + pathname);
    if (typeof handle[pathname] === 'function') {
        handle[pathname](response, request);
    } else {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type":"text/html"});
        response.write('404 not Found. Redirecting to index');
        response.write('<script>' +
                'setTimeout(function(){' + 
                'location.href = "./"' +
                '}, 1000); ' +
                '</script>');
        response.end();
    }
}

exports.route = route;
