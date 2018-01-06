// General
const gulp = require('gulp');
const util = require('gulp-util');
const plumber = require('gulp-plumber');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();
// CSS
const compass = require('gulp-compass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

gulp.task('css', _ => {
  return gulp
    .src('scss/**/*.scss')
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
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});
gulp.task('browser-sync', ['css'], _ => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('scss/**/*.scss', ['css']);
});
gulp.task('default', ['browser-sync']);
