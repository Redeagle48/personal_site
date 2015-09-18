var gulp = require('gulp-help')(require('gulp'));
var plumbler = require('gulp-plumber');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');
var replace = require('gulp-replace');

var rename = require('gulp-rename');

var reload = browserSync.reload;

var ftpData = require('./ftp-config');

var w3cjs = require('gulp-w3cjs');

//////////////////////////////////
// Compress images
//////////////////////////////////
gulp.task('compress-images', 'Compress Images', function() {
  gulp.src('public/assets/src/images/**')
    .pipe(imagemin())
    .pipe(gulp.dest('build/public/images'));
});

//////////////////////////////////
// Minify JavaScript files
//////////////////////////////////
gulp.task('minify-js', 'Move javascript to the build folder, replace paths and minify them', function() {
  gulp.src('public/assets/src/js/*.js')
      .pipe(plumbler())
      .pipe(uglify())
      .pipe(replace('public/assets/src', 'public'))
/*
        .pipe(rename({
          //suffix: '.min',
          extname: ".min.js"
        }))
*/
    .pipe(gulp.dest('build/public/js'));
});

//////////////////////////////////
// Handle CSS folder
//////////////////////////////////
gulp.task('minify-css', 'Move css to the build folder and replace paths', function() {
  gulp.src('public/assets/src/css/**')
    .pipe(plumbler())
    .pipe(replace('public/assets/src', 'public'))
    .pipe(gulp.dest('build/public/css'));
});

//////////////////////////////////
// Handle Font folder
//////////////////////////////////
gulp.task('minify-font', 'Move fonts to the build folder', function() {
  gulp.src('public/assets/src/font/**')
    .pipe(plumbler())
    .pipe(gulp.dest('build/public/font'));
});

//////////////////////////////////
// Handle scripts folder
//////////////////////////////////
gulp.task('minify-scripts', 'Move scripts to the build folder', function() {
  gulp.src('public/assets/src/scripts/**')
    .pipe(plumbler())
    .pipe(gulp.dest('build/public/scripts'));
});

//////////////////////////////////
// Handle index HTML file
//////////////////////////////////
gulp.task('copy-html', 'Copy index.html to the build folder and replace paths', function() {
  gulp.src('index.html')
    .pipe(replace('public/assets/src', 'public'))
    .pipe(gulp.dest('build'));
});

//////////////////////////////////
// Handle metadata files
//////////////////////////////////
gulp.task('copy-meta', 'Copy meta data to the build folder', function() {
  gulp.src(['sitemap.xml', 'sitemap.html', 'robots.txt', 'google*.html', 'favicon.png'])
    .pipe(gulp.dest('build'));
});

gulp.task('build', ['copy-html', 'copy-meta', 'minify-css', 'minify-font', 'minify-scripts', 'minify-js', 'compress-images'], function() {
  // gutil.log('Build Done!');
});

//////////////////////////////////
// Watch html files
//////////////////////////////////
gulp.task('serve', 'Browser live reload while developing', function() {

  // Serve files from the root of this project
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('index.html').on('change', browserSync.reload);
  gulp.watch('public/assets/src/js/*.js').on('change', browserSync.reload);
  gulp.watch('public/assets/src/css/**/*').on('change', browserSync.reload);
  gulp.watch('public/assets/src/images/*').on('change', browserSync.reload);
});

var clean = require('gulp-clean');

//////////////////////////////////
// Clean build files
//////////////////////////////////
gulp.task('clean', 'Clean build folder and files', function() {
  return gulp.src('build', {
      read: false
    })
    .pipe(clean());
});

//////////////////////////////////
// Deploy to the server
// //////////////////////////////////
gulp.task('deploy', 'Deploy the build files to the server', function() {

  var conn = ftp.create({
    host: ftpData.host,
    user: ftpData.user,
    password: ftpData.password,
    parallel: 10,
    log: gutil.log
  });

  var globs = [
    'public/scripts/**',
    'public/css/**',
    'public/js/**',
    'public/fonts/**',
    'public/images/**',
    'index.html',
    'sitemap.html',
    'sitemap.xml',
    'robots.txt',
    'favicon.png',
    'google*.html'
  ];

  // using base = '.' will transfer everything to /public_html correctly
  // turn off buffering in gulp.src for best performance

  return gulp.src(globs, {
      base: './build',
      buffer: false
    })
    .pipe(conn.newer('/public_html/test_site/')) // only upload newer files
    .pipe(conn.dest('/public_html/test_site/'));

});

//////////////////////////////////
// Verify html correctness according to w3cjs
// //////////////////////////////////
gulp.task('verify-html', 'Verify html correctness according to w3cjs', function() {
  gulp.src('src/index.html')
    .pipe(w3cjs());
});
