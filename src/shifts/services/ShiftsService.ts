/// <reference path='../_all.ts' />

module angularShift.shifts {
    'use strict';
    export interface GetShiftParameter {
        start: number;
        end: number;
        locations?: Array<number>;
    }

    export class ShiftsService
    {
        private Resource;

        /**
         * @var restangular.IElement
         */
        private Restangular;

        /**
         * @var angularShift.shiftEntries.ShiftEntriesService
         */
        private shiftEntriesService;

        static $inject = ['Restangular', 'ShiftEntriesService'];

        constructor(
            restangular: restangular.IElement,
            shiftEntriesService: angularShift.shiftEntries.ShiftEntriesService
        ) {
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
        getAll (params: GetShiftParameter) {
            return this.Resource.one().customGET('', params);
        }

        /**
         * Returns a single shift based on its id.
         *
         * @param id
         * @returns $bluebird
         */
        getById (id) {
            return this.Resource.one(id).get();
        }

        /**
         * Will delete a single shift based on its id.
         *
         * @param shift
         */
        remove (shift: ShiftInterface) {
            return this.Resource.one(shift.sid).remove();
        }

        /**
         * Will save an existing shift or create a new one.
         *
         * @param shift
         */
        save (shift: ShiftInterface) {
            var id = shift.sid;
            var promise;

            if (typeof id === 'undefined' || id === null) {
                promise = this.Resource.post(shift);
            } else {
                promise = this.Resource.getById(id).then(function (originalShift) {
                    _.assign(originalShift, shift);

                    return originalShift.put();
                });
            }

            return promise.then(function (data) {
                _.assign(data, shift);

                return data;
            });
        }

        getShiftEntries (shift: ShiftInterface) {

        }
    }

    angular.module('angularShift.shifts').service('ShiftsService', ShiftsService)
}
