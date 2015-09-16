var gulp = require('gulp');
var plumbler = require('gulp-plumber');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );

var reload = browserSync.reload;

// Compress images
gulp.task('compress-images', function(){
  gulp.src('images/*')
      .pipe(imagemin())
      .pipe(gulp.dest('build/images'));
});

// Minify JavaScript files
gulp.task('minify-js', function() {
  gulp.src('js/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

// Watch html files
gulp.task('serve', function() {

  // Serve files from the root of this project
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch("index.html").on("change", browserSync.reload);
  gulp.watch("public/assets/src/js/*.js").on("change", browserSync.reload);
  gulp.watch("public/assets/src/js/*.css").on("change", browserSync.reload);
  gulp.watch("public/assets/src/scripts/*.php").on("change", browserSync.reload);
});

gulp.task( 'deploy', function () {

    var conn = ftp.create( {
        host:     'mywebsite.tld',
        user:     'me',
        password: 'mypass',
        parallel: 10,
        log:      gutil.log
    } );

    var globs = [
        'src/**',
        'css/**',
        'js/**',
        'fonts/**',
        'index.html'
    ];

    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance

    return gulp.src( globs, { base: '.', buffer: false } )
        .pipe( conn.newer( '/public_html' ) ) // only upload newer files
        .pipe( conn.dest( '/public_html' ) );

} );
