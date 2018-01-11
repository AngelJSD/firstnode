var readline = require('readline');
var fs = require('fs');
var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/my_database';

var UserModel = require('./models/usermodel');

mongoose.connect(mongoDB, {
  useMongoClient: true
});

mongoose.Promise = global.Promise;

var db = mongoose.connection;


db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.dropDatabase();
console.log("DB cleaned");
/**/

var rl = readline.createInterface({
	input: fs.createReadStream('data.txt')
});

rl.on('line', function (line) {

	var user_instance = new UserModel({
		name: line,
		age: Math.floor(Math.random() * (100 - 1) + 1)
	});

	user_instance.save(function (err) {
	  if (err) return handleError(err);
	  // No errors
	  console.log(line+" inserted");
	});
});

