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
    var shiftTypes;
    (function (shiftTypes) {
        'use strict';
        angular
            .module('angularShift.shiftTypes', [])
            .config(function ($stateProvider) {
            $stateProvider
                .state({
                name: 'shiftType',
                url: '/shift_type',
                abstract: true,
                views: { content: { templateUrl: "partials/shifts/shifts.html" } }
            })
                .state({
                name: 'shiftType.edit',
                url: "/edit/{id:int}",
                views: {
                    edit: {
                        templateUrl: "partials/shifts/shift_type_edit.html",
                        controller: "ShiftTypeEditController",
                        controllerAs: 'shiftTypeEdit'
                    },
                }
            });
        });
    })(shiftTypes = angularShift.shiftTypes || (angularShift.shiftTypes = {}));
})(angularShift || (angularShift = {}));
