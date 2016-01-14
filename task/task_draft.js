
//Minify CSS
gulp.task('minify-css', function() {
    gulp.src('dist/css/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css/'));
});

// Concat
gulp.task('concat', function() {
    gulp.src([
            'src/dev-js/jquery-ui.min.js',
            'src/dev-js/jquery.ui.datepicker-ja.js'
        ])
        .pipe(concat("jquery.datepicker.js"))
        .pipe(gulp.dest('dist/js'));
});


//Uglify
gulp.task('compress', function() {
    gulp.src([
            'dist/js/**/*'
        ])
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Image
gulp.task('img', function() {
    gulp.run('sprite');
});

// Deploy Task
gulp.task('deploy', function() {
    gulp.run('minify-css', 'compress');
});

// Release Task
gulp.task('release', function() {
    gulp.run('concat');
});

// Watch
gulp.task('watch', function() {
    gulp.watch(['src/*.jade'], ['jade']);
    gulp.watch('src/scss/**', ['sass']);
    // gulp.watch(['dist/*.html','dist/css/*.css'], ['reload']);//reload
    // gulp.watch('src/sprite/*', ['sprite']);
    // gulp.watch(['src/scss/**'], ['kss']);
    // gulp.watch('src/dev-js/**', ['concat']);
    // gulp.watch('styleguide/template/public/**', ['less']);
    gulp.watch(['src/js/**', 'src/images/**'], ['copy']);
});