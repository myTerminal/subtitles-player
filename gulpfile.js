/* global require */

var gulp = require('gulp'),
    copy = require('gulp-copy'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    cleanCSS = require('gulp-cleancss'),
    watchNow = require ('gulp-watch-now');

gulp.task('copy', function () {
    return gulp.src(['src/fonts/**/*.*'])
        .pipe(copy('build/fonts', { prefix: 4 }));
});

gulp.task('scripts-debug', function () {
    return browserify({
        entries: 'src/scripts/main.js',
        debug: true
    })
        .bundle()
        .pipe(source('subtitles-player.js'))
        .pipe(buffer())
        .pipe(gulp.dest('build/scripts'));
});

gulp.task('scripts', function () {
    return browserify({
        entries: 'src/scripts/main.js',
        debug: true
    })
        .transform("babelify", { presets: ["env"] })
        .bundle()
        .pipe(source('subtitles-player.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('build/scripts'));
});

gulp.task('styles', function () {
    return gulp.src('src/styles/**/*.less')
        .pipe(less())
        .pipe(concat('subtitles-player.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('build/styles'));
});

gulp.task('debug', [
    'copy',
    'scripts-debug',
    'styles'
]);

gulp.task('build', [
    'copy',
    'scripts',
    'styles'
]);

gulp.task('develop', function () {
    watchNow.watch(gulp, [
        'src/styles/**/*.less'
    ], [
        'styles'
    ]);

    watchNow.watch(gulp, [
        'src/scripts/**/*.js'
    ], [
        'scripts-debug'
    ]);
});

gulp.task('default', ['build']);
