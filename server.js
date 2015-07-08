// modules =================================================
var express        = require('express');
var app            = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// variable ===========================================

var self= {};
self.todolist = [];
	

var port = process.env.PORT || 8080; // set our port


// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
server.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user

exports = module.exports = app; 

var db = require('./app/models/todoList');

db.initDb();
db.findDb(function(err, comms){
	  if (err) { throw err; }
		self.todolist = comms;
});



io.sockets.on('connection', function (socket, pseudo) {

	socket.on('init', function () {
		socket.emit('init', self.todolist);
	});
	
	socket.on('addTodo', function (data) {
		self.todolist.push(data);
		socket.broadcast.emit('modificationTodoList', self.todolist);
	});
	
    socket.on('nouveau_client', function(pseudo) {
        socket.pseudo = pseudo;
    });
	
	socket.on('delTodo', function(index) {
		self.todolist.splice(index, 1);
        socket.broadcast.emit('modificationTodoList', self.todolist);
    });

});
