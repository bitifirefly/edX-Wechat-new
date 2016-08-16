var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var eslint = require('gulp-eslint');


gulp.task('default', [
  'develop',
  'eslint',
  'watch',
]);

gulp.task('eslint', function() {
  livereload.listen();
  return gulp.src(['**/*.js', '!node_modules/**'])
             .pipe(eslint({configFile: './.eslintrc'}))
             .pipe(eslint.format())
             .pipe(eslint.failAfterError());
});

gulp.task('watch', function() {
  gulp.watch('./views/**/*.ejs', function() {
    livereload();
  });
  livereload.listen();
});

gulp.task('develop', function() {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js ejs',
    env: { 'NODE_ENV': 'development'}
  });
});
