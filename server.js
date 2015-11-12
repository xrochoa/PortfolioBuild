
var fs = require('fs');
var moment = require('moment');
var express = require('express');
var bodyParser = require('body-parser');


var sendgrid = require('sendgrid')(name, password;
//SENDGRID EMAIL



var srcApp = express();
var distApp = express();


function postRequest(req, res) {

    var textMessage = '<b>Name: </b>' + req.body.name + '<br>' + '<b>Email: </b>' + req.body.email + '<br>' + '<b>Phone: </b>' + req.body.phone + '<br>' + '<b>Message: </b>' + req.body.message + '<br>' + '<b>Date: </b>' + moment().format('MMMM Do YYYY, h:mm:ss a');


    var email = new sendgrid.Email({
        to: 'xareyesochoa@gmail.com',
        from: 'noreply@xaviro.com',
        subject: 'Portfolio Contact Form',
        html: textMessage
    });

    console.log(email);

    sendgrid.send(email, function(err, json) {
        if (err) {
            return res.sendStatus(550);
            console.log(err);
        } else {
            return res.sendStatus(200);
            console.log('Success!');
            console.log(json);

        }


    });
    /* THIS WOULD SAVE MY MAIL IN A FILE ON THE COMPUTER BUT CHANGED TO SENDGRID
        //current time
        var now = moment().format();
        //changed the format of received data
        var receivedData = '{ "' + now + '" : ' + JSON.stringify(req.body, null, 4) + '\n},';

        //write file with requests
        fs.appendFile('contactform.json', receivedData, function(err) {

            if (err) {
                console.log(err);
            } else {
                console.log("Data has been added!");
            }
        });*/
};


// Serves source code
var server1 = srcApp.listen(4000, function() {

    srcApp.use(express.static(__dirname + '/'));

    srcApp.get('/', function(req, res) {
        res.sendFile(__dirname + '/index.html');
    });

    // POST method route
    srcApp.use(bodyParser.urlencoded({
        extended: true
    }));


    srcApp.post('/', function(req, res) {
        postRequest(req, res);

    });

    //404 not found
    srcApp.get('*', function(req, res) {
        res.sendFile(__dirname + '/404.html');
        console.log('Get request for ' + req.url + ' (src)');
    });

    var host = server1.address().address;
    var port = server1.address().port;
    console.log('Source code listening at http://%s:%s', host, port);
});

// Serves distribution code
var server2 = distApp.listen(8000, function() {

    distApp.use(express.static(__dirname + '/dist'));

    distApp.get('/', function(req, res) {
        res.sendFile(__dirname + '/dist/index.html');
    });

    // POST method route
    distApp.use(bodyParser.urlencoded({
        extended: true
    }));


    distApp.post('/', function(req, res) {
        postRequest(req, res);
    });


    //404 not found
    distApp.get('*', function(req, res) {
        res.sendFile(__dirname + '/dist/404.html');
        console.log('Get request for ' + req.url + ' (dist)');
    });

    var host = server2.address().address;
    var port = server2.address().port;
    console.log('Distribution code listening at http://%s:%s', host, port);
});