/// <reference path='_all.ts' />
/**
 * The main application file
 *
 * @todo Remove cause its a lib
 *
 * @type {angular.Module}
 */
var angularShift;
(function (angularShift) {
    var locations;
    (function (locations) {
        'use strict';
        angular
            .module('angularShift.locations', [])
            .config(function ($stateProvider) {
            $stateProvider
                .state({
                name: 'locations',
                url: '/locations',
                abstract: true,
                views: { content: { templateUrl: "partials/shifts/shifts.html" } }
            })
                .state({
                name: 'locations.edit',
                url: "/edit/{id:int}",
                views: {
                    edit: {
                        templateUrl: "partials/shifts/location_edit.html",
                        controller: "LocationEditController",
                        controllerAs: 'locationEdit'
                    },
                }
            });
        });
    })(locations = angularShift.locations || (angularShift.locations = {}));
})(angularShift || (angularShift = {}));
