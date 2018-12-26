/**
 * Build config for Telpirion.com site.
 *
 * @author Eric Schmidt
 * @version 1.0 2018/12/23
 * @copyright Eric Schmidt
 */
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    del = require('del'),
    exec = require('child_process').exec;

gulp.task('pre', () => {
    return del(['ng/*']);
});

gulp.task('ng-build', (cb) => {
    exec('cd my-app && ng build --prod', (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('copy-prod', () => {
    return gulp.src('my-app/dist/my-app/*.*')
        .pipe(gulp.dest('ng'));
});

gulp.task('copy-images', () => {
    return gulp.src('my-app/dist/my-app/assets/images/*.*')
        .pipe(gulp.dest('images'));
});

gulp.task('yahtzy', () => {
    return gulp.src([
        'games/yahtzy/src/game.js',
        'games/yahtzy/src/robot.js',
        'games/yahtzy/src/ui-controllers.js',
        'games/yahtzy/src/utilities.js',
        'games/yahtzy/src/main.js'
    ])
    .pipe(concat('yahtzy.js'))
    .pipe(uglify().on('error', (e) => {
        console.log(e);
    }))
    .pipe(gulp.dest('games/yahtzy'));
});

gulp.task('conway', () => {
    return gulp.src([
        'games/conway/src/game.js',
        'games/conway/src/ui.js',
        'games/conway/src/main.js'
    ])
    .pipe(concat('conway.js'))
    .pipe(uglify().on('error', (e) => {
        console.log(e);
    }))
    .pipe(gulp.dest('games/conway'));
});

gulp.task('vikings', () => {
    return gulp.src([
        'games/vikings/src/animation.js',
        'games/vikings/src/physics.js',
        'games/vikings/src/page.js',
        'games/vikings/src/main.js'
    ])
    .pipe(concat('vikings.js'))
    .pipe(uglify().on('error', (e) => {
        console.log(e);
    }))
    .pipe(gulp.dest('games/vikings'));
});

gulp.task('post', () => {
    return del(['my-app/dist']);
});

gulp.task('build',
    gulp.series('pre', 'ng-build', 'copy-prod', 'copy-images', 'post'));
