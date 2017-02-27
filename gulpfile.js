var gulp = require('gulp');
var clean = require('gulp-clean');
var ts = require('gulp-typescript');

var _ = require('lodash');
var merge = require('merge2');
var runSequence = require('run-sequence');

var tsModules = [
    'ts-npm-module',
    // 'other-ts-module-1',
    // 'other-ts-module-2',
];

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

gulp.task('clean:dependencies', function () {
    return merge(_.map(tsModules, function (module) {
        return cleanDependency(module);
    }));
});

gulp.task('compile:dependencies', function () {
    return merge(_.map(tsModules, function (module) {
        return compileDependency(module);
    }));
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
        ['clean:dependencies', 'clean'],
        'compile:dependencies',
        'compile',
        callback);
});

gulp.task('default', ['build']);