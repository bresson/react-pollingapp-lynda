var React = require("react");
var Link = require("react-router").Link;

var Join = React.createClass({
	join: function(e){
		var name = React.findDOMNode(this.refs.name).value;
		this.props.emit("join", {name: name});
	},
	render: function(){
		return (
				<form onSubmit={this.join}>
				  <div className="form-group">
				    <label for="name">Name</label>
				    <input type="text" ref="name" className="form-control" id="name" placeholder="Input Name" />
				  </div>
				  <button type="submit" className="btn btn-default">Join</button>
				  <Link to="/speaker" className="btn btn-link">Join as speaker</Link>
				  <Link to="/board" className="btn btn-link">Go to board</Link>
				</form>
			);
	} 
});

module.exports = Join;