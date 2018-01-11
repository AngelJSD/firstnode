var fs = require('fs');

console.log('after calling readFile');

 fs.readFile('pagina.html', 'utf8', function(err, contents) {
    console.log(contents);
    console.log('###########');

	fs.readFile('package.json', 'utf8', function(err, contents1) {
	    console.log(contents1);
	});
}); 

console.log('###########');

