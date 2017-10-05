var gulp = require('gulp'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
    minify = require('gulp-minify'),
    watch = require('gulp-watch');


//script paths
var bowerFiles = ['bower_components/**/angular*.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.js.map',
                    'bower_components/underscore/underscore.js',
                    'bower_components/moment/moment.js'],
	appFiles = ['js/**/*.js', 'pages/**/*.js'],
    jsDest = 'dist/scripts';

gulp.task('bower_comps_scripts', function() {
    return gulp.src(bowerFiles)
        .pipe(gulp.dest(jsDest));
});
gulp.task('app_scripts', function() {
    return gulp.src(appFiles)
        .pipe(concat('app_scripts.js'))
        .pipe(gulp.dest(jsDest));
});
gulp.task('stream', function () {
    // Endless stream mode 
    gulp.watch(appFiles, ['app_scripts']);
});

gulp.task('default', ['bower_comps_scripts', 'app_scripts', 'stream']);