var express = require('express');

var app = express();

//Serve static files = css, js, etc
app.use('/', express.static(__dirname + '/src'));
//Send to index with any route
app.use('/', function(req, res){
  res.sendFile(__dirname + '/src/index.html');
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});