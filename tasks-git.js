/******************************************************************************************

Git related tasks for gulp build

******************************************************************************************/

var package = require("./package.json");
var config = require("./config.js");
var gulp = require("gulp");
var del = require("del");
var settings = require("./settings.js");

// Get the latest commit hash
gulp.task("gitinfo", [], function(done) {
	settings.githash = "ac2315";
	settings.gitbranch = "your-branch";
	done();
});
