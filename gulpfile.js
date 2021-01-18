// Installer
//yarn add  --dev --exact gulp-autoprefixer gulp-clean-css gulp-jshint gulp-include gulp-uglify run-sequence browser-sync

'use strict';

// GULP
var gulp = require('gulp');

// PLUGINS
//img
var imagemin = require('gulp-imagemin');

//html
var htmlmin = require('gulp-htmlmin'),
    handlebars = require('gulp-compile-handlebars');


//css
var sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css');

//js
var jshint = require('gulp-jshint'),
    include = require('gulp-include'),
    uglify = require('gulp-uglify');

//utils
var del = require('del');

//server
var browserSync = require('browser-sync').create();


// Allows module reloading require project name
require.reload = function reload(path) {
    delete require.cache[require.resolve(path)];
    return require(path);
};

/*
CLEAN
*/

//Clean dist folder before tasks
gulp.task('clean', function () {
    return del(['dist/*']);
});

/*
RESOURCES
*/

//Copy files from resources
gulp.task('res', function () {
    return gulp.src('src/assets/res/**/*')
        .pipe(gulp.dest('dist/assets/res'))
        .pipe(browserSync.stream());

});

gulp.task('fonts', function () {
    return gulp.src('src/assets/fonts/**/*')
        .pipe(gulp.dest('dist/assets/fonts'))
        .pipe(browserSync.stream());

});

/*
HTML
*/

//Minify html
gulp.task('html', function () {
    return gulp.src('src/**/*.html')
        .pipe(handlebars(require.reload('./template/data.json'), { batch: ['./template/partials'] }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());

});

/*
IMAGES
*/

//Minify png, jpg, gif and svg images
gulp.task('img', function () {
    return gulp.src('src/assets/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }]
        }))
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(browserSync.stream());

});

/*
JAVASCRIPT
*/

//Lint custom js
gulp.task('js', function () {
    return gulp.src('src/assets/app/**/app.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(include())
        .pipe(gulp.dest('src/assets/js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(browserSync.stream());

});

/*
CSS
*/

//Compile scss to css and minify
gulp.task('css', function () {
    return gulp.src('src/assets/scss/**/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/assets/css'))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(browserSync.stream());


});

/*
WATCH - DEFAULT
*/

//Watches Files For Changes
gulp.task('watch', function () {

    browserSync.init({
        server: {
            baseDir: 'dist'
        },
        open: false
    });

    gulp.watch('src/assets/res/**/*', gulp.series('res', 'fonts'));
    gulp.watch('src/assets/img/**/*', gulp.series('img', 'html'));
    gulp.watch(['src/**/*.html', 'template/**/*'], gulp.series('html'));
    gulp.watch('src/assets/scss/**/*.scss', gulp.series('css'));
    gulp.watch('src/assets/app/**/*.js', gulp.series('js'));

});


// Default Task
gulp.task('default', gulp.series('clean', 'res', 'fonts', 'img', 'html', 'css', 'js', 'watch', function (done) {
    console.log('done')
}));
