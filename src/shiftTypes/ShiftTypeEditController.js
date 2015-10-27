/// <reference path='_all.ts' />
var angularShift;
(function (angularShift) {
    var shifts;
    (function (shifts) {
        var ShiftTypeEditController = (function () {
            function ShiftTypeEditController(notificationService, $state, service) {
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
            ShiftTypeEditController.prototype.init = function () {
                var _this = this;
                var shiftTypeId = this.$state.params.id;
                this.notificationService.warning('WORK IN PROGRESS', 'This feature isn`t implemented yet. Use <a href="/?p=user_shifts&edit_shift=' + shiftTypeId + '">Link (edit shift type)</a> instead');
                this.service.getById(shiftTypeId).then(function (shiftType) {
                    _this.shiftType = shiftType;
                    _this.notificationService.success('SUCCESS', 'Successfully loaded resource ' + shiftType.name);
                }, function (error) {
                    _this.notificationService.error('ERROR', 'Not able to fetch resource');
                });
            };
            return ShiftTypeEditController;
        })();
        shifts.ShiftTypeEditController = ShiftTypeEditController;
        ShiftTypeEditController.$inject = ['NotificationService', '$state', 'ShiftTypesService'];
        angular.module('angularShift.shifts').controller('ShiftTypeEditController', ShiftTypeEditController);
    })(shifts = angularShift.shifts || (angularShift.shifts = {}));
})(angularShift || (angularShift = {}));
