/*jslint node: true, devel: true*/

'use strict';

var path = require('path');
var express = require('express');
// var proxyServer = require('http-route-proxy');
var server = express();

var publicFolder = path.join(__dirname, '../');

// console.log(server);

    server.use(express.static(publicFolder));
    server.disable('x-powered-by');
// server.configure(function () {
//     // Just disable that the "server" is powered by express

//     // Serve static files

//     // // Proxy all requests to /rest to igloo
//     // server.use(proxyServer.connect({
//     //     from: 'localhost:8080',
//     //     to: 'playplus.telia.se:80/rest',
//     //     https: false,
//     //     route: ['/rest']
//     // }));
// });

server.listen(8080, function () {
    console.log('Server up and running....');
    console.log('Serving static files from: ' + publicFolder + ' and forwarding calls to /rest');
});