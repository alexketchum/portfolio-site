var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    cssnano      = require('gulp-cssnano'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    browsersync  = require('browser-sync');

// start browsersync
gulp.task('browserSync', function() {
    browsersync({
        server: {
            baseDir: 'app'
        }   
    })
});

//create workflow task
gulp.task('workflow', function() {
    gulp.src('./app/sass/**/*.scss')
        .pipe(sourcemaps.init()) // initiate sourcemaps
        .pipe(sass({
            includePaths: ["node_modules"]
        }).on('error', sass.logError)) // initiate sass with error logging
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        })) // autoprefix to last two browser versions
        .pipe(cssnano()) // set up minifying
        .pipe(sourcemaps.write('./')) // write sourcemaps
    .pipe(gulp.dest('./app/css/'))
    // refresh
    .pipe(browsersync.reload({
        stream: true
    }));
});


gulp.task('default', gulp.series('browserSync', 'workflow', function() {
    gulp.watch('./app/sass/**/*.scss', ['workflow']);
    gulp.watch('./app/index.html', function() {
        browsersync.reload();
    });
}));