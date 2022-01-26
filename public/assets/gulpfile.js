/**
 * DEPENDENCIES
 *
 * Installation: $ npm install [package] --save-dev
 */
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var fileinclude = require('gulp-file-include');
var jsValidate = require('gulp-jsvalidate');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var sass = require('gulp-sass')(require('node-sass'));
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var paths = {
	vendor    : 'vendor/',
	css       : 'css/',
	js        : 'js/',
	fonts     : 'fonts/',
	templates : 'dev/templates/',
	layouts   : '../layouts/'
};

var autoprefixerOptions = {
	browsers: [
		'last 2 version',
		'> 1%',
		'ie >= 9',
		'ie_mob >= 10',
		'ff >= 30',
		'chrome >= 34',
		'safari >= 7',
		'opera >= 23',
		'ios >= 7',
		'android >= 4',
		'bb >= 10'
	]
};

// Interpret both Windows and Unix path slashes
// https://nodejs.org/api/path.html
const path = require('path');

/**
 * WATCH THESE FILES
 */
gulp.task('watch', function(){
	gulp.watch(path.join('dev/' + paths.css, '**/*.scss'), gulp.series('compileCss'));
	gulp.watch(path.join('dev/' + paths.js, 'master.js'), gulp.series('compileJs'));
	gulp.watch(path.join(paths.templates, '**/*.html'), gulp.series('compileMarkup'));
});


/**
 * COMPILE CSS
 */
gulp.task('compileCss', function(){
	return gulp.src(path.join('dev/' + paths.css, 'master.scss'))
		.pipe(sourcemaps.init())
		.pipe(sass({
			//includePaths: ['compileCss'].concat(neat),
			outputStyle: 'compressed',
			sourceComments: 'map',
			errLogToConsole: true
		}).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.css))
		.pipe(notify({
			message:"CSS compiled"
		}));
});


/**
 * COMPILE JS
 */
gulp.task('compileJs', function() {
	return gulp.src([
		path.join(paths.vendor, 'jquery/jquery.js'),
		path.join(paths.vendor, 'velocity/velocity.js'), 
		//path.join(paths.vendor, 'visible/jquery.visible.js'),  
		//path.join(paths.vendor, 'lity/dist/lity.js'),
		path.join(paths.vendor, 'slick/slick/slick.js'),
		
		// ------------------------------------------------------------
		// BOOTSTRAP JS DEPENDENCIES
		// Uncomment the ones you need and re-compile master.js
		// $ gulp compileJs
		// ------------------------------------------------------------
		path.join(paths.vendor, 'popper/popper.min.js'), 
		//path.join(paths.vendor, 'bootstrap/js/dist/index.js'), 
		path.join(paths.vendor, 'bootstrap/js/dist/util.js'), 
		//path.join(paths.vendor, 'bootstrap/js/dist/alert.js'), 
		//path.join(paths.vendor, 'bootstrap/js/dist/button.js'), 
		//path.join(paths.vendor, 'bootstrap/js/dist/carousel.js'), 
		//path.join(paths.vendor, 'bootstrap/js/dist/dropdown.js'),
		//path.join(paths.vendor, 'bootstrap/js/dist/modal.js'), 
		//path.join(paths.vendor, 'bootstrap/js/dist/popover.js'), 
		//path.join(paths.vendor, 'bootstrap/js/dist/scrollspy.js'), 
		//path.join(paths.vendor, 'bootstrap/js/dist/tab.js'), 
		//path.join(paths.vendor, 'bootstrap/js/dist/tooltip.js'), 
		// ------------------------------------------------------------
		path.join(paths.vendor, 'blueimp-gallery/js/blueimp-gallery.js'), 
		//path.join(paths.vendor, 'blueimp-gallery/js/blueimp-gallery-video.js'), 
		//path.join(paths.vendor, 'blueimp-gallery/js/blueimp-gallery-vimeo.js'), 
		//path.join(paths.vendor, 'blueimp-gallery/js/blueimp-gallery-youtube.js'), 
		path.join(paths.vendor, 'blueimp-gallery/js/jquery.blueimp-gallery.js'), 
		path.join(paths.vendor, 'modal-video/js/modal-video.js'), 
		path.join('dev/' + paths.js, 'master.js')
	])
	.pipe(concat('master.min.js'))
	.pipe(uglify())
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(paths.js))
	.pipe(notify({
		message:"Javascript compiled"
	}));
});


/**
 * COMPILE MARKUP
 */
gulp.task('compileMarkup', function(){
	return gulp.src(path.join(paths.templates, '*.tpl.html'))
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(rename({
			extname:""
		}))
		.pipe(rename({
			extname:".html"
		}))
		.pipe(gulp.dest(paths.layouts))
		.pipe(notify({
			message:"Markup compiled"
		}));
});
