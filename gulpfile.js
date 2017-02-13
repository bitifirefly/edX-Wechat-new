var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var eslint = require('gulp-eslint');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
// var uglify = require('gulp-uglify');

gulp.task('default', ['develop', 'sass', 'watch']);

gulp.task('eslint', function () {
  livereload.listen();
  return gulp
    .src(['!node_modules/**', '!public/lib/**', '!**/test/**'])
    .pipe(eslint({configFile: './.eslintrc'}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('./public/sass/*.scss', ['sass']);
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
  return sass('./public/sass/*.scss')
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

/*gulp.task('uglify', function () {
  gulp
    .src('./public/src/js/*.js')
    .pipe(uglify({compress: true, mangle: true}))
    .pipe(gulp.dest('./public/dist/js'))
    .pipe(livereload());
});*/
