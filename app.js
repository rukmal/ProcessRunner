var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var fs = require('fs');
var child_process = require('child_process');

var app = express();

// all environments
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(methodOverride());

var router = express.Router();

// Mapping POST route to '/' to
// run script
router.route('/')
	.post(function (req, res) {
		if (req.body.key === app.get('config').key) {
			for (var scriptNo in app.get('config').scripts) {
				var script = app.get('config').scripts[scriptNo];
				child_process.exec('sh ' + script, function (error, stdout, stderr) {
					if (error) {
						res.status(500).end();
					}
				});
			}
			res.status(200).end();
		} else {
			res.status(401).end();
		}
	});

// Mapping GET route to '/reload-config'
// to reload the configuration file
router.route('/reload-config')
	.post(function (req, res) {
		if (req.body.key === app.get('config').key) {
			reloadConfig();
		}
		res.status(200).end();
	});

/**
 * Function to reload to configuration file and
 * save it to the application variable 'config'
 */
function reloadConfig() {
	var configData = JSON.parse(fs.readFileSync('config.json'));
	app.set('config', configData);
}

// Loading the configuration once when the
// application starts
reloadConfig();

app.use('/', router);
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express server listening on port ' + port);