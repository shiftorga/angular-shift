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
    var shifts;
    (function (shifts) {
        'use strict';
        angular
            .module('angularShift.shifts', ['ui.calendar', 'ui.router'])
            .config(function ($stateProvider) {
            $stateProvider
                .state({
                name: 'shifts',
                url: '/user_shifts',
                abstract: true,
                views: { content: { templateUrl: "partials/shifts/shifts.html" } }
            })
                .state({
                name: 'shifts.calendar',
                url: "/calendar",
                views: {
                    main: {
                        templateUrl: "partials/shifts/calendar.html",
                        controller: "ShiftsOnCalendarController",
                        controllerAs: 'shiftsOnCalendar'
                    }
                }
            })
                .state({
                name: 'shifts.show',
                url: "/show/{id}",
                views: {
                    main: {
                        templateUrl: "partials/shifts/show.html",
                        controller: "ShiftsShowController",
                        controllerAs: 'shiftShow'
                    }
                }
            })
                .state({
                name: 'shifts.edit',
                url: "/edit/{id:int}",
                views: {
                    edit: {
                        templateUrl: "partials/shifts/edit.html",
                        controller: "ShiftsEditController",
                        controllerAs: 'shiftEdit'
                    },
                }
            });
        });
    })(shifts = angularShift.shifts || (angularShift.shifts = {}));
})(angularShift || (angularShift = {}));
