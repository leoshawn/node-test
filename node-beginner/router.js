function route(pathname, handle, response, request/*, postData*/) {
  console.log('About to route a request for ' + pathname);
  if (typeof handle[pathname] === 'function') {
    return handle[pathname](response, request/*, postData*/);
  } else {
    console.log('No request handler found for ' + pathname);
    response.writeHead(404, {"Content-type": "text/plain"});
    response.write( "404 Not Found");
    response.end();
  }
}

exports.route = route;
