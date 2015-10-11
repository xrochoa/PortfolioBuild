var express1 = require('express');
var express2 = require('express');

var srcApp = express1();
var distApp = express2();


// Serves source code
var server1 = srcApp.listen(4000, function () {

srcApp.use('/', express1.static(__dirname + '/'));
srcApp.use('/*', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

  var host = server1.address().address;
  var port = server1.address().port;
  console.log('Source code listening at http://%s:%s', host, port);
});

// Serves distribution code
var server2 = distApp.listen(8000, function () {

distApp.use('/', express2.static(__dirname + '/dist'));
distApp.use('/*', function(req, res){
  res.sendFile(__dirname + '/dist/index.html');
});

  var host = server2.address().address;
  var port = server2.address().port;
  console.log('Distribution code listening at http://%s:%s', host, port);
});