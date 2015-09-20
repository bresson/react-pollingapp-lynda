require("../sass/app.scss");
var React = require("react");
const ReactRouter = require('react-router');
const Route = ReactRouter.Route;
const DefaultRoute = ReactRouter.DefaultRoute;
const NotFoundRoute = ReactRouter.NotFoundRoute;

var APP = require("../../components/APP.js");
var Audiance = require("../../components/Audiance.js");
var Speaker = require("../../components/Speaker.js");
var Board = require("../../components/Board.js");
var Whoops404 = require("../../components/Whoops404.js");

var routes = (
		<Route handler={APP}>
			<DefaultRoute handler={Audiance} />
			<Route name="speaker" path="speaker" handler={Speaker} />
			<Route name="audiance" path="audiance" handler={Audiance} />
			<Route name="board" path="board" handler={Board} />
			<NotFoundRoute handler={Whoops404} />
		</Route>
	);

ReactRouter.run(routes, function(Handler) {
	React.render(<Handler />, document.getElementById('mainApp'));
});
