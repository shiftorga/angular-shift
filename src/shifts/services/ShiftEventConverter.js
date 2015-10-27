/// <reference path='../_all.ts' />
var angularShift;
(function (angularShift) {
    var shifts;
    (function (shifts) {
        var ShiftEventConverter = (function () {
            function ShiftEventConverter() {
            }
            ShiftEventConverter.prototype.toEvent = function (shift) {
                var startDate = new Date();
                startDate.setTime(shift.start * 1000);
                var endDate = new Date();
                endDate.setTime(shift.end * 1000);
                return {
                    title: !_.isUndefined(shift.title) ? shift.title + '(' + shift.shiftType.name + ')' : shift.shiftType.name,
                    start: startDate,
                    end: endDate,
                    shiftValues: shift
                };
            };
            return ShiftEventConverter;
        })();
        shifts.ShiftEventConverter = ShiftEventConverter;
        angular.module('angularShift.shifts').service('ShiftsEventConverterService', ShiftEventConverter);
    })(shifts = angularShift.shifts || (angularShift.shifts = {}));
})(angularShift || (angularShift = {}));
