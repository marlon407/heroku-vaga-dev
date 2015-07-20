// April 2015, Ciro Ferreira da Cruz

// Getting required packages
var config 		= require('./config'),
	mongoose 	= require('mongoose'),
	bodyParser 	= require('body-parser'),
	express 	= require('express'),
	app 		= express();

app.use(express.static('./public'));
// Connecting to database
mongoose.connect(config.database);

mongoose.connection.once('open', function(){

	// Use body parser to grab information from POST requests
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	// Setting up API routes
	var apiRoutes = require('./api/routes')(express);

	// Registering API routes
	app.use('/api', apiRoutes);
	
	app.get('/', function(req, res){
		res.sendfile('./public/index.html')}
	);

	// Starting server
	app.listen(config.port);
	console.log('API running at http://localhost:' + config.port);
});