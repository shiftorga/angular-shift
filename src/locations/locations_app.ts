/// <reference path='_all.ts' />

/**
 * The main application file
 *
 * @todo Remove cause its a lib
 *
 * @type {angular.Module}
 */
module angularShift.locations {
    'use strict';

    angular
        .module('angularShift.locations', [])
        .config(function($stateProvider) {
            $stateProvider
                .state({
                    name: 'locations',
                    url: '/locations',
                    abstract: true,
                    views: {content: {templateUrl: "partials/shifts/shifts.html"}}
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
                })
            ;
        })
    ;
}
