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
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');




// Lint Task
gulp.task('lint', function () {
    return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(notify("Js hint ran!"));

});

// Compile Our Sass
gulp.task('sass', function () {
    return gulp.src('scss/*.scss')
    .pipe(sass())
    .pipe(concat('style.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload())
    .pipe(notify("Compiled, concatenated and minified scss files!"));

});

// Concatenate & Minify JS
gulp.task('scripts', function () {
    return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(rename(function (path) {
        path.basename += ".min";
    }))
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload())
    .pipe(notify("Concatenated and minified js files!"));
});

// Minify JSONS
gulp.task('jsons', function () {
    return gulp.src('refs/*.json')
    .pipe(jsonminify())
    .pipe(gulp.dest('dist/refs'))
    .pipe(livereload())
    .pipe(notify("Minified Jsons!"));
});

// Copy images
gulp.task('images', function () {
    return gulp.src('img/*.png')
    .pipe(gulp.dest('dist/img'))
    .pipe(livereload())
    .pipe(notify("Images copied!"));
});

//Replacing local links with CDNs and minify index.html
gulp.task('cdn', function () {
    return gulp.src("index.html")
    .pipe(cdnizer([
    {
        file: 'bower_components/angular/angular.js',
        package: 'angular',
        cdn: 'https://ajax.googleapis.com/ajax/libs/angularjs/${ version }/angular.min.js'
    },
    {
        file: 'bower_components/angular-animate/angular-animate.js',
        package: 'angular-animate',
        cdn: 'https://ajax.googleapis.com/ajax/libs/angularjs/${ version }/angular-animate.min.js'
    },
    {
        file: 'bower_components/angular-route/angular-route.js',
        package: 'angular-route',
        cdn: 'https://ajax.googleapis.com/ajax/libs/angularjs/${ version }/angular-route.min.js'
    },
    {
        file: 'bower_components/angular-sanitize/angular-sanitize.js',
        package: 'angular-sanitize',
        cdn: 'https://ajax.googleapis.com/ajax/libs/angularjs/${ version }/angular-sanitize.min.js'
    },
    /* REGULAR BOOTSTRAP
    {
        file: 'bower_components/bootstrap/dist/css/bootstrap.css',
        package: 'bootstrap',
        cdn: 'https://maxcdn.bootstrapcdn.com/bootstrap/${ version }/css/bootstrap.min.css'
    },
    {
        file: 'bower_components/bootstrap/dist/js/bootstrap.js',
        package: 'bootstrap',
        cdn: 'https://maxcdn.bootstrapcdn.com/bootstrap/${ version }/js/bootstrap.min.js'
    },*/
    //NEW BOOSTRAP 4 ALPHA
    {
        file: 'bower_components/bootstrap/dist/css/bootstrap.css',
        cdn: 'https://cdn.rawgit.com/twbs/bootstrap/v4-dev/dist/css/bootstrap.min.css'
    },
    {
        file: 'bower_components/bootstrap/dist/js/bootstrap.js',
        cdn: 'https://cdn.rawgit.com/twbs/bootstrap/v4-dev/dist/js/bootstrap.min.js'
    },
    {
        file: 'bower_components/jquery/dist/jquery.js',
        package: 'jquery',
        cdn: 'https://ajax.googleapis.com/ajax/libs/jquery/${ version }/jquery.min.js'
    },
    {
        file: 'css/style.css',
        cdn: 'css/style.min.css'
    },
    {
        file: 'js/app.js',
        cdn: 'js/app.min.js'
    },
    {
        file: 'js/navbar.js',
        cdn: 'js/navbar.min.js'
    }
    ]))
.pipe(minifyHTML())
.pipe(gulp.dest("dist"))
.pipe(livereload())
.pipe(notify("Updated cdns and minified HTML!"));


});

//Minify  content HTML
gulp.task('minify-html', function () {
    return gulp.src('content/**/*.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('dist/content'))
    .pipe(livereload())
    .pipe(notify("Minified HTML content!"));
});

// Node server start
gulp.task('server', function () {
  nodemon({
    script: 'server.js'
});
});

// Watch Files For Changes
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('refs/*.json', ['jsons']);
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('index.html', ['cdn']);
    gulp.watch('content/*.html', ['minify-html']);

});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'jsons', 'cdn', 'minify-html', 'images',
    'watch','server']);
