
var http = require('http');
var express = require('express');
var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/my_database';

var UserModel = require('./models/usermodel');

var app = express();

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
	})
});

/*app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
*/

var server = http.createServer(app).listen(3000, function() {
	console.log(`El servidor esta levantado en el puerto 3000`);
});