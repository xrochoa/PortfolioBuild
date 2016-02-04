var express1 = require('express');
var express2 = require('express');

var srcApp = express1();
var distApp = express2();

// Serves source code
var server1 = srcApp.listen(4000, function() {
    srcApp.use(express1.static(__dirname + '/src'));
    srcApp.use(express1.static(__dirname + '/bower_components'));
    console.log('Source code listening at http://%s:%s', server1.address().address, server1.address().port);
});

// Serves distribution code
var server2 = distApp.listen(8000, function() {
    distApp.use(express2.static(__dirname + '/dist'));
    console.log('Distribution code listening at http://%s:%s', server2.address().address, server2.address().port);
});