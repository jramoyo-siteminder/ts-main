var gulp = require('gulp');
var addSrc = require('gulp-add-src');
var clean = require('gulp-clean');
var debug = require('gulp-debug');
var git = require('gulp-git');
var size = require('gulp-size');
var ts = require('gulp-typescript');
var util = require('gulp-util');
var yarn = require('gulp-yarn');
var zip = require('gulp-zip');

var async = require('async');
var exec = require('child_process').exec;
var merge = require('merge2');
var moment = require('moment');

var package = require('./package.json');

gulp.task('clean', function () {
    return gulp.src(['dist/', 'build/'], { read: false }).pipe(clean());
});

gulp.task('stage', ['clean'], function () {
    return gulp.src(['./package.json', './yarn.lock'])
        .pipe(gulp.dest('./build/stage'))
        .pipe(yarn({ production: true }));
});

gulp.task('compile', ['stage'], function () {
    var tsProject = ts.createProject('tsconfig.json');
    var tsResult = gulp.src('src/**/*.ts').pipe(tsProject());
    return merge([
        tsResult.dts.pipe(debug({ title: 'dts' }))
            .pipe(gulp.dest('dist/'))
            .pipe(size({ title: 'compile' })),
        tsResult.js.pipe(debug({ title: 'ts' }))
            .pipe(gulp.dest('dist/'))
            .pipe(size({ title: 'compile' }))
    ]);
});

gulp.task('build', ['compile'], function (done) {
    function _command(command, cb) {
        exec(command, function (err, stdout, stderr) {
            if (stderr) {
                cb(stderr);
            } else {
                cb(null, stdout.split('\n').join(''));
            }
        });
    }

    async.parallel({
        status: function (cb) {
            git.status({ args: '--porcelain' }, cb);
        },
        tag: function (cb) {
            _command('git tag -l --points-at HEAD', cb);
        },
        branch: function (cb) {
            _command('git rev-parse --abbrev-ref HEAD', cb);
        },
        sha: function (cb) {
            _command('git rev-parse --short HEAD', cb);
        }
    }, function (err, results) {
        if (err) {
            util.log('error:', err);
            throw err;
        }

        var artifactNameParts = [package.name];
        if (results.status === '') {
            if (results.tag === '') {
                artifactNameParts.push(results.branch);
                artifactNameParts.push(results.sha);
            } else {
                artifactNameParts.push(package.version);
            }
        } else {
            artifactNameParts.push(results.branch);
            artifactNameParts.push(moment().format("YYYYMMDD_HHmmss"));
        }

        gulp.src('./build/stage/node_modules/**', { base: './build/stage/' })
            .pipe(addSrc(['dist/**']))
            .pipe(zip('' + artifactNameParts.join('-') + '.zip'))
            .pipe(gulp.dest('build'))
            .pipe(debug({ title: 'zip' }))
            .pipe(size({ title: 'package', gzip: true }))
            .on('end', done);
    });
});

gulp.task('default', ['build']);