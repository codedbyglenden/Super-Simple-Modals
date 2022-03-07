'use strict';

var gulp        = require( 'gulp' ),
	sass        = require( 'gulp-sass' ),
	uglifycss   = require( 'gulp-uglifycss' ),
	rename      = require( 'gulp-rename' ),
	cleanCSS    = require( 'gulp-clean-css' ),
	autoprefixer = require('gulp-autoprefixer');

sass.compiler = require('node-sass');


/**
* Compiles scss to css & minifies it.
*/
function watchScss() {
	return gulp.src(
		'./src/scss/**/*.scss'
	)
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe( cleanCSS(
			{
				level: {
					1 : {
						specialComments: 0,
					},
					2 : {
						mergeAdjacentRules: true, // controls adjacent rules merging; defaults to true
						mergeIntoShorthands: true, // controls merging properties into shorthands; defaults to true
						mergeMedia: true, // controls `@media` merging; defaults to true
						mergeNonAdjacentRules: true, // controls non-adjacent rule merging; defaults to true
						mergeSemantically: false, // controls semantic merging; defaults to false
						overrideProperties: true, // controls property overriding based on understandability; defaults to true
						removeEmpty: true, // controls removing empty rules and nested blocks; defaults to `true`
						reduceNonAdjacentRules: true, // controls non-adjacent rule reducing; defaults to true
						removeDuplicateFontRules: true, // controls duplicate `@font-face` removing; defaults to true
						removeDuplicateMediaBlocks: true, // controls duplicate `@media` removing; defaults to true
						removeDuplicateRules: true, // controls duplicate rules removing; defaults to true
						removeUnusedAtRules: false, // controls unused at rule removing; defaults to false (available since 4.1.0)
						restructureRules: false, // controls rule restructuring; defaults to false
						skipProperties: [] // controls which properties won't be optimized, defaults to `[]` which means all will be optimized (since 4.1.0)
					}
				}
			}
		) )
		.pipe(uglifycss({
			'maxLineLen' : 80,
			'uglyComments' : false
		}))
		.pipe(gulp.dest('./dist/css'));
}

/**
* The default funtion, run when a user types `gulp`.
* This sets up watch tasks for all of the above functions.
*/
function defaultTask(cb) {

	gulp.watch('./src/scss/**/*.scss', gulp.series( watchScss ) );
	cb();
}
exports.default = defaultTask;

function scss(cb) {
	watchScss();
	cb();
}
exports.scss = scss;
