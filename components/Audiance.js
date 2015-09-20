var React = require("react");
var Display = require("./parts/Display.js");
var Join = require("./parts/Join.js");
var Ask = require("./parts/Ask.js");

var Audiance = React.createClass({
	render: function(){
		return (
				<div>
					<h1>Audiance is here</h1>
					<Display if={this.props.status === "connected"}>
						<Display if={this.props.member.name}>
							<Display if={this.props.currentQuestion}>
								<Ask question={this.props.currentQuestion} emit={this.props.emit} />
							</Display>
							<Display if={!this.props.currentQuestion}>
								<h2> Welcome! <span className="text-info">{this.props.member.name}</span></h2>
								<p> <span class="badge">{ this.props.audience.length }</span> audience available</p>
							</Display>
						</Display>
						<Display if={!this.props.member.name}>
							<h1> Join the session </h1>
							<Join emit={this.props.emit} />						
						</Display>
					</Display>
				</div>

			);
	}
});

module.exports = Audiance;