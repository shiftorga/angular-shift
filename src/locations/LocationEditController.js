/// <reference path='_all.ts' />
var angularShift;
(function (angularShift) {
    var locations;
    (function (locations) {
        var LocationEditController = (function () {
            function LocationEditController(notificationService, $state, service) {
                this.notificationService = notificationService;
                this.$state = $state;
                this.service = service;
                this.init();
            }
            /**
             * ToDos
             * - get shift types list by service
             * - get locations list by service
             * - start/end -> form type with day + time
             * - needed Angeltypes in directive
             * - save on click
             */
            LocationEditController.prototype.init = function () {
                var _this = this;
                var locationId = this.$state.params.id;
                this.notificationService.warning('WORK IN PROGRESS', 'This feature isn`t implemented yet. Use <a href="/?p=user_shifts&edit_shift=' + locationId + '">Link (edit location)</a> instead');
                this.service.getById(locationId).then(function (location) {
                    _this.location = location;
                    _this.notificationService.success('SUCCESS', 'Successfully loaded resource ' + location.Name);
                }, function (error) {
                    _this.notificationService.error('ERROR', 'Not able to fetch resource');
                });
            };
            return LocationEditController;
        })();
        locations.LocationEditController = LocationEditController;
        LocationEditController.$inject = ['NotificationService', '$state', 'LocationsService'];
        angular.module('angularShift.shifts').controller('LocationEditController', LocationEditController);
    })(locations = angularShift.locations || (angularShift.locations = {}));
})(angularShift || (angularShift = {}));
