/// <reference path="../_all.ts" />

module angularShift.shifts {
    export class ListFilterController {
        private services = {
            'location': null
        };
        private $scope;

        constructor ($scope, locationsService: angularShift.locations.LocationsService) {
            this.services.location = locationsService;
            this.$scope = $scope;
            this.$scope.buttons = [];
            this.init();
        }

        private init () {
            this.services.location.getAll().then((locations) => {
                _.each(locations, (location: angularShift.locations.LocationInterface) => {
                    this.$scope.buttons.push({check: true, label: location.Name})
                });
            });
        }
    }
    ListFilterController.$inject = ['$scope', 'LocationsService'];
    angular.module('angularShift.shifts').controller('ListFilterController', ListFilterController);
}
