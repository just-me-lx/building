const gulp = require('gulp');
const less = require('gulp-less');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

gulp.task('clean', async function() {
    await del.sync('build');
});

// gulp.series 用于串行（顺序）执行
// gulp.parallel 用于并行执行
// 可看https://zhuanlan.zhihu.com/p/396454637?utm_id=0
gulp.task('less', async function() {
    await gulp.src('src/**/*.less', [{allowEmpty: true}])
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 5 versions', 'Firefox > 20'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('build'));
});

gulp.task('default', gulp.series('clean', 'less'));

gulp.task('watch', () => {
    const watcher = gulp.watch('src/**/*', gulp.series('default'));
    watcher.on('change', event => {
        console.log('File ' + event.path + ' was ' + event.type);
    })
})