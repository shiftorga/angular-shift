/// <reference path="../_all.ts" />
var angularShift;
(function (angularShift) {
    var shifts;
    (function (shifts) {
        var ListFilterController = (function () {
            function ListFilterController($scope, locationsService) {
                this.services = {
                    'location': null
                };
                this.services.location = locationsService;
                this.$scope = $scope;
                this.$scope.buttons = [];
                this.init();
            }
            ListFilterController.prototype.init = function () {
                var _this = this;
                this.services.location.getAll().then(function (locations) {
                    _.each(locations, function (location) {
                        _this.$scope.buttons.push({ check: true, label: location.Name });
                    });
                });
            };
            return ListFilterController;
        })();
        shifts.ListFilterController = ListFilterController;
        ListFilterController.$inject = ['$scope', 'LocationsService'];
        angular.module('angularShift.shifts').controller('ListFilterController', ListFilterController);
    })(shifts = angularShift.shifts || (angularShift.shifts = {}));
})(angularShift || (angularShift = {}));
