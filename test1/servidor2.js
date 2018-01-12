
var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');

var mongoDB = 'mongodb://127.0.0.1/my_database';

var UserModel = require('./models/usermodel');

var bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

mongoose.connect(mongoDB, {
  useMongoClient: true
});

mongoose.Promise = global.Promise;

var db = mongoose.connection;
var Schema = mongoose.Schema;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var query = UserModel.find();
query.select('name age');


function pre(req, res, next){
	console.log("pre hello world");
	return res.send("No paso");
	next();
}

app.get('/', pre, function (req, res) {
  res.send('Hello World!');
});

app.get('/hola', function (req, res) {
  res.send('Hola');
});

app.get('/users', function (req, res) {
	query.exec(function (err, users) {
  		if (err) return handleError(err);
  		res.send(users);
	});
});

app.get('/addusers', function (req, res) {
	/*fs.readFile("vista1.html", function(err, data){
	  res.writeHead(200, {'Content-Type': 'text/html'});
	  res.write(data);
	  res.end();
	});*/
	res.sendFile(__dirname + '/vista1.html');
	
});

app.post('/registerusers', function (req, res) {

	//res.send();
	console.log(req.body.name);
	res.sendFile(__dirname + '/vista1.html');
});

//dante.cuevas@apselom.com
/*app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
*/

var server = http.createServer(app).listen(3000, function() {
	console.log(`El servidor esta levantado en el puerto 3000`);
});