module.exports = function(config){
    'use strict';

    config.set({

        basePath: '../',

        files: [
            'components/angular/angular.js',
            'components/angular-mocks/angular-mocks.js',
            'components/lodash/dist/lodash.min.js',
            'components/restangular/dist/restangular.js',

            'src/app.js',
            'src/**/*_app.js',
            'src/**/**/*.js',
            'src/**/*.js',
            'src/*.js',

            'tests/fakeApi/*.js',

            'tests/unit/**/*.js',
            'tests/integration/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Firefox'],

        plugins: [
            'karma-firefox-launcher',
            'karma-story-reporter',
            'karma-jasmine'
        ],

        reporters: ['story'],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};
