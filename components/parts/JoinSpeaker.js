var React = require("react");
var Link = require("react-router").Link;

var JoinSpeaker = React.createClass({
	start: function(e){
		var name = React.findDOMNode(this.refs.name).value;
		var title = React.findDOMNode(this.refs.title).value;
		this.props.emit("start", {name: name, title: title});
	},
	render: function(){
		return (
				<form onSubmit={this.start}>
				  <div className="form-group">
				    <label for="name">Name</label>
				    <input type="text" ref="name" className="form-control" id="name" placeholder="Input Name" />
				  </div>
				  <div className="form-group">
				    <label for="title">Presentation Title</label>
				    <input type="text" ref="title" className="form-control" id="title" placeholder="Enter presentation title" />
				  </div>
				  <button type="submit" className="btn btn-default">Join</button>
				  <Link to="/" className="btn btn-link">Join as Audience</Link>
				</form>
			);
	} 
});

module.exports = JoinSpeaker;