var gulp       = require('gulp');
var livereload = require('gulp-livereload');
var browserify = require('gulp-browserify');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('watch', function () {
   var files = [
      'app/*.html',
      'app/*.css',
      'app/build/*.js'
   ];
   var scripts = [
      'app/**/*.js',
      '!app/build/*.js'
   ];

   livereload.listen();
   gulp.watch(scripts, ['scripts']);
   gulp.watch(files, ['reload']);
});

gulp.task('reload', function () {
  gulp.src('')
    .pipe(livereload());
});

gulp.task('scripts', function() {
  gulp.src('app/src/app.js')
    .pipe(browserify({
      transform: [
        "reactify"
      ]
    }))
    .pipe(gulp.dest('./app/build/'))
});