
var fs = require('fs');

var contents = fs.readFileSync('./package.json', 'utf8');
var contents2 = fs.readFileSync('./package2.json', 'utf8');

console.log(contents2);
console.log("######");

console.log(contents);
