const { all } = require('core-js/fn/promise');

/**
 * Build config for Telpirion.com site.
 *
 * @author Eric Schmidt
 * @version 1.0 2018/12/23
 * @copyright Eric Schmidt
 */
const gulp = require('gulp'),
    dom = require('gulp-dom'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    del = require('del'),
    exec = require('child_process').exec;

gulp.task('pre', () => {
    return del(['ng/*']);
});

gulp.task('ng-build', (cb) => {
    exec('ng build --configuration production', (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('yahtzy', () => {
    return gulp.src([
        'gsrc/yahtzy/src/game.js',
        'gsrc/yahtzy/src/robot.js',
        'gsrc/yahtzy/src/ui-controllers.js',
        'gsrc/yahtzy/src/utilities.js',
        'gsrc/yahtzy/src/main.js'
    ])
    .pipe(concat('yahtzy.js'))
    .pipe(uglify().on('error', (e) => {
        console.log(e);
    }))
    .pipe(gulp.dest('games/yahtzy'));
});

gulp.task('conway', () => {
    return gulp.src([
        'gsrc/conway/src/game.js',
        'gsrc/conway/src/ui.js',
        'gsrc/conway/src/main.js'
    ])
    .pipe(concat('conway.js'))
    .pipe(uglify().on('error', (e) => {
        console.log(e);
    }))
    .pipe(gulp.dest('games/conway'));
});

gulp.task('vikings', () => {
    return gulp.src([
        'gsrc/vikings/src/animation.js',
        'gsrc/vikings/src/physics.js',
        'gsrc/vikings/src/page.js',
        'gsrc/vikings/src/main.js'
    ])
    .pipe(concat('vikings.js'))
    .pipe(uglify().on('error', (e) => {
        console.log(e);
    }))
    .pipe(gulp.dest('games/vikings'));
});

gulp.task('post', () => {
    return gulp.src('./ng/index.html')
        .pipe(dom(function () {
            return this.querySelectorAll('script')
                .forEach(script => {
                    script.setAttribute('defer', 'true');
                });
        }))
        .pipe(gulp.dest('./ng/'));
});

gulp.task('build',
    gulp.series('pre', 'ng-build',  'yahtzy', 'conway', 'vikings', 'post'));
