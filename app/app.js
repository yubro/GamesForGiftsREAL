/*
built using node.js, angular, and phaser
*/

// usual requires
const express = require('express');
const app = express();                    // express is just callback functions
const http = require('http').Server(app); // connect express callbacks with this server :)
const io = require('socket.io')(http);    // get sockets capability

const fs = require('fs');
const request = require('request');
const url = require('url');


// download function
var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

download('http://www.pngall.com/wp-content/uploads/2016/03/Penguin-Download-PNG.png', 'mc.png', function(){
  console.log('done downloading image');
});

// test
/*
fs.createReadStream(__dirname + '/mc.png').pipe(fs.createWriteStream(__dirname + '/mc2.png'));
*/

// usual get local dirs
app.use(express.static(__dirname)); // add to remote folder

//////////////////

app.get('/', function(req, res){                // request and response
  res.sendFile(__dirname + '/app.html');
  console.log( req.originalUrl );
});

////////////////////

// not working for some reason...
io.on('connection', function(socket){

  console.log('a user connected' + socket.id);

  // dont yet create a random directory --> check path

  socket.on('disconnect', function(){          // disconnect handling
    console.log('user disconnected');
  });




});


http.listen(3000, function(){              // return a new listening http server
  console.log('listening on *:3000');
});
