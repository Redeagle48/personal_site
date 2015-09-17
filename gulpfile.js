var gulp = require('gulp');
var plumbler = require('gulp-plumber');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');
var replace = require('gulp-replace');

var rename = require('gulp-rename');

var reload = browserSync.reload;

//////////////////////////////////
// Compress images
//////////////////////////////////
gulp.task('compress-images', function() {
  gulp.src('public/assets/src/images/**')
    .pipe(imagemin())
    .pipe(gulp.dest('build/public/images'));
});

//////////////////////////////////
// Minify JavaScript files
//////////////////////////////////
gulp.task('minify-js', function() {
  gulp.src('public/assets/src/js/*.js')
    .pipe(plumbler())
    .pipe(replace('public/assets/src', 'public'))
    /*
        .pipe(rename({
          suffix: '.min',
        }))
    */
    .pipe(gulp.dest('build/public/js'));
});

//////////////////////////////////
// Handle CSS folder
//////////////////////////////////
gulp.task('minify-css', function() {
  gulp.src('public/assets/src/css/**')
    .pipe(plumbler())
    .pipe(replace('public/assets/src', 'public'))
    .pipe(gulp.dest('build/public/css'));
});

//////////////////////////////////
// Handle Font folder
//////////////////////////////////
gulp.task('minify-font', function() {
  gulp.src('public/assets/src/font/**')
    .pipe(plumbler())
    .pipe(gulp.dest('build/public/font'));
});

//////////////////////////////////
// Handle scripts folder
//////////////////////////////////
gulp.task('minify-scripts', function() {
  gulp.src('public/assets/src/scripts/**')
    .pipe(plumbler())
    .pipe(gulp.dest('build/public/scripts'));
});

//////////////////////////////////
// Handle index HTML file
//////////////////////////////////
gulp.task('copy-html', function() {
  gulp.src('index.html')
    .pipe(replace('public/assets/src', 'public'))
    .pipe(gulp.dest('build'));
});

//////////////////////////////////
// Handle metadata files
//////////////////////////////////
gulp.task('copy-meta', function() {
  gulp.src(['sitemap.xml', 'sitemap.html', 'robots.txt', 'google*.html', 'favicon.png'])
    .pipe(gulp.dest('build'));
});

gulp.task('build', ['copy-html', 'copy-meta', 'minify-css', 'minify-font', 'minify-scripts', 'minify-js', 'compress-images'], function() {
  // gutil.log('Build Done!');
});

//////////////////////////////////
// Watch html files
//////////////////////////////////
gulp.task('serve', function() {

  // Serve files from the root of this project
  browserSync.init({
    server: {
      baseDir: './',
    },
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
gulp.task('clean', function() {
  return gulp.src('build', {
      read: false,
    })
    .pipe(clean());
});

//////////////////////////////////
// Deploy to the server
// //////////////////////////////////
gulp.task('deploy', function() {

  var conn = ftp.create({
    host: 'mywebsite.tld',
    user: 'me',
    password: 'mypass',
    parallel: 10,
    log: gutil.log
  });

  var globs = [
    'src/**',
    'css/**',
    'js/**',
    'fonts/**',
    'index.html'
  ];

  // using base = '.' will transfer everything to /public_html correctly
  // turn off buffering in gulp.src for best performance

  return gulp.src(globs, {
      base: '.',
      buffer: false
    })
    .pipe(conn.newer('/public_html')) // only upload newer files
    .pipe(conn.dest('/public_html'));

});
