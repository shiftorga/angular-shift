/// <reference path='_all.ts' />
var angularShift;
(function (angularShift) {
    var shiftTypes;
    (function (shiftTypes) {
        'use strict';
        var ShiftTypesService = (function () {
            function ShiftTypesService(restangular) {
                this.Resource = restangular.service('shift_types');
                this.Restangular = restangular;
            }
            /**
             * Return a list of shift.
             *
             * The list will be fetched from the local memory when exists, otherwise
             * an api call is triggered.
             *
             * @returns $bluebird
             */
            ShiftTypesService.prototype.getAll = function (params) {
                if (params === void 0) { params = []; }
                return this.Resource.one().customGET('', params);
            };
            /**
             * Returns a single shift based on its id.
             *
             * @param id
             * @returns $bluebird
             */
            ShiftTypesService.prototype.getById = function (id) {
                return this.Resource.one(id).get();
            };
            /**
             * Will delete a single shift based on its id.
             *
             * @param shiftType
             */
            ShiftTypesService.prototype.remove = function (shiftType) {
                return this.Resource.one(shiftType.id).remove();
            };
            /**
             * Will save an existing shift or create a new one.
             *
             * @param shiftType
             */
            ShiftTypesService.prototype.save = function (shiftType) {
                var id = shiftType.id;
                var promise;
                if (typeof id === 'undefined' || id === null) {
                    promise = this.Resource.post(shiftType);
                }
                else {
                    promise = this.Resource.getById(id).then(function (originalShift) {
                        _.assign(originalShift, shiftType);
                        return originalShift.put();
                    });
                }
                return promise.then(function (data) {
                    _.assign(data, shiftType);
                    return data;
                });
            };
            ShiftTypesService.$inject = ['Restangular'];
            return ShiftTypesService;
        })();
        shiftTypes.ShiftTypesService = ShiftTypesService;
        angular.module('angularShift.shiftTypes').service('ShiftTypesService', ShiftTypesService);
    })(shiftTypes = angularShift.shiftTypes || (angularShift.shiftTypes = {}));
})(angularShift || (angularShift = {}));
