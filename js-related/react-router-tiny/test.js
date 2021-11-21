const { pathToRegexp } = require('path-to-regexp');

const path = '/outer';

const regex = pathToRegexp(path, [], {
	end: false
});

console.log(regex);
let match = regex.test('/outer/inner');

console.log(match);
