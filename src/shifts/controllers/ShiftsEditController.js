/// <reference path='../_all.ts' />
var angularShift;
(function (angularShift) {
    var shifts;
    (function (shifts) {
        var ShiftsEditController = (function () {
            function ShiftsEditController(notificationService, $state, shiftService) {
                this.notificationService = notificationService;
                this.$state = $state;
                this.shiftsService = shiftService;
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
            ShiftsEditController.prototype.init = function () {
                var _this = this;
                var shiftId = this.$state.params.id;
                this.notificationService.warning('WORK IN PROGRESS', 'This feature isn`t implemented yet. Use <a href="/?p=user_shifts&edit_shift=' + shiftId + '">Link (edit shift)</a> instead');
                this.shiftsService.getById(shiftId).then(function (shift) {
                    _this.shift = shift;
                });
            };
            return ShiftsEditController;
        })();
        shifts.ShiftsEditController = ShiftsEditController;
        ShiftsEditController.$inject = ['NotificationService', '$state', 'ShiftsService'];
        angular.module('angularShift.shifts').controller('ShiftsEditController', ShiftsEditController);
    })(shifts = angularShift.shifts || (angularShift.shifts = {}));
})(angularShift || (angularShift = {}));
