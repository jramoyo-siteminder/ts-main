var gulp = require('gulp');
var clean = require('gulp-clean');
var ts = require('gulp-typescript');

var merge = require('merge2');
var runSequence = require('run-sequence');

function moduleDir(module) {
    return './node_modules/' + module;
}

function cleanDependency(module) {
    return gulp.src(moduleDir(module) + '/dist/', { read: false }).pipe(clean());
}

function compileDependency(module) {
    var tsProject = ts.createProject(moduleDir(module) + '/tsconfig.json');
    var tsResult = gulp.src(moduleDir(module) + '/src/**/*.ts').pipe(tsProject());
    return merge([
        tsResult.dts.pipe(gulp.dest(moduleDir(module) + '/dist/')),
        tsResult.js.pipe(gulp.dest(moduleDir(module) + '/dist/'))
    ]);
}

gulp.task('clean-dependencies', function () {
    return merge([
        cleanDependency('ts-npm-module'),
        // cleanDependency('other-module-1'),
        // cleanDependency('other-module-2'),
    ]);
});

gulp.task('compile-dependencies', function () {
    return merge([
        compileDependency('ts-npm-module'),
        // compileDependency('other-module-1'),
        // compileDependency('other-module-2'),
    ]);
});

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
    runSequence(
        ['clean-dependencies', 'clean'],
        'compile-dependencies',
        'compile',
        callback);
});

gulp.task('default', ['build']);