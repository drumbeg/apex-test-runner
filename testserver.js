"use strict";

var express = require('express');
var app = express();
var http = require('http').Server(app);
var spawn = require('child_process').spawn;
var io = require('socket.io')(http);
var runningProcess = false;
var fileSystem = require('fs');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));

app.get('/', function (req, res) {
   res.sendFile(__dirname + '/public/index.html');
});

app.get('/features', function (req, res) {
   fileSystem.readdir('features', function (err, files) {
      res.end(JSON.stringify(files));
   });
});

io.on('connection', function (socket) {
   socket.on('run tests', function(data) {
      if (runningProcess) {
         // io.emit('alert', 'Test run already underway. Waiting...');
         return;
      }

      var command = spawn(
         'casperjs',
         [
            'test',
            'bootstrap.js',
            '--user="' + data.user + '"',
            '--password="' + data.password + '"',
            '--baseUrl="' + data.baseUrl + '"',
            '--feature="' + data.feature + '"'
         ]
      );

      runningProcess = true;

      command.stdout.on('data', function(data) {
         io.emit('line out', data.toString());
      });

      command.on('exit', function(data) {
         runningProcess = false;
         io.emit('finished');
      });
   });
});

http.listen(3001);

console.log('Test server running on port 3001');