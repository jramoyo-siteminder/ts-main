var gulp = require('gulp');
var clean = require('gulp-clean');
var ts = require('gulp-typescript');

var merge = require('merge2');
var runSequence = require('run-sequence');

gulp.task('clean', function () {
    return gulp.src('dist/', { read: false }).pipe(clean());
});

gulp.task('compile', function () {
    var tsProject = ts.createProject('tsconfig.json');
    var tsResult = gulp.src('src/**/*.ts').pipe(tsProject());
    return merge([
        tsResult.dts.pipe(gulp.dest('dist/')),
        tsResult.js.pipe(gulp.dest('dist/'))
    ]);
});

gulp.task('build', function (callback) {
    runSequence('clean', 'compile', callback);
});

gulp.task('default', ['build']);