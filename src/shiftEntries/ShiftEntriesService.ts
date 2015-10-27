/// <reference path='_all.ts' />

module angularShift.shiftEntries {
    'use strict';

    export class ShiftEntriesService
    {
        private Resource;

        /**
         * @var restangular.IElement
         */
        private Restangular;

        static $inject = ['Restangular'];

        constructor(restangular: restangular.IElement) {
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
        getAll (params = []) {
            return this.Resource.one().customGET('', params);
        }

        /**
         * Returns a single shiftEntry based on its id.
         *
         * @param id
         * @returns $bluebird
         */
        getById (id) {
            return this.Resource.one(id).get();
        }

        /**
         * Will delete a single shiftEntry based on its id.
         *
         * @param shiftEntry
         */
        remove (shiftEntry: ShiftEntryInterface) {
            return this.Resource.one(shiftEntry.id).remove();
        }

        /**
         * Will save an existing shiftEntry or create a new one.
         *
         * @param shiftEntry
         */
        save (shiftEntry: ShiftEntryInterface) {
            var id = shiftEntry.id;
            var promise;

            if (typeof id === 'undefined' || id === null) {
                promise = this.Resource.post(shiftEntry);
            } else {
                promise = this.Resource.getById(id).then(function (originalShiftEntry) {
                    _.assign(originalShiftEntry, shiftEntry);

                    return originalShiftEntry.put();
                });
            }

            return promise.then(function (data) {
                _.assign(data, shiftEntry);

                return data;
            });
        }
    }

    angular.module('angularShift.shifts').service('ShiftEntriesService', ShiftEntriesService)
}
