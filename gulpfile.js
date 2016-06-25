'use strict';

var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpPlugins = {
    concat: require('gulp-concat'),
    rename: require('gulp-rename'),
    replace: require('gulp-replace'),
    uglify: require('gulp-uglify'),
    wrap: require('gulp-wrap')
};
var pkg = require('./package.json');

var USE_STRICT_PATTERN = /(['"]use strict['"];?\n?)/g;
var REQUIRE_PATTERN = /((?:var |,)[^=]+=\s*require\([^\)]+\);?\n?)/g;
var EXPORT_PATTERN = /((?:module\.)?exports\s*=\s*[^,;]+;?\n?)/g;

var files = [
    './src/isFinite.js',
    './src/makeOrdinal.js',
    './src/toOrdinal.js',
    './src/toWords.js',
    './src/toWordsOrdinal.js'
];

gulp.task('default', ['build']);
gulp.task('build', ['bundle']);
gulp.task('bundle', function () {
    return gulp.src(files)
        .on('error', gutil.log)
        .pipe(gulpPlugins.wrap({ src: 'wrapEach.tmpl' }))
        .pipe(gulpPlugins.replace(USE_STRICT_PATTERN, ''))
        .pipe(gulpPlugins.replace(REQUIRE_PATTERN, ''))
        .pipe(gulpPlugins.replace(EXPORT_PATTERN, ''))
        .pipe(gulpPlugins.concat('numberToWords.js'))
        .pipe(gulpPlugins.wrap({ src: 'wrapBundle.tmpl' }, pkg, { variable: 'data' }))
        .pipe(gulp.dest('./'))
        // Minified version
        .pipe(gulpPlugins.uglify())
        .pipe(gulpPlugins.rename('numberToWords.min.js'))
        .pipe(gulp.dest('./'));
});
