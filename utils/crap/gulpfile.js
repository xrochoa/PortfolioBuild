// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jsonminify = require('gulp-jsonminify');
var cdnizer = require("gulp-cdnizer");
var minifyHTML = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
// Server automation plugins
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
// Optimize images
var imagemin = require('gulp-imagemin');
// Clean folders before tasks
var del = require('del');

// Clean folders before tasks
gulp.task('clean', function() {
    del(['temp/**/*', 'dist/**/*'])
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('temp'))
        .pipe(rename('style.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload())
});


// Lint, Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('temp'))
        .pipe(uglify())
        .pipe(rename(function(path) {
            path.basename += ".min";
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload())
});

// Minify JSONS
gulp.task('jsons', function() {
    return gulp.src('data/**/*.json')
        .pipe(jsonminify())
        .pipe(gulp.dest('dist/res'))
        .pipe(livereload())
});

// Copy images
gulp.task('images', function() {
    return gulp.src('img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }]
        }))
        .pipe(gulp.dest('dist/img'))
        .pipe(livereload())
});

//Copy resources
gulp.task('res', function() {
    return gulp.src('res/**/*')
        .pipe(gulp.dest('dist/res'))
        .pipe(livereload())
});

//Copy resources
gulp.task('favicon', function() {
    return gulp.src('favicon.ico')
        .pipe(gulp.dest('dist'))
        .pipe(livereload())
});

//Replacing local links with CDNs and minify index.html
gulp.task('cdn', function() {
    return gulp.src(['index.html', '404.html'])
        .pipe(cdnizer([{
                file: 'bower_components/angular/angular.js',
                package: 'angular',
                cdn: 'https://ajax.googleapis.com/ajax/libs/angularjs/${ version }/angular.min.js'
            },
            /*{
        file: 'bower_components/angular-route/angular-route.js',
        package: 'angular',
        cdn: 'https://ajax.googleapis.com/ajax/libs/angularjs/${ version }/angular-route.min.js'
    },*/
            {
                file: 'bower_components/bootstrap/dist/css/bootstrap.css',
                package: 'bootstrap',
                cdn: 'https://maxcdn.bootstrapcdn.com/bootstrap/${ version }/css/bootstrap.min.css'
            }, {
                file: 'bower_components/bootstrap/dist/js/bootstrap.js',
                package: 'bootstrap',
                cdn: 'https://maxcdn.bootstrapcdn.com/bootstrap/${ version }/js/bootstrap.min.js'
            }, {
                file: 'bower_components/jquery/dist/jquery.js',
                package: 'jquery',
                cdn: 'https://ajax.googleapis.com/ajax/libs/jquery/${ version }/jquery.min.js'
            }, {
                file: 'temp/style.css',
                cdn: 'css/style.min.css'
            }, {
                file: 'temp/app.js',
                cdn: 'js/app.min.js'
            }, {
                file: 'bower_components/bootstrap-validator/dist/validator.js',
                package: 'jquery',
                cdn: 'https://cdnjs.cloudflare.com/ajax/libs/1000hz-bootstrap-validator/${ version }/validator.min.js'
            }

        ]))
        .pipe(minifyHTML())
        .pipe(gulp.dest("dist"))
        .pipe(livereload())
});

//Minify  content HTML
gulp.task('minify-html', function() {
    return gulp.src('views/**/*.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest('dist/views'))
        .pipe(livereload())
});

// Node server start
gulp.task('server', function() {
    nodemon({
        script: 'server.js'
    });
});

// Watch Files For Changes
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('data/**/*.json', ['jsons']);
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('index.html', ['cdn']);
    gulp.watch('views/*.html', ['minify-html']);

});

// Default Task
gulp.task('default', ['clean', 'sass', 'scripts', 'jsons', 'cdn', 'minify-html', 'images', 'res', 'favicon',
    'watch', 'server'
]);