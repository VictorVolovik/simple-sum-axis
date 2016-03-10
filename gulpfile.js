var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var del = require('del');

// clean build directory
gulp.task('clean', function () {
  return del(['build']);
});

// copy index.html
gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe(gulp.dest('./build'));
});

// ready css
gulp.task('css', function () {
  var processors = [
    autoprefixer({
      browsers: ['last 3 version', 'ie 10']
    }),
    mqpacker,
    csswring
  ];
  return gulp.src(['./styles/reset.css', './styles/**/*.css'])
    .pipe(postcss(processors))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./build/styles/'));
});

// ready js
gulp.task('js', function () {
  gulp.src(['./bower_components/jquery/dist/jquery.min.js', './scripts/**/*.js'])
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./build/scripts'));
});

// copy fonts
gulp.task('fonts', function () {
  gulp.src('fonts/**/*.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('./build/fonts'));
});

// copy images
gulp.task('images', function () {
  gulp.src('images/*')
    .pipe(gulp.dest('./build/images'));
});

// static server
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './build'
    }
  });
});

// default task
gulp.task('default', ['clean'], function () {
  gulp.start('html', 'css', 'js', 'fonts', 'images');
});

// watch
gulp.task('watch', ['default', 'browser-sync'], function () {
  gulp.watch('./styles/**/*.css', ['css', browserSync.reload]);

  gulp.watch('./scripts/**/*.js', ['js', browserSync.reload]);

  gulp.watch('./*.html', ['html', browserSync.reload]);
});
