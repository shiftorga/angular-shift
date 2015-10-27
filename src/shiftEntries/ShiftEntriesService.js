/// <reference path='_all.ts' />
var angularShift;
(function (angularShift) {
    var shiftEntries;
    (function (shiftEntries) {
        'use strict';
        var ShiftEntriesService = (function () {
            function ShiftEntriesService(restangular) {
                this.Resource = restangular.service('shift_entries');
                this.Restangular = restangular;
            }
            /**
             * Return a list of shiftEntry.
             *
             * The list will be fetched from the local memory when exists, otherwise
             * an api call is triggered.
             *
             * @returns $bluebird
             */
            ShiftEntriesService.prototype.getAll = function (params) {
                if (params === void 0) { params = []; }
                return this.Resource.one().customGET('', params);
            };
            /**
             * Returns a single shiftEntry based on its id.
             *
             * @param id
             * @returns $bluebird
             */
            ShiftEntriesService.prototype.getById = function (id) {
                return this.Resource.one(id).get();
            };
            /**
             * Will delete a single shiftEntry based on its id.
             *
             * @param shiftEntry
             */
            ShiftEntriesService.prototype.remove = function (shiftEntry) {
                return this.Resource.one(shiftEntry.id).remove();
            };
            /**
             * Will save an existing shiftEntry or create a new one.
             *
             * @param shiftEntry
             */
            ShiftEntriesService.prototype.save = function (shiftEntry) {
                var id = shiftEntry.id;
                var promise;
                if (typeof id === 'undefined' || id === null) {
                    promise = this.Resource.post(shiftEntry);
                }
                else {
                    promise = this.Resource.getById(id).then(function (originalShiftEntry) {
                        _.assign(originalShiftEntry, shiftEntry);
                        return originalShiftEntry.put();
                    });
                }
                return promise.then(function (data) {
                    _.assign(data, shiftEntry);
                    return data;
                });
            };
            ShiftEntriesService.$inject = ['Restangular'];
            return ShiftEntriesService;
        })();
        shiftEntries.ShiftEntriesService = ShiftEntriesService;
        angular.module('angularShift.shifts').service('ShiftEntriesService', ShiftEntriesService);
    })(shiftEntries = angularShift.shiftEntries || (angularShift.shiftEntries = {}));
})(angularShift || (angularShift = {}));
