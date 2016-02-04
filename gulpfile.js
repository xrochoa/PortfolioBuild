'use strict';

// GULP
var gulp = require('gulp');

// PLUGINS
//js
var jshint = require('gulp-jshint');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
//css
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
//img
var imagemin = require('gulp-imagemin');
//html
var cdnizer = require("gulp-cdnizer");
var minifyHTML = require('gulp-minify-html');
//server
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
//utils
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');


//Clean folders before tasks
gulp.task('clean', function() {
    return gulp.src(['dist/*'], {
            read: false
        })
        .pipe(clean());
});

//Lint Javascript
gulp.task('lintjs', function() {
    return gulp.src('src/js/app/**/*.js')
        .pipe(jshint({
            "browserify": true
        }))
        .pipe(jshint.reporter('default'));
});

//Browserify and Minify Javascript
gulp.task('bundlejs', function() {
    return gulp.src('src/js/app/app.js')
        .pipe(browserify())
        .pipe(rename(function(path) {
            path.basename = "bundle";
        }))
        .pipe(gulp.dest('src/js')) //bundles at source
        .pipe(uglify())
        .pipe(rename(function(path) {
            path.basename += ".min";
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload());
});

//Compile Sass to CSS and Minify
gulp.task('css', function() {
    return gulp.src('src/scss/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css')) //saves at source
        .pipe(autoprefixer({
            browsers: ['last 3 versions',
                'ie >= 8',
                'ios >= 7',
                'android >= 4.4',
                'bb >= 10'
            ],
            cascade: false
        }))
        .pipe(minifyCss())
        .pipe(rename(function(path) {
            path.basename += ".min";
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());

});

//Minify images
gulp.task('img', function() {
    return gulp.src('src/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }]
        }))
        .pipe(gulp.dest('dist/img'))
        .pipe(livereload());
});

//Replaces local links with CDNs and minify html
gulp.task('html', function() {
    return gulp.src('src/**/*.html')
        .pipe(cdnizer([{
            file: 'angular/angular.js',
            package: 'angular',
            cdn: 'https://ajax.googleapis.com/ajax/libs/angularjs/${ version }/angular.min.js'
        }, {
            file: 'angular-animate/angular-animate.js',
            package: 'angular-animate',
            cdn: 'https://ajax.googleapis.com/ajax/libs/angularjs/${ version }/angular-animate.min.js'
        }, {
            file: 'angular-aria/angular-aria.js',
            package: 'angular-aria',
            cdn: 'https://ajax.googleapis.com/ajax/libs/angularjs/${ version }/angular-aria.min.js'
        }, {
            file: 'angular-cookies/angular-cookies.js',
            package: 'angular-cookies',
            cdn: 'https://ajax.googleapis.com/ajax/libs/angularjs/${ version }/angular-cookies.min.js'
        }, {
            file: 'angular-message-format/angular-message-format.js',
            package: 'angular-message-format',
            cdn: 'https://ajax.googleapis.com/ajax/libs/angularjs/${ version }/angular-message-format.min.js'
        }, {
            file: 'angular-messages/angular-messages.js',
            package: 'angular-messages',
            cdn: 'https://ajax.googleapis.com/ajax/libs/angularjs/${ version }/angular-messages.min.js'
        }, {
            file: 'angular-resource/angular-resource.js',
            package: 'angular-resource',
            cdn: 'https://ajax.googleapis.com/ajax/libs/angularjs/${ version }/angular-resource.min.js'
        }, {
            file: 'angular-route/angular-route.js',
            package: 'angular-route',
            cdn: 'https://ajax.googleapis.com/ajax/libs/angularjs/${ version }/angular-route.min.js'
        }, {
            file: 'angular-sanitize/angular-sanitize.js',
            package: 'angular-sanitize',
            cdn: 'https://ajax.googleapis.com/ajax/libs/angularjs/${ version }/angular-sanitize.min.js'
        }, {
            file: 'angular-touch/angular-touch.js',
            package: 'angular-touch',
            cdn: 'https://ajax.googleapis.com/ajax/libs/angularjs/${ version }/angular-touch.min.js'
        }, {
            file: 'bootstrap/dist/css/bootstrap.css',
            package: 'bootstrap',
            cdn: 'https://maxcdn.bootstrapcdn.com/bootstrap/${ version }/css/bootstrap.min.css'
        }, {
            file: 'bootstrap/dist/js/bootstrap.js',
            package: 'bootstrap',
            cdn: 'https://maxcdn.bootstrapcdn.com/bootstrap/${ version }/js/bootstrap.min.js'
        }, {
            file: 'jquery/dist/jquery.js',
            package: 'jquery',
            cdn: 'https://ajax.googleapis.com/ajax/libs/jquery/${ version }/jquery.min.js'
        }, {
            file: 'angular-bootstrap/ui-bootstrap.js',
            package: 'angular-bootstrap',
            cdn: 'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/${ version }/ui-bootstrap.min.js'
        }, {
            file: 'd3/d3.js',
            package: 'd3',
            cdn: 'https://cdnjs.cloudflare.com/ajax/libs/d3/${ version }/d3.js'
        }, {
            file: 'phaser/build/phaser.js',
            package: 'phaser',
            cdn: 'https://cdnjs.cloudflare.com/ajax/libs/phaser/${ version }/phaser.min.js'
        }, {
            file: 'css/style.css',
            cdn: 'css/style.min.css'
        }, {
            file: 'js/bundle.js',
            cdn: 'js/bundle.min.js'
        }]))
        .pipe(minifyHTML())
        .pipe(gulp.dest("dist"))
        .pipe(livereload());

});

//Copy files from resources folder
gulp.task('res', function() {
    gulp.src('src/res/**/*')
        .pipe(gulp.dest('dist/res'));
});

//Watches Files For Changes
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('src/js/app/**/*.js', ['lintjs', 'bundlejs']);
    gulp.watch('src/scss/**/*.scss', ['css']);
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/img/**/*', ['img']);
    gulp.watch('src/res/**/*', ['res']);
});

//Node server start
gulp.task('server', function() {
    nodemon({
        script: 'server.js'
    });
});

// Default Task
gulp.task('default', function() {
    runSequence('clean', 'lintjs', 'bundlejs', 'css', 'html', 'img', 'res', 'watch', 'server');
});