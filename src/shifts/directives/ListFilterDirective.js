/// <reference path="../_all.ts" />
var angularShift;
(function (angularShift) {
    var shifts;
    (function (shifts) {
        angular.module('angularShift.shifts')
            .directive('listFilter', function () {
            return {
                'restrict': 'E',
                'templateUrl': 'partials/shifts/list_filter.html',
                'scope': {
                    type: '@'
                },
                link: function ($scope, element, attr) {
                },
                'controller': 'ListFilterController'
            };
        });
    })(shifts = angularShift.shifts || (angularShift.shifts = {}));
})(angularShift || (angularShift = {}));
