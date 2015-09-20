var React = require("react");
const ReactRouter = require('react-router');
const RouteHandler = ReactRouter.RouteHandler;
var io = require("socket.io-client");
var Header = require("./parts/Header.js");

var APP = React.createClass({
	getInitialState: function(){
		return{
			status: 'disconnected',
			title: '',
			member: {},
			speaker: '',
			audience: [],
			questions: [],
			currentQuestion: false,
			results: {}
		};
	},
	componentWillMount: function(){
		this.socket = io('http://localhost:3000');
		this.socket.on("connect", this.connect);
		this.socket.on("disconnect", this.disconnect);
		this.socket.on("welcome", this.updateState);
		this.socket.on("start", this.start);
		this.socket.on("end", this.updateState);
		this.socket.on("joined", this.joined);
		this.socket.on("audience", this.updateAudience);
		this.socket.on("ask", this.ask);
		this.socket.on("results", this.updateResuls);
	},
	connect: function(){
		var member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;

		if(member && member.type === 'member'){
			this.emit("join", member);
		} else if(member && member.type === 'speaker'){
			this.emit("start", {name: member.name, title: sessionStorage.title });
		}
		this.setState({status: 'connected'});
	},
	disconnect: function(){
		this.setState({ 
				status: 'disconnected',
				title: "disconnected",
				speaker: ""
			});
	},
	updateState: function(serverState){
		console.log(serverState);
		this.setState(serverState);
	},
	joined: function(memberData){
		sessionStorage.member = JSON.stringify(memberData);
		this.setState({'member': memberData});
	},
	updateAudience: function(newAudience){
		this.setState({audience: newAudience})
	},
	start: function(presentation){
		if(this.state.member.type === 'speaker'){
			sessionStorage.title = presentation.title;
		}
		this.setState(presentation)
	},
	emit: function(eventName, payload){
		this.socket.emit(eventName, payload);
	},
	ask: function(question){
		sessionStorage.answer = '';
		this.setState({currentQuestion: question});
	},
	updateResuls: function(serverData){
		this.setState({results: serverData});
	},
	render: function(){
		return (
				<div>
					<Header {...this.state} />
					<div className="container">
						<RouteHandler emit={this.emit} {...this.state}/>
					</div>
				</div>
			);
	}
});

module.exports = APP;