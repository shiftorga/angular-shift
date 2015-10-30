module.exports = function(config){
    'use strict';

    config.set({

        basePath: '../',

        files: [
            'dist/vendors.js',

            'dist/angular.shifts.js',


            'tests/unit/**/*.js',
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
