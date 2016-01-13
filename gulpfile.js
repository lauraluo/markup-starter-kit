var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    spritesmith = require("gulp.spritesmith"),
    minifyCSS = require('gulp-minify-css'),
    plumber = require('gulp-plumber'),
    jade = require('gulp-jade'),
    gulpkss = require('gulp-kss'),
    less = require('gulp-less'),
    connect = require('gulp-connect'),
    clean = require('gulp-clean');

// // LESS for gulp-kss
// gulp.task('less', function() {
//     gulp.src('styleguide/template/public/*.less')
//         .pipe(less())
//         .pipe(gulp.dest('styleguide/public'));
// });

// // KSS
// gulp.task('kss', function() {
//     gulp.src([
//             'styleguide/public/script.js'
//         ], {
//             read: false
//         })
//         .pipe(clean({
//             force: true
//         }));

//     gulp.src(['src/scss/**/*.scss'])
//         .pipe(gulpkss({
//             overview: 'styleguide/styleguide.md', //Absolute path to markdown file which is used for styleguide home page
//             templateDirectory: 'styleguide/template'
//                 // kss: Options supported by KSS-Node (https://github.com/hughsk/kss-node)
//         }))
//         .pipe(gulp.dest('styleguide/'));

//     gulp.src(['src/scss/**/*.scss'])
//         .pipe(sass({
//             style: 'expanded'
//         }))
//         .pipe(autoprefixer({
//             browsers: ["last 4 versions", "Firefox >= 27", "Blackberry >= 7", "IE 8", "IE 9"],
//             cascade: false
//         }))
//         .pipe(gulp.dest('styleguide/public'));

//     //Add any styleguide images
//     gulp.src('dist/images/**/*')
//         .pipe(gulp.dest('styleguide/images/'));
//     gulp.src('src/sprite/**/*')
//         .pipe(gulp.dest('styleguide/public/icon/'));

//     //Add any styleguide JS files
//     gulp.src('dist/js/**')
//         .pipe(gulp.dest('styleguide/public/'));
// });

// // Sass
gulp.task('sass', function() {
    gulp.src(['src/scss/*.scss', '!src/scss/_*.scss'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ["last 4 versions", "Firefox >= 27", "Blackberry >= 7", "IE 8", "IE 9"],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css/'))
        .pipe(connect.reload());

});

// CSS Sprite
gulp.task('sprite', function() {
    var spriteData = gulp.src('src/sprite/*.png')
        .pipe(plumber())
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: '_sprite.scss',
            imgPath: '../images/sprite.png'
        }));
    spriteData.img.pipe(gulp.dest('dist/images'));
    spriteData.css.pipe(gulp.dest('dist/css/'));
});

// Jade
gulp.task('jade', function() {
    gulp.src(['src/*.jade', '!src/_*.jade'])
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});

//Sever
gulp.task('connectDist', function() {
    connect.server({
        root: 'dist',
        port: 3000,
        livereload: true
    });
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
    // gulp.watch('src/dev-js/**', ['copy']);
});

// Minify CSS
// gulp.task('minify-css', function() {
//     gulp.src('dist/css/*.css')
//         .pipe(minifyCSS())
//         .pipe(gulp.dest('dist/css/'));
// });

// Copy
// gulp.task('copy', function() {
//     gulp.src([
//             'src/dev-js/**'
//         ])
//         .pipe(gulp.dest('dist/js'));
// });

// // Concat
// gulp.task('concat', function() {
//     gulp.src([
//             'src/dev-js/jquery-ui.min.js',
//             'src/dev-js/jquery.ui.datepicker-ja.js'
//         ])
//         .pipe(concat("jquery.datepicker.js"))
//         .pipe(gulp.dest('dist/js'));
// });

// //Uglify
// gulp.task('compress', function() {
//     gulp.src([
//             'dist/js/**/*'
//         ])
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'));
// });

// // Image
// gulp.task('img', function() {
//     gulp.run('sprite');
// });

// // Deploy Task
// gulp.task('deploy', function() {
//     gulp.run('minify-css', 'compress');
// });

// // Release Task
// gulp.task('release', function() {
//     gulp.run('concat');
// });


// Default Task
gulp.task('default', function() {
    gulp.run('connectDist');
    gulp.run('watch');
});

