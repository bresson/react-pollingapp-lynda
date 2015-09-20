var React = require("react");
var Display = require("./Display");

var Ask = React.createClass({
	getInitialState: function(){
		return{
			choices: [],
			answer: undefined
		};
	},
	componentWillMount: function () {
	    this.setUpChoices();  
	},
	componentWillReceiveProps: function (nextProps) {
	    this.setUpChoices();  
	},
	setUpChoices: function(){
		var choices = Object.keys(this.props.question);
		choices.shift();
		this.setState({ 
			choices: choices,
			answer: sessionStorage.answer
		});
	},
	addChoiceButton: function(choice, i){
		//var btnTypes = ['info', "success", "warning", "danger"]
		return(
				<div className="col-sm-6" key={i}>
					<div className="card card-info" onClick={this.selectChoice.bind(null, choice)}>
						{choice}: {this.props.question[choice]}
					</div>
				</div>
			); 
	},
	selectChoice: function(choice){
		this.setState({ answer: choice });
		sessionStorage.answer = choice;
		this.props.emit('answer', {
			question: this.props.question,
			choice: choice
		});
	},
	render: function(){
		return (
				<div id="currentQuestion">
					<Display if={this.state.answer}>
						<h3> You Answered: {this.state.answer} </h3>
						<p>{this.props.question[this.state.answer]}</p>
					</Display>
					<Display if={!this.state.answer}> 
						<h2>{this.props.question.q}</h2>	
						<div class="row">
							{this.state.choices.map(this.addChoiceButton)}
						</div>
					</Display>
				</div>
			);
	} 
});

module.exports = Ask;