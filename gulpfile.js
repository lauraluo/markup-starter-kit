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
    clean = require('gulp-clean'),
    open = require('gulp-open');

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

//Copy
gulp.task('copyJS', function() {
    gulp.src(['src/js/**'])
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copyImg', function() {
    gulp.src(['src/images/**'])
        .pipe(gulp.dest('dist/images'));
});

gulp.task('copyAll', ['copyJS', 'copyImg'], function() {});

//Clean
gulp.task('reset', function() {
    gulp.src(['dist/'])
        .pipe(clean());
});


//Open
gulp.task('open', function() {
    gulp.src(__filename)
        .pipe(open({
            uri: 'http://localhost:3000',
            app: 'firefox'
        }));
});

// Watch
gulp.task('watch', function() {
    gulp.watch(['src/*.jade'], ['jade']);
    gulp.watch('src/scss/**', ['sass']);
    gulp.watch(['src/js/**'], ['copyJS']);
    gulp.watch(['src/images/**'], ['copyImg']);
});

//Build
gulp.task('build', ['jade', 'sass', 'copyAll'], function() {});

//Group Dev
gulp.task('dev', ['build', 'connectDist', 'watch', 'open'], function() {});

// Default  Task
gulp.task('default', ['dev'], function() {});
