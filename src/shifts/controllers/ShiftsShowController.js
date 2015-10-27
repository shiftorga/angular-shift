/// <reference path='../_all.ts' />
var angularShift;
(function (angularShift) {
    var shifts;
    (function (shifts) {
        var ShiftsShowController = (function () {
            function ShiftsShowController($state, shiftsService, notificationService, confirmationService) {
                this.dateValues = {
                    dateStart: null,
                    dateEnd: null,
                    timeStart: null,
                    timeEnd: null
                };
                this.shiftsService = shiftsService;
                this.$state = $state;
                this.notificationService = notificationService;
                this.confirmation = confirmationService;
                this.init();
            }
            ShiftsShowController.prototype.init = function () {
                var _this = this;
                var shiftid = this.$state.params.id;
                this.shiftsService.getById(shiftid).then(function (shift) {
                    _this.shift = shift;
                    _this.dateValues = {
                        dateStart: moment(shift.start, 'X').format('YYYY-M-DD'),
                        dateEnd: moment(shift.end, 'X').format('YYYY-M-DD'),
                        timeStart: moment(shift.start, 'X').format('HH:mm'),
                        timeEnd: moment(shift.end, 'X').format('HH:mm')
                    };
                });
            };
            ShiftsShowController.prototype.countShiftEntriesForAngelType = function (shift, angelTypeId) {
                var count = 0;
                _.each(shift.shiftEntries, function (entry) {
                    if (entry.angelType.id === angelTypeId) {
                        count++;
                    }
                });
                return count;
            };
            ShiftsShowController.prototype.getPercentage = function (now, max) {
                var relation = now / max * 100;
                return Math.round(relation);
            };
            ShiftsShowController.prototype.deleteShift = function (shift) {
                var _this = this;
                this.confirmation.confirm({ message: 'Do you really want to delete the shift <b>' + this.buildLabel(shift) + '</b>' }, function () {
                    _this.shiftsService.remove(shift).then(function () {
                        _this.$state.go('shift.calendar');
                    }, function (error) {
                        console.log(error);
                        _this.notificationService.error('Failed to delete ...', 'Errors while trying to delete shift <b>' + _this.buildLabel(shift) + '</b>');
                    });
                });
            };
            ShiftsShowController.prototype.buildLabel = function (shift) {
                var title = !_.isUndefined(shift.title) && '' !== shift.title && null !== shift.title ? shift.title : null;
                return (null === title) ? shift.shiftType.name : title + ' (' + shift.shiftType.name + ')';
            };
            return ShiftsShowController;
        })();
        shifts.ShiftsShowController = ShiftsShowController;
        ShiftsShowController.$inject = ['$state', 'ShiftsService', 'NotificationService', 'ConfirmationService'];
        angular.module('angularShift.shifts').controller('ShiftsShowController', ShiftsShowController);
    })(shifts = angularShift.shifts || (angularShift.shifts = {}));
})(angularShift || (angularShift = {}));
