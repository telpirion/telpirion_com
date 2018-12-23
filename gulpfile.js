/**
 * Build config for Telpirion.com site.
 *
 * @author Eric Schmidt
 * @version 1.0 2018/12/23
 * @copyright Eric Schmidt
 */
var gulp = require('gulp'),
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

gulp.task('post', () => {
    return del(['my-app/dist/*']);
});

gulp.task('build',
    gulp.series('pre', 'ng-build', 'copy-prod', 'post'));
