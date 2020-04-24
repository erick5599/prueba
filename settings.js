/******************************************************************************************

Settings for gulp builds

******************************************************************************************/

var package = require("./package.json");
var config = require("./config.js");

// Source and destination dirs
var paths = {
	static: {
		source: "./src/",
		target: config.target + "/",
		targethtml: config.htmltarget + "/"
	},
	build: {
		source: "./build/source/",
		target: "./build/dest/"
	},
	copy: [
		"fonts/*.*",
		"img/**/*.*",
	]
};

// List of JS files used and to be watched in various bundles
var lists = {
	css: {
		build: [
			"less/themes/*.less"
		],
		master: [
			"less/css.less"
		],
		watch: [
			"less/**/*.less"
		]
	},
	html: {
		build: [
			"html/*.html",
			"html/*.json"
		],
		watch: [
			"html/*.html",
			"html/*.json"
		]
	},
	apps: {
		build: [
			"./js/**/*-main.js"
		],
		partials: [
			"./js/**/partials"
		],
		watch: [
			"./js/**/*.js",
			"./js/**/*.html"
		]
	},
	lint: {
		scripts: [
			"./js/!(lib*)/**/*.js"
		]
	}
};

// Options for browserify
var browserify = {
	insertGlobals: false,
	detectGlobals: false,
	debug: true,
	basedir: paths.build.source,
	paths: [
		__dirname + "/src/js/libs"
	],
	cache: {},  // needed for watchify
	packageCache: {} // needed for watchify
};

// Config for JS Linting
var eslintConfig = require("./eslint.js");

// Options for Babelify
var babelConfig = {
	"presets": [
		"es2015"
	],
		"plugins": [
			"transform-decorators-legacy"
		],
			"ignore": [
				"libs/**/*.js",
				"libs-angular/**/*.js"
			]
};

// Options for JS minifier
var uglify = {
	compress: {
		drop_console: true,
		sequences: true, // join consecutive statements with the comma operator
		properties: true, // optimize property access: a["foo"] ? a.foo
		dead_code: true, // discard unreachable code
		drop_debugger: true, // discard debugger statements
		unsafe: false, // some unsafe optimizations (see below)
		conditionals: true, // optimize if-s and conditional expressions
		comparisons: true, // optimize comparisons
		evaluate: true, // evaluate constant expressions
		booleans: true, // optimize boolean expressions
		loops: true, // optimize loops
		unused: false, // drop unused variables/functions
		hoist_funs: true, // hoist function declarations
		hoist_vars: false, // hoist variable declarations
		if_return: true, // optimize if-s followed by return/continue
		join_vars: true, // join var declarations
		cascade: true, // try to cascade `right` into `left` in sequences
		side_effects: true, // drop side-effect-free statements
		warnings: true
	},
	mangle: {
	},
	beautify: {
		"ascii_only": true
	}
};

// Options for HTML minifier
var minifiy = {
	collapseWhitespace: true,
	collapseInlineTagWhitespace: false,
	removeComments: true,
	caseSensitive: true
};

// Path array building utility function
function buildPathArray(prefix, pathlist) {
	var list = [];
	prefix = prefix || "";

	for (var u = 0; u < pathlist.length; u++)
		list.push(prefix + pathlist[u]);

	return list;
};

module.exports = {
	paths: paths,
	lists: lists,

	githash: "",
	gitbranch: "",

	babel: babelConfig,
	browserify: browserify,
	compress: true,
	uglify: uglify,
	minifiy: minifiy,

	eslint: eslintConfig,

	buildPathArray: buildPathArray
};
