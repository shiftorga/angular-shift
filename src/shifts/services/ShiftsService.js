/// <reference path='../_all.ts' />
var angularShift;
(function (angularShift) {
    var shifts;
    (function (shifts) {
        'use strict';
        var ShiftsService = (function () {
            function ShiftsService(restangular, shiftEntriesService) {
                this.Resource = restangular.service('shifts');
                this.Restangular = restangular;
                this.shiftEntriesService = shiftEntriesService;
            }
            /**
             * Return a list of shift.
             *
             * The list will be fetched from the local memory when exists, otherwise
             * an api call is triggered.
             *
             * @returns $bluebird
             */
            ShiftsService.prototype.getAll = function (params) {
                return this.Resource.one().customGET('', params);
            };
            /**
             * Returns a single shift based on its id.
             *
             * @param id
             * @returns $bluebird
             */
            ShiftsService.prototype.getById = function (id) {
                return this.Resource.one(id).get();
            };
            /**
             * Will delete a single shift based on its id.
             *
             * @param shift
             */
            ShiftsService.prototype.remove = function (shift) {
                return this.Resource.one(shift.sid).remove();
            };
            /**
             * Will save an existing shift or create a new one.
             *
             * @param shift
             */
            ShiftsService.prototype.save = function (shift) {
                var id = shift.sid;
                var promise;
                if (typeof id === 'undefined' || id === null) {
                    promise = this.Resource.post(shift);
                }
                else {
                    promise = this.Resource.getById(id).then(function (originalShift) {
                        _.assign(originalShift, shift);
                        return originalShift.put();
                    });
                }
                return promise.then(function (data) {
                    _.assign(data, shift);
                    return data;
                });
            };
            ShiftsService.prototype.getShiftEntries = function (shift) {
            };
            ShiftsService.$inject = ['Restangular', 'ShiftEntriesService'];
            return ShiftsService;
        })();
        shifts.ShiftsService = ShiftsService;
        angular.module('angularShift.shifts').service('ShiftsService', ShiftsService);
    })(shifts = angularShift.shifts || (angularShift.shifts = {}));
})(angularShift || (angularShift = {}));
