"use strict";
/******************************************************************************************

Sanity checking of config file

******************************************************************************************/

var path = require("path");
var fs = require("fs");
var util = require("util");

function printError() {
	console.log(`\x1b[1m\x1b[31mERROR:\x1b[32m ${arguments[0]}\x1b[0m`);

	for (let u = 1; u < arguments.length; u++)
		console.log(`\x1b[1m\x1b[33m*\x1b[36m ${arguments[u]}\x1b[0m`);
}

// Check config file exists
try {
	fs.accessSync("./config.js");
}
catch (error) {
	printError("config.js not found!", "Copy config.js.example to config.js and edit the defaults");
	process.exit(1);
}

// Check config file is semantically valid
try {
	var config = require("./config.js");
}
catch (error) {
	printError("config.js is malformed!", "Check config.js for invalid JavaScript, missing commas or other syntax errors", error);
	process.exit(1);
}
