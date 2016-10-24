var gulp = require('gulp')
	uglify = require('gulp-uglify'),
	merge = require('merge-stream');
	strip = require('gulp-strip-comments'),
	htmlmin = require('gulp-htmlmin'),
	removeHtmlComments = require('gulp-remove-html-comments'),
	sass = require('gulp-sass');
	stripCssComments = require('gulp-strip-css-comments'),
	cleanCSS = require('gulp-clean-css'),
	cssmin = require('gulp-cssmin'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	clean = require('gulp-clean'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload;


var paths = {
	webroot: './dist/',
	node_module: './node_modules/',
	source :'./src/'
};

paths.templatesDest = paths.webroot + 'templates';
paths.jsDest = paths.webroot + 'js';
paths.cssDest = paths.webroot + 'css';
paths.fontDest = paths.webroot + '/fonts';
paths.imagDest = paths.webroot + 'images';
paths.dataDest = paths.webroot + 'data';

/// Vendors

// Angular
paths.angular = paths.node_module + 'angular/angular.js';
paths.angularRoute = paths.node_module + 'angular-route/angular-route.js';
paths.angularCookies = paths.node_module + 'angular-cookies/angular-cookies.js';
paths.angularAnimate = paths.node_module + 'angular-animate/angular-animate.js';

// JQuery
paths.jquery = paths.node_module + 'jquery/dist/jquery.js';

// Bootstrap
paths.bootstrapCSS = paths.node_module + 'bootstrap/dist/css/bootstrap.css';
paths.bootstrapJS = paths.node_module + 'bootstrap/dist/js/bootstrap.js';
paths.bootstrapFonts = paths.node_module + 'bootstrap/dist/fonts/**/*';


/// Project

// JS
paths.sw = paths.source + 'js/sw.js';
paths.app = paths.source + 'js/app.js';
paths.appConfig = paths.source + 'js/app.config.js';
paths.appRoutes = paths.source + 'js/app.routes.js';

// Controllers
paths.angularMainCtrl = paths.source + 'js/controllers/main.js';
paths.angularAllRestaurantsCtrl = paths.source + 'js/controllers/all-restaurants.js';
paths.angularRestaurantCtrl = paths.source + 'js/controllers/restaurant.js';
paths.angularAddReviewCtrl = paths.source + 'js/controllers/add-review.js';
paths.angularFilterCtrl = paths.source + 'js/controllers/filter.js';


// Services
paths.angularConstants = paths.source + 'js/services/constants.js';
paths.angularToastService = paths.source + 'js/services/toast.js';
paths.angularHttpService = paths.source + 'js/services/http-service.js';
paths.angularModalService = paths.source + 'js/services/modal.js';

// Directives
paths.angularModalDirective = paths.source + 'js/directives/modal-directive.js';
paths.angularReviewDetailsDirective = paths.source + 'js/directives/review-details.js';
paths.angularFilterDirective = paths.source + 'js/directives/filter.js';


// HTML
paths.mainHtml = paths.source  +'index.html';
paths.AllRestaurantsHtmlTemplate = paths.source  +'templates/all-restaurants.html';
paths.RestaurantHtmlTemplate = paths.source  +'templates/restaurant.html';
paths.ReviewModalTemplate = paths.source  +'templates/review-modal.html';
paths.ReviewDetailsTemplate = paths.source  +'templates/review-details.html';
paths.FilterTemplate = paths.source  +'templates/filter.html';



// SCSS
paths.mainSCSS = paths.source  +'scss/main.scss';
paths.toastSCSS = paths.source  +'scss/toast.scss';
paths.navSCSS = paths.source  +'scss/nav.scss';
paths.allRestaurantSCSS = paths.source  +'scss/all-restaurant.scss';
paths.RestaurantSCSS = paths.source  +'scss/restaurant.scss';
paths.FilterSCSS = paths.source  +'scss/filter.scss';


// Static
paths.manifest = paths.source + 'manifest.json';
paths.favicon = paths.source + 'images/favicon.ico';
paths.images = paths.source + 'images/**/*';
paths.scss = paths.source + 'scss/**/*.scss';
paths.data = paths.source + 'data/restaurants.json';


gulp.task('default',['copy:static', 'copy:images', 'minify:html','minify:html-templates', 'min:css', 'min:js', 'watch', 'server']);

gulp.task('server', function () {
	browserSync.init({
		server: {
			baseDir: './'
		},
		port: 1210,
		ui: {
			port: 1200
		}
	});
});

gulp.task('watch', function () {
	gulp.watch([
		paths.angularToastService,
		paths.angularMainCtrl,
		paths.angularAllRestaurantsCtrl,
		paths.angularModalDirective,
		paths.angularModalService,
		paths.angularHttpService,
		paths.angularRestaurantCtrl,
		paths.angularAddReviewCtrl,
		paths.angularFilterCtrl,
		paths.angularReviewDetailsDirective,
		paths.angularFilterDirective], ['min:js']);

	gulp.watch([
		paths.toastSCSS,
		paths.navSCSS,
		paths.mainSCSS,
		paths.allRestaurantSCSS,
		paths.RestaurantSCSS,
		paths.FilterSCSS], ['min:css']);

	gulp.watch([
		paths.AllRestaurantsHtmlTemplate,
		paths.RestaurantHtmlTemplate,
		paths.ReviewModalTemplate,
		paths.ReviewDetailsTemplate,
		paths.FilterTemplate], ['minify:html-templates']);



	gulp.watch([paths.mainHtml], ['minify:html']);

});

gulp.task('clean', function () {
	return gulp.src(paths.webroot + '*')
	.pipe(clean({ force: true }));
});

gulp.task('copy:static', function(){
	gulp.src([paths.favicon, paths.manifest])
	.pipe(gulp.dest(paths.webroot));

	gulp.src([paths.bootstrapFonts])
	.pipe(gulp.dest(paths.fontDest));


	gulp.src([paths.data])
	.pipe(gulp.dest(paths.dataDest));
});

gulp.task('copy:images', function () {
	return gulp.src([paths.images])
	.pipe(gulp.dest(paths.imagDest));
});

gulp.task('minify:html', function() {
	return gulp.src([paths.mainHtml])
	.pipe(removeHtmlComments())
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest(paths.webroot))
	.pipe(reload({stream: true}));
});

gulp.task('minify:html-templates', function() {
	return gulp.src([
		paths.AllRestaurantsHtmlTemplate,
		paths.RestaurantHtmlTemplate,
		paths.ReviewModalTemplate,
		paths.ReviewDetailsTemplate,
		paths.FilterTemplate])
	.pipe(removeHtmlComments())
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest(paths.templatesDest))
	.pipe(reload({stream: true}));
});

gulp.task('min:js', function() {
	return gulp.src([paths.jquery,
		paths.bootstrapJS,
		paths.angular,
		paths.angularRoute,
		paths.angularCookies,
		paths.angularAnimate,
		paths.app,
		paths.appConfig,
		paths.appRoutes,
		paths.angularConstants,
		paths.angularMainCtrl,
		paths.angularToastService,
		paths.angularHttpService,
		paths.angularModalService,
		paths.angularModalDirective,
		paths.angularReviewDetailsDirective,
		paths.angularFilterDirective,
		paths.angularAllRestaurantsCtrl,
		paths.angularRestaurantCtrl,
		paths.angularAddReviewCtrl,
		paths.angularFilterCtrl ])
	.pipe(concat(paths.jsDest +'/app.min.js'))
	.pipe(strip())
	.pipe(uglify())
	.pipe(gulp.dest('.'))
	.pipe(reload({stream: true}));
});

gulp.task('min:css', function () {
	var cssStream = gulp.src([paths.bootstrapCSS])
	.pipe(concat('css-files.css'))
	.pipe(stripCssComments({ preserve: false }))
	.pipe(cleanCSS({ compatibility: 'ie8' })),

	scssStream = gulp.src([paths.scss])
	.pipe(concat('css-files.css'))
	.pipe(sass({
		outputStyle: 'compressed'
	}).on('error', sass.logError))
	.pipe(autoprefixer({
		browser: ['last 2 versions']
	}))
	.pipe(stripCssComments({ preserve: false }))
	.pipe(cleanCSS({ compatibility: 'ie8' })),

	mergedStream = merge(cssStream, scssStream)
		.pipe(concat(paths.cssDest + '/app.min.css'))
		.pipe(cssmin())
		.pipe(gulp.dest('.'));


	return mergedStream;
});

