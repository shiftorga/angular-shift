/// <reference path='_all.ts' />

module angularShift.locations {
    'use strict';

    export class LocationsService
    {
        private Resource;

        /**
         * @var restangular.IElement
         */
        private Restangular;

        static $inject = ['Restangular'];

        constructor(restangular: restangular.IElement) {
            this.Resource = restangular.service('locations');
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
         * @param location
         */
        remove (location: LocationInterface) {
            return this.Resource.one(location.RID).remove();
        }

        /**
         * Will save an existing shift or create a new one.
         *
         * @param location
         */
        save (location: LocationInterface) {
            var id = location.RID;
            var promise;

            if (typeof id === 'undefined' || id === null) {
                promise = this.Resource.post(location);
            } else {
                promise = this.Resource.getById(id).then(function (original) {
                    _.assign(original, location);

                    return original.put();
                });
            }

            return promise.then(function (data) {
                _.assign(data, location);

                return data;
            });
        }
    }

    angular.module('angularShift.locations').service('LocationsService', LocationsService)
}
