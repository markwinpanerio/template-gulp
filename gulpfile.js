var gulp = require('gulp');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
var babel = require('gulp-babel');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var ejs = require("gulp-ejs");
var log = require('fancy-log')

var outputDir = './public';
 
gulp.task('connect', function() {
  connect.server({
    root: './public',
    livereload: true
  });
});

gulp.task('sass', function() {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
    .pipe(connect.reload());
});

gulp.task('es6', function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./public/js'))
    .pipe(connect.reload());
})

gulp.task('css', function () {
  gulp.src('./public/**/*.css')
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(gulp.dest('./public/'));
});

gulp.task('ejs', function() {
  gulp.src('./src/*.ejs')
    .pipe(ejs({
        msg: 'Hello Gulp!'
    }, {}, { ext: '.html' }).on('error', log))
    .pipe(gulp.dest('./public'))
    .pipe(connect.reload());
})

gulp.task('run', ['sass', 'css', 'es6', 'ejs']);

gulp.task('watch', function() {

  var server = livereload();

  gulp.watch('./src/sass/**/*.scss', ['sass']);
  gulp.watch('./public/**/*.css', ['css']);
  gulp.watch('./src/js/**/*.js', ['es6']);
  gulp.watch('./src/*.ejs', ['ejs']);
})

gulp.task('default', ['run', 'watch', 'connect']);