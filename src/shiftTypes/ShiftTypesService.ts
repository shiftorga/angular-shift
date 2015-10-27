/// <reference path='_all.ts' />

module angularShift.shiftTypes {
    'use strict';

    export class ShiftTypesService
    {
        private Resource;

        /**
         * @var restangular.IElement
         */
        private Restangular;

        static $inject = ['Restangular'];

        constructor(restangular: restangular.IElement) {
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
        getAll (params = []) {
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
         * @param shiftType
         */
        remove (shiftType: ShiftTypeInterface) {
            return this.Resource.one(shiftType.id).remove();
        }

        /**
         * Will save an existing shift or create a new one.
         *
         * @param shiftType
         */
        save (shiftType: ShiftTypeInterface) {
            var id = shiftType.id;
            var promise;

            if (typeof id === 'undefined' || id === null) {
                promise = this.Resource.post(shiftType);
            } else {
                promise = this.Resource.getById(id).then(function (originalShift) {
                    _.assign(originalShift, shiftType);

                    return originalShift.put();
                });
            }

            return promise.then(function (data) {
                _.assign(data, shiftType);

                return data;
            });
        }
    }

    angular.module('angularShift.shiftTypes').service('ShiftTypesService', ShiftTypesService)
}
