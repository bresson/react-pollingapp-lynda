var express = require("express"),
	app = express(),
	_ = require("underscore"),
	questions = require('./app-questions'),
	port = process.env.port || 3000;

var connections = [];
var audience = [];
var speaker = {};
var currentQuestion = false;
var results = {
	a: 0,
	b: 0,
	c: 0,
	d: 0
};

var title = "Untitled Presentation";

app.use(express.static('build'));

var server = app.listen(port, function(){
	console.log("server running http://localhost:"+port);
});

var io = require("socket.io").listen(server);

io.sockets.on("connection", function(socket){
	socket.once("disconnect", function(){
		var member = _.findWhere(audience, {id: this.id});

		if(member){
			audience.splice(audience.indexOf(member), 1);
			io.sockets.emit('audience', audience);
			console.log("Left: %s (%s audience remaining)", member.name, audience.length);			
		} else if(this.id === speaker.id){
			console.log("%s has left. %s is over", speaker.name, title);
			title = "Untitled Presentation";
			speaker = {};
			io.sockets.emit("end", {title: title, speaker: ''})
		}

		connections.splice(connections.indexOf(socket), 1);
		socket.disconnect();
		console.log("Disconnected: %s socket remaining", connections.length);
	});

	socket.on("join", function(payload){
		var newMember = {
			id: this.id,
			name: payload.name,
			type: 'member'
		};
		this.emit("joined", newMember);
		audience.push(newMember);
		io.sockets.emit('audience', audience);
	});

	socket.on("start", function(payload){
		speaker.name = payload.name;
		speaker.id = this.id;
		speaker.type = 'speaker';
		title = payload.title;
		this.emit("joined", speaker);
		io.sockets.emit("start", {title: title, speaker: speaker.name});
		console.log("Presentation started: '%s' by '%s'", title, speaker.name);
	});

	socket.on("ask", function(question){
		currentQuestion = question;
		results = {a: 0, b:0, c:0, d:0};
		io.sockets.emit("ask", currentQuestion);
		console.log("Question asked: '%s'", question.q);
	});

	socket.on("answer", function(payload){
		results[payload.choice]++;
		console.log("Answer: '%s' - %j", payload.choice, results);
		io.sockets.emit("results", results);
	});

	socket.emit("welcome", {
		title: title,
		audience: audience,
		speaker: speaker.name,
		questions: questions,
		currentQuestion: currentQuestion,
		results: results
	});
	
	connections.push(socket);
	console.log("Connected: %s socket connected", connections.length);
});