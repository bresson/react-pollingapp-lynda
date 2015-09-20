var React = require("react");
var io = require("socket.io-client");

var Header = React.createClass({
	render: function(){
		return (
	<nav className="navbar navbar-inverse" role="navigation">
		<div className="container">
		<div className="navbar-header">
			<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
				<span className="sr-only">Toggle navigation</span>
				<span className="icon-bar"></span>
				<span className="icon-bar"></span>
				<span className="icon-bar"></span>
			</button>
			<a className="navbar-brand" href="#">{this.props.title}</a>
		</div>
			<div className="collapse navbar-collapse navbar-ex1-collapse">
			<ul className="nav navbar-nav navbar-right">
				<li><a href="#"><span className="badge">{this.props.status}</span></a></li>
				<li><a href="#"><span>{this.props.speaker}</span></a></li>
			</ul>		
		</div>
		</div>
	</nav>			
	);
	}
});

module.exports = Header;