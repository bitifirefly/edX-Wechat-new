var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var eslint = require('gulp-eslint');
var sass = require('gulp-ruby-sass');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var shell = require('gulp-shell');

gulp.task('default', [
  'develop',
  'htmlmin',
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
  gulp.watch('./public/src/js/*.js', ['uglify']);
  gulp.watch('./public/src/css/*.scss', ['sass']);
  gulp.watch('./views/src/**/*.ejs', ['htmlmin'], function() {
    livereload();
  });
  gulp.watch(['**/*.js', '!node_modules/**', '!**/dist/**/*.js'], ['eslint']);
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
  return sass('./public/src/css/*.scss', {
    style: 'compressed'
  })
    .pipe(gulp.dest('./public/dist/css'))
    .pipe(livereload());
});

gulp.task('uglify', function() {
  gulp.src('./public/src/js/*.js')
      .pipe(uglify({
        compress: true,
        mangle: true
      }))
      .pipe(gulp.dest('./public/dist/js'))
      .pipe(livereload());
});

gulp.task('htmlmin', function() {
  var options = {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyJS: true,
    minfyCSS: true
  };
  gulp.src('views/src/**/*.ejs')
		.pipe(htmlmin(options))
		.pipe(gulp.dest('views/dist/'));
});
