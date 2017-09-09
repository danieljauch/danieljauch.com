const gulp = require('gulp');
// CSS
const compass = require('gulp-compass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
// General
const plumber = require('gulp-plumber');
const watch = require('gulp-watch');
const util = require('gulp-util');

gulp.task('css', () => {
  gulp.src('scss/**/*.scss')
    .pipe(compass({
      sass: 'scss',
      css: 'css'
    }))
    .pipe(autoprefixer({
      browsers: ['last 5 versions', 'ie >= 11', '> 5%'],
      cascade: false,
      grid: true
    }))
    .pipe(plumber())
    .pipe(cleanCSS())
    .pipe(gulp.dest('css'));
});
gulp.task('watch', () => {
  gulp.watch('scss/**/*.scss', ['css']);
});
gulp.task('default', ['watch']);
