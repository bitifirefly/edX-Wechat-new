var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var eslint = require('gulp-eslint');
var sass = require('gulp-ruby-sass');
var uglify = require('gulp-uglify');

gulp.task('default', [
  'develop',
  'sass',
  'uglify',
  'eslint',
  'watch'
]);

gulp.task('eslint', function() {
  livereload.listen();
  return gulp.src(['**/*.js', '!node_modules/**', '!**/dist/*.js'])
             .pipe(eslint({configFile: './.eslintrc'}))
             .pipe(eslint.format())
             .pipe(eslint.failAfterError());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./public/js/src/*.js', ['uglify']);
  gulp.watch('./public/css/src/**/*.scss', ['sass']);
  gulp.watch('./views/*.ejs', function() {
    livereload();
    console.log('ejs');
  });
  gulp.watch(['**/*.js', '!node_modules/**', '!**/dist/*.js'], ['eslint']);
});

gulp.task('develop', function() {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ignore: [
      '.sass-cache'
    ],
    ext: 'js ejs',
    env: { 'NODE_ENV': 'development'}
  });
});

gulp.task('sass', function() {
  return sass('./public/css/src/*.scss', {
    style: 'compressed'
  })
    .pipe(gulp.dest('./public/css/dist'))
    .pipe(livereload());
});

gulp.task('uglify', function() {
  gulp.src('./public/js/src/*.js')
    .pipe(uglify({
      compress: true,
      mangle: true
    }))
    .pipe(gulp.dest('./public/js/dist'))
    .pipe(livereload());
});
