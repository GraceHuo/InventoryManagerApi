var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');
var config = require('./server/config/config');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function () {
  return gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {
      verbose: true
    }))
    .pipe(jscs());
});

gulp.task( 'default', ['serve'] );

gulp.task('serve', ['style'], function () {
  var options = {
    script: 'index.js',
    delayTime: 1,
    env: {
      'PORT': config.port
    },
    watch: jsFiles
  };

  return nodemon(options)
    .on('restart', function (ev) {
      console.log('Restarting....');
    });
});