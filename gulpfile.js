(function() {
    "use strict";

    var autoprefixer = require('gulp-autoprefixer'),
        concat       = require('gulp-concat'),
        gulp         = require('gulp'),
        jshint       = require('gulp-jshint'),
        minifycss    = require('gulp-minify-css'),
        notify       = require('gulp-notify'),
        sass         = require('gulp-sass'),
        sourcemaps   = require('gulp-sourcemaps'),
        uglifyjs     = require('gulp-uglify'),
        inject       = require("gulp-inject"),
        file         = require('gulp-file'),
        gutil        = require('gulp-util'),
        gettext      = require('gulp-angular-gettext'),
        gulpCopy     = require('gulp-copy'),
        jscs         = require('gulp-jscs'),
        jscsStylish  = require('gulp-jscs-stylish'),
        ts           = require('gulp-typescript'),
        rename       = require('gulp-rename'),
        karma        = require('karma'),
        karmaParseConfig = require('karma/lib/config').parseConfig,
        path         = require('path'),
        partials     = require('gulp-partial-to-script'),
        paths = {
            src: './src',
            bower: './components',
            dest: './dist',
            tests: './tests'
        },
        applicationPaths = {
            scss: [],
            typescripts: ['./src/**/**.ts', './src/**/*.ts' ,'./src/*.ts'],
            partials: ['./partials/partials/**/*.html']
        },
        bowerComponentPaths = {
            scss: [
                paths.bower + '/bootstrap-sass-only/scss/bootstrap.scss',
                paths.bower + '/angular-toastr/dist/angular-toastr.css',
                paths.bower + '/ladda/dist/ladda-themeless.min.css',
                paths.bower + '/select2/select2.css',
                paths.bower + '/select2-bootstrap-css/select2-bootstrap.css',
                paths.bower + '/fullcalendar/dist/fullcalendar.css'
            ],
            // keep in mind that the order of the components is important
            javascripts: [
                paths.bower + '/jquery/dist/jquery.js',
                paths.bower + '/jquery-ui/jquery-ui.js',
                paths.bower + '/angular/angular.js',
                paths.bower + '/angular-mocks/angular-mocks.js',
                paths.bower + '/angular-ui-router/release/angular-ui-router.js',
                paths.bower + '/angular-bootstrap/ui-boostrap.js',
                paths.bower + '/angular-moment/angular-moment.js',
                paths.bower + '/angular-toastr/dist/angular-toastr.js',
                paths.bower + '/angular-ui-calendar/src/calendar.js',
                paths.bower + '/moment/moment.js',
                paths.bower + '/angular-moment/angular-moment.js',
                paths.bower + '/bootbox/bootbox.js',
                paths.bower + '/bootstrap/dist/js/bootstrap.js',
                paths.bower + '/angular-bootstrap/ui-bootstrap-tpls.js',
                paths.bower + '/bootstrap-datepicker/dist/js/bootstrap-datepicker.js',
                paths.bower + '/bootstrap-multiselect/dist/js/bootstrap-multiselect.js',
                paths.bower + '/lodash/dist/lodash.js',
                paths.bower + '/restangular/dist/restangular.js',
                paths.bower + '/fullcalendar/dist/fullcalendar.js'
            ]
};

    function onJsHintError(file) {
        var errors;
        if (file.jshint.success) {
            // Don't show something if success
            return false;
        }
        errors = file.jshint.results.map(function(data) {
            if (data.error) {
                return "(Line: " + data.error.line + ':' +
                    data.error.character + ') ' + data.error.reason;
            }
        }).join("\n");
        return file.relative + " (" + file.jshint.results.length + "errors)\n" + errors;
}



    gulp.task('build-scripts', function () {
        var tsResult = gulp.src(applicationPaths.typescripts)
            .pipe(sourcemaps.init())
            .pipe(ts({out: 'angular.shifts.js'}))
            .pipe(gulp.dest(paths.dest + '/js'))
            .pipe(sourcemaps.write())
            .pipe(rename('angular.shifts.min.js'))
            .pipe(uglifyjs())
            .pipe(gulp.dest(paths.dest + '/js'));
    });

    gulp.task('build-partials', function () {
        gulp.src(applicationPaths.partials)
            .pipe(partials({
                suffix : ".html",
                ext : ".html"
            }))
            .pipe(concat('angular.shifts.html'))
            .pipe(gulp.dest(paths.dest + '/partials'));
    });

    function runKarma(configFilePath, options, cb) {
        gulp.start('build-scripts');
        configFilePath = path.resolve(configFilePath);

        var server = karma.server;
        var log= gutil.log, colors=gutil.colors;
        var config = karmaParseConfig(configFilePath, {});

        Object.keys(options).forEach(function(key) {
            config[key] = options[key];
        });

        server.start(config, function(exitCode) {
            log('Karma has exited with ' + colors.red(exitCode));
            cb();
            process.exit(exitCode);
        });
    }

    /** single run */
    gulp.task('test', function(cb) {
        runKarma('tests/karma.conf.js', {
            autoWatch: false,
            singleRun: true
        }, cb);
    });

    /** continuous ... using karma to watch (feel free to circumvent that;) */
    gulp.task('test-dev', function(cb) {
        runKarma('tests/karma.conf.js', {
            autoWatch: true,
            singleRun: false
        }, cb);
    });
    gulp.task('css', function() {
        var css = gulp.src('./src/scss/*.scss')
            .pipe(sourcemaps.init())
            .pipe(sass({
                style: 'compressed',
                errLogToConsole: false,
                onError: function(err) {
                    return notify({'title': 'Sass Error'}).write(err);
                }
            }))
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'));

        // minify the css for non development env's
        if (config.env !== 'dev') {
            css.pipe(minifycss({ processImport: false }));
        }

        return css.pipe(concat("styles.css"))
            .pipe(sourcemaps.write('.', {includeContent: false,
                sourceRoot: './scss/'}))
            .pipe(gulp.dest(paths.dest + '/css/'));
    });

    gulp.task('components', function() {
        // CSS und SCSS files
        var javascripts;
        gulp.src((bowerComponentPaths.scss))
            .pipe(sass({
                style: 'compressed',
                errLogToConsole: false,
                onError: function(err) {
                    return notify({'title': 'Sass Error'}).write(err);
                }
            }))
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8',
                'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(minifycss())
            .pipe(concat("vendors.css"))
            .pipe(gulp.dest(paths.dest + '/css/'));

        // Javascript
        javascripts = gulp.src(bowerComponentPaths.javascripts)
            .pipe(sourcemaps.init())
            .pipe(concat("vendors.js"))
            //.pipe(uglifyjs())
            .pipe(gulp.dest(paths.dest + '/js'));
    });

    gulp.task('default', function() {
        gulp.watch(['./src/*.ts', './src/**/*.ts', './src/**/**/*.ts'], ['build-scripts']);
        gulp.watch(['./partials/partials/**/*.html'], ['build-partials'])
    });

    gulp.task('build', ['build-scripts', 'build-partials', 'components']);
})();
