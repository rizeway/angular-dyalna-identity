var gulp    = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var del = require('del');

var PATH = {
  JS: './src/**/*.js',
  JS_ENTRY: './src/js/module.js',
  APP: 'angular-dyalna-identity.es5.js',
  OUTPUT: './dist'
};

gulp.task('clean', function(done){
  del(PATH.OUTPUT, done);
});

gulp.task('build/module', ['clean'], function() {
  return browserify(PATH.JS_ENTRY,  { debug: true })
    .transform(babelify)
    .bundle()
    .on('error', function(err) { console.log('Error: ' + err.message); })
    .pipe(source(PATH.APP))
    .pipe(gulp.dest(PATH.OUTPUT));
});

gulp.task('build', ['build/module']);

gulp.task('watch', function() {
  gulp.watch(PATH.JS, ['build/module']);
  gulp.watch('gulpfile.js', ['build']);
});

gulp.task('default', ['build']);
