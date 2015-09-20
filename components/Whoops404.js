var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var Whoops404 = React.createClass({
	render: function(){
		return (
			<div>
				<h1>Whoops...</h1>
				<p>We can not find the page you requested.</p>
				<p>Were you looking for one of these ?</p>
				<ul className="list-group">
					<Link to="/" className="list-group-item">Join as audiance</Link>
					<Link to="/speaker" className="list-group-item">Start the presentation</Link>
					<Link to="/board" className="list-group-item">View the board</Link>
				</ul>
			</div>
			);
	}
});

module.exports = Whoops404;