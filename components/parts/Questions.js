var React = require("react");

var Questions = React.createClass({
	ask: function(question){
		this.props.emit('ask', question);
	},
	addQuestionRow: function(question, i){
		return(
				<div className="col-sm-6 col-md-4" key={i}>
					<div onClick={this.ask.bind(null, question)}>{question.q}</div>
				</div>
			); 
	},
	render: function(){
		return (
				<div className="row" id="questions">
					<div className="col-sm-12">
						<h2> Questions</h2>
					</div>
					{ this.props.questions.map(this.addQuestionRow)}	
				</div>
			);
	} 
});

module.exports = Questions;