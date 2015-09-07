//test
var PORT = 3000,
	http = require('http'),
	url  = require('url'),
	fs   = require('fs'),
	path = require('path'),
	mime = require('./mime').types

var server = http.createServer(function(request, response) {
	var pathname = url.parse(request.url).pathname,
    	realPath = __dirname + pathname,
    	ext = path.extname(realPath),
		ext = ext ? ext.slice(1) : 'unknown';
		contentType = mime[ext] || "text/plain";
	console.log(ext);
    fs.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realPath, "binary", function(err, file) {
                if (err) {
                    response.writeHead(500, {'Content-Type': 'text/plain'});
                    response.end(err);
                } else {
                    response.writeHead(200, {'Content-Type': contentType});
                    
	console.log(realPath);
                    response.write(file, "binary");
                    response.end();
                }
             });
          }
      });
});

server.listen(PORT);

console.log("Server runing at port: " + PORT + ".");