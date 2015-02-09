var gulp       = require('gulp');
var livereload = require('gulp-livereload');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('watch', function () {
   var files = [
      'app/*.html',
      'app/*.css',
      'app/build/*.js'
   ];

   livereload.listen();
   gulp.watch(files, ['reload']);
});

gulp.task('reload', function () {
  gulp.src('')
    .pipe(livereload());
});