var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
	console.log('Request was made: ' + req.url);
	
	if(req.url === '/home' || req.url === '/'){
		res.writeHead(200, {'content-type': 'text/html'});
		fs.createReadStream(__dirname + '/index.html').pipe(res);
	} else if(req.url === '/contact-us' ){
		res.writeHead(200, {'content-type': 'text/html'});
		fs.createReadStream(__dirname + '/contact.html').pipe(res);
	} else if(req.url === '/api/emp' ){
		var emp = [{name: 'om', age: 29}, {name: 'Bhaghyashree', age:26}];
		res.writeHead(200, {'content-type': 'application/json'});
		res.end(JSON.stringify(emp));
	} else {
		res.writeHead(404, {'content-type': 'text/html'});
		fs.createReadStream(__dirname + '/404.html').pipe(res);
	}
});

server.listen(3000, '127.0.0.1');
console.log('yo dawgs, now listening to port 3000');