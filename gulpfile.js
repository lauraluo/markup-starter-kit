const gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    spritesmith = require('gulp.spritesmith'),
    minifyCSS = require('gulp-minify-css'),
    plumber = require('gulp-plumber'),
    jade = require('gulp-jade'),
    connect = require('gulp-connect'),
    clean = require('gulp-clean'),
    open = require('gulp-open'),
    vueify = require('gulp-vueify'),
    babel = require('gulp-babel');
// browserify = require('gulp-browserify');
var envify = require('envify/custom');

var babelify = require('babelify');
var extend = require('extend');
var parseArgs = require('minimist');
var watchify = require('watchify');

var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var assign = require('lodash.assign');

var config = extend(
    {
        env: process.env.NODE_ENV
    },
    parseArgs(process.argv.slice(2))
);

// // Sass
gulp.task('sass', function() {
    gulp
        .src(['src/scss/**/*.scss', '!src/scss/**/_*.scss'])
        .pipe(plumber())
        .pipe(
            sass({
                errLogToConsole: true,
                outputStyle: 'compressed',
                includePaths: ['src/scss/**/**']
            })
        )
        .pipe(
            autoprefixer({
                browsers: ['last 4 versions', 'Firefox >= 27', 'Blackberry >= 7', 'IE 8', 'IE 9'],
                cascade: false
            })
        )
        .pipe(gulp.dest('dist/css/'))
        .pipe(connect.reload());
});

// CSS Sprite
gulp.task('sprite', function() {
    var spriteData = gulp.src('src/images/sprites/**/*.png').pipe(
        spritesmith({
            imgName: 'sprite.png',
            cssName: '_sprite.scss',
            padding: 10,
            exportOpts: { quality: 100 },
            cssTemplate: function(data) {
                var output = '';
                var v = Math.random();
                data.sprites.forEach(function(sprite) {
                    output += [
                        '.' + sprite.name + ' {\n',
                        '  display: block;\n',
                        '  background-image: url(../images/' + sprite.image + '?v=' + v + ');\n',
                        '  background-position: ' +
                            sprite.px.offset_x +
                            ' ' +
                            sprite.px.offset_y +
                            ';\n',
                        '  width:' + sprite.px.width + ';\n',
                        '  height: ' + sprite.px.height + ';\n',
                        '/*source-image:' + sprite.source_image + '*/\n',
                        '}\n',
                        '%' + sprite.name + ' {\n',
                        '  display: block;\n',
                        '  background-image: url(../images/' + sprite.image + '?v=' + v + ');\n',
                        '  background-position: ' +
                            sprite.px.offset_x +
                            ' ' +
                            sprite.px.offset_y +
                            ';\n',
                        '  width:' + sprite.px.width + ';\n',
                        '  height: ' + sprite.px.height + ';\n',
                        '/*source-image:' + sprite.source_image + '*/\n',
                        '}\n',
                        '@mixin ' + sprite.name + '() {\n',
                        '  display: block;\n',
                        '  background-image: url(../images/' + sprite.image + '?v=' + v + ');\n',
                        '  background-position: ' +
                            sprite.px.offset_x +
                            ' ' +
                            sprite.px.offset_y +
                            ';\n',
                        '  width:' + sprite.px.width + ';\n',
                        '  height: ' + sprite.px.height + ';\n',
                        '/*source-image:' + sprite.source_image + '*/\n',
                        '}\n'
                    ].join('');
                });
                return output;
            }
        })
    );

    spriteData.img.pipe(gulp.dest('dist/images'));
    spriteData.css.pipe(gulp.dest('src/scss/'));
});

gulp.task('spritex2', function() {
    var spriteData = gulp.src('src/images/spritesx2/**/*.png').pipe(
        spritesmith({
            imgName: 'spritex2.png',
            cssName: '_spritex2.scss',
            padding: 10,
            exportOpts: { quality: 100 },
            algorithm: 'left-right',
            cssTemplate: function(data) {
                var output = '';
                var v = Math.random();
                data.sprites.forEach(function(sprite) {
                    var total_width = sprite.total_width;
                    output += [
                        '.' + sprite.name + ' {\n',
                        '  display: block;\n',
                        '  background-image: url("../images/' + sprite.image + '?v=' + v + '");\n',
                        '  background-position: ' +
                            Math.round(sprite.offset_x / 2) +
                            'px ' +
                            Math.round(sprite.offset_y / 2) +
                            'px;\n',
                        '  background-size: ' + Math.round(total_width/2) +'px auto;\n',
                        '  width:' + Math.round(sprite.width/2) + 'px;\n',
                        '  height: ' + Math.round(sprite.height/2) + 'px;\n',
                        '/*source-image:' + sprite.source_image + '*/\n',
                        '}\n',
                        '%' + sprite.name + ' {\n',
                        '  display: block;\n',
                        '  background-image: url("../images/' + sprite.image + '?v=' + v + '");\n',
                        '  background-position: ' +
                            Math.round(sprite.offset_x / 2) +
                            'px ' +
                            Math.round(sprite.offset_y / 2) +
                            'px;\n',
                        '  background-size: ' + Math.round(total_width/2) +'px auto;\n',
                        '  width:' + Math.round(sprite.width/2) + 'px;\n',
                        '  height: ' + Math.round(sprite.height/2) + 'px;\n',
                        '/*source-image:' + sprite.source_image + '*/\n',
                        '}\n',
                        '@mixin ' + sprite.name + '() {\n',
                        '  display: block;\n',
                        '  background-image: url("../images/' + sprite.image + '?v=' + v + '");\n',
                        '  background-position: ' +
                            Math.round(sprite.offset_x / 2) +
                            'px ' +
                            Math.round(sprite.offset_y / 2) +
                            'px;\n',
                        '  background-size: ' + Math.round(total_width/2) +'px auto;\n',
                        '  width:' + Math.round(sprite.width/2) + 'px;\n',
                        '  height: ' + Math.round(sprite.height/2) + 'px;\n',
                        '/*source-image:' + sprite.source_image + '*/\n',
                        '}\n'
                    ].join('');
                });
                return output;
            }
        })
    );

    spriteData.img.pipe(gulp.dest('dist/images'));
    spriteData.css.pipe(gulp.dest('src/scss/'));


});

// Jade
gulp.task('jade', function() {
    gulp
        .src(['src/*.jade', '!src/_*.jade'])
        .pipe(plumber())
        .pipe(
            jade({
                pretty: true
            })
        )
        .pipe(gulp.dest('dist/'));
});

gulp.task('html', function() {
    gulp.src('dist/*.html').pipe(connect.reload());
});

gulp.task('bundleReload', function() {
    gulp.src('dist/bundle.js').pipe(connect.reload());
});

//Sever
gulp.task('connectDist', function() {
    connect.server({
        root: 'dist',
        port: 3001,
        livereload: true
    });
});

gulp.task('scripts', function() {
    gulp
        .src('src/main.js')
        .pipe(
            browserify({
                insertGlobals: true,
                debug: true
            })
        )
        .pipe(gulp.dest('./dist/'));
});

var customOpts = {
    entries: ['./src/main.js'],
    debug: true
};
var opts = assign({}, watchify.args, customOpts);

var b = watchify(
    browserify(opts)
        .transform({ global: true }, envify({ NODE_ENV: 'production' }))
        .transform('uglifyify', { global: true  })
);

gulp.task('bundleJs', bundle);
b.on('update', bundle);
b.on('log', gutil.log);

function bundle() {
    return b
        .bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: false })) // loads map from browserify file
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest('./dist'));
}


//assets

gulp.task('copyImg', function() {
    gulp.src(['src/images/*', '!src/images/sprite']).pipe(gulp.dest('dist/images'));
});

gulp.task('copyAssets', function() {
    gulp.src(['src/assets/**']).pipe(gulp.dest('dist/assets'));
});

gulp.task('copyAll', ['copyImg', 'copyAssets'], function() {});

//Clean
gulp.task('reset', function() {
    gulp.src(['dist/']).pipe(clean());
});

//Open
gulp.task('open', function() {
    gulp.src(__filename).pipe(
        open({
            uri: 'http://localhost:3001',
            app: 'google-chrome'
        })
    );
});

// Watch
gulp.task('watch', function() {
    gulp.watch(['src/*.jade'], ['jade']);
    gulp.watch('src/scss/**/**.scss', ['sass']);
    gulp.watch(['src/images/*'], ['copyImg']);
    gulp.watch(['src/images/sprites/*'], ['sprite']);
    gulp.watch(['src/images/spritesx2/*'], ['spritex2']);
    gulp.watch(['dist/*.html'], ['html']);
    gulp.watch(['dist/bundle.js'], ['bundleReload']);
});

gulp.task('set-dev-node-env', function() {
    return (process.env.NODE_ENV = config.env = 'development');
});

gulp.task('set-prod-node-env', function() {
    return (process.env.NODE_ENV = config.env = 'production');
});

//Build
gulp.task('build', ['bundleJs', 'sprite','spritex2', 'jade', 'sass', 'copyAll'], function() {});

//Group Dev
gulp.task('dev', ['set-dev-node-env', 'build', 'connectDist', 'watch', 'open'], function() {});
gulp.task('public', ['build'], function() {});

//Default  Task
gulp.task('default', ['dev'], function() {});
