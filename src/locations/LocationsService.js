/// <reference path='_all.ts' />
var angularShift;
(function (angularShift) {
    var locations;
    (function (locations) {
        'use strict';
        var LocationsService = (function () {
            function LocationsService(restangular) {
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
            LocationsService.prototype.getAll = function (params) {
                if (params === void 0) { params = []; }
                return this.Resource.one().customGET('', params);
            };
            /**
             * Returns a single shift based on its id.
             *
             * @param id
             * @returns $bluebird
             */
            LocationsService.prototype.getById = function (id) {
                return this.Resource.one(id).get();
            };
            /**
             * Will delete a single shift based on its id.
             *
             * @param location
             */
            LocationsService.prototype.remove = function (location) {
                return this.Resource.one(location.RID).remove();
            };
            /**
             * Will save an existing shift or create a new one.
             *
             * @param location
             */
            LocationsService.prototype.save = function (location) {
                var id = location.RID;
                var promise;
                if (typeof id === 'undefined' || id === null) {
                    promise = this.Resource.post(location);
                }
                else {
                    promise = this.Resource.getById(id).then(function (original) {
                        _.assign(original, location);
                        return original.put();
                    });
                }
                return promise.then(function (data) {
                    _.assign(data, location);
                    return data;
                });
            };
            LocationsService.$inject = ['Restangular'];
            return LocationsService;
        })();
        locations.LocationsService = LocationsService;
        angular.module('angularShift.locations').service('LocationsService', LocationsService);
    })(locations = angularShift.locations || (angularShift.locations = {}));
})(angularShift || (angularShift = {}));
