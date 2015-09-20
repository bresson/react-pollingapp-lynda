var React = require("react");
var Display = require("./parts/Display.js");
var JoinSpeaker = require("./parts/JoinSpeaker.js");
var Attendance = require("./parts/Attendance.js");
var Questions = require("./parts/Questions.js");

var Speaker = React.createClass({
	render: function(){
		return (
				<div>
 					<Display if={this.props.status === "connected"}>
						<Display if={this.props.member.name && this.props.member.type === 'speaker'}>
							<Questions questions={this.props.questions} emit={this.props.emit} /> 
							<Attendance audience={this.props.audience} /> 
						</Display>
						<Display if={!this.props.member.name}>
							<h1> Start Presentation </h1>
							<JoinSpeaker emit={this.props.emit} />						
						</Display>
					</Display>
				</div>

			);
	}
});

module.exports = Speaker;