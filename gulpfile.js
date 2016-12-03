var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var eslint = require('gulp-eslint');
var sass = require('gulp-ruby-sass');
var uglify = require('gulp-uglify');

gulp.task('default', ['develop', 'sass', 'uglify', 'eslint', 'watch']);

gulp.task('eslint', function () {
  livereload.listen();
  return gulp
    .src(['**/*.js', '!node_modules/**', '!**/dist/**', '!public/lib/**', '!**/test/**'])
    .pipe(eslint({configFile: './.eslintrc'}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('./public/src/js/*.js', ['uglify']);
  gulp.watch('./public/src/css/*.scss', ['sass']);
  gulp.watch([
    '**/*.js', '!node_modules/**', '!**/dist/**', '!public/lib/**'
  ], ['eslint']);
});

gulp.task('develop', function () {
  nodemon({
    script: 'app.js',
    ignore: ['.sass-cache'],
    ext: 'js',
    env: {
      'NODE_ENV': 'development'
    }
  });
});

gulp.task('sass', function () {
  return sass('./public/src/css/*.scss', {style: 'compressed'})
    .pipe(gulp.dest('./public/dist/css'))
    .pipe(livereload());
});

gulp.task('uglify', function () {
  gulp
    .src('./public/src/js/*.js')
    .pipe(uglify({compress: true, mangle: true}))
    .pipe(gulp.dest('./public/dist/js'))
    .pipe(livereload());
});
