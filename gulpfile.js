var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var pkg = require("./package.json");

// Copy vendor files from /node_modules into /vendor
// NOTE: requires `npm install` before running!
gulp.task("copy", function () {
	gulp.src([
		"node_modules/bootstrap/dist/**/*",
		"!**/npm.js",
		"!**/bootstrap-theme.*",
		"!**/*.map",
	]).pipe(gulp.dest("src/vendor/bootstrap"));

	gulp.src([
		"node_modules/jquery/dist/jquery.js",
		"node_modules/jquery/dist/jquery.min.js",
	]).pipe(gulp.dest("src/vendor/jquery"));

	gulp.src([
		"node_modules/popper.js/dist/umd/popper.js",
		"node_modules/popper.js/dist/umd/popper.min.js",
	]).pipe(gulp.dest("src/vendor/popper"));
});

// Default task
gulp.task("default", ["copy"]);

// Configure the browserSync task
gulp.task("browserSync", function () {
	browserSync.init({
		server: {
			baseDir: "",
		},
	});
});

// Dev task with browserSync
gulp.task("dev", ["browserSync"], function () {
	// Reloads the browser whenever HTML or CSS files change
	gulp.watch("src/css/*.css", browserSync.reload);
	gulp.watch("src/*.html", browserSync.reload);
});
