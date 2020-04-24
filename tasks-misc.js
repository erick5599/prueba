/******************************************************************************************

Git related tasks for misc features like copying files between build directories

******************************************************************************************/

var package = require("./package.json");
var config = require("./config.js");
var gulp = require("gulp");
var gulpsync = require("gulp-sync")(gulp);
var del = require("del");
var settings = require("./settings.js");

// Clean copied source directories
gulp.task("clean-source", function() {
	return del([
		settings.paths.build.source
	]);
});

// Clean build directories
gulp.task("clean-target", function() {
	return del([
		settings.paths.build.target
	]);
});

// Clean static directories
gulp.task("clean-static", function() {
	return del([
		settings.paths.static.target
	]);
});

// Clean all directories
gulp.task("clean", ["clean-source", "clean-target"]);
gulp.task("clean-all", ["clean-source", "clean-target", "clean-static"]);

// Copy from source dir to build directory
gulp.task("copyfrom", gulpsync.sync(["clean", "copyfromsrc"], "sync copyall"));

// Copy from source dir to build directory
gulp.task("copyfromsrc", function() {
	return gulp.src(settings.paths.static.source + "**")
		.pipe(gulp.dest(settings.paths.build.source));
});

// Copy static files to build dest directory
gulp.task("copystatic", function() {
	return gulp.src(settings.buildPathArray(settings.paths.build.source, settings.paths.copy), { base: settings.paths.build.source })
		.pipe(gulp.dest(settings.paths.build.target));
});

// Copy built files to release directory
gulp.task("copyto", ["copystatic"], function() {
	return gulp.src(settings.paths.build.target + "**/*.*", { base: settings.paths.build.target })
		.pipe(gulp.dest(settings.paths.static.target));
});

// Set the build output to be uncompressed and unminified
gulp.task("uncompressed", function() {
	settings.compress = false;
});

// Set the build output to compile for ES6 browsers
gulp.task("es6", function() {
	settings.babel.presets = [ "es2016" ];
});
