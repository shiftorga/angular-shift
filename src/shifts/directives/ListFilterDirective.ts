/// <reference path="../_all.ts" />

module angularShift.shifts {

    angular.module('angularShift.shifts')
        .directive('listFilter', function () {
           return {
               'restrict': 'E',
               'templateUrl': 'partials/shifts/list_filter.html',
               'scope': {
                   type: '@'
               },
               link: ($scope, element, attr) => {

               },
               'controller': 'ListFilterController'
            };
        });
}
