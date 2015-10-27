/// <reference path='_all.ts' />

module angularShift.locations {
    export class LocationEditController {
        private notificationService: angularShift.utils.NotificationService;
        private $state;
        private service: LocationsService;
        public location: LocationInterface;

        constructor (
            notificationService: angularShift.utils.NotificationService,
            $state,
            service: LocationsService
        ) {
            this.notificationService = notificationService;
            this.$state = $state;
            this.service = service;

            this.init();
        }

        /**
         * ToDos
         * - get shift types list by service
         * - get locations list by service
         * - start/end -> form type with day + time
         * - needed Angeltypes in directive
         * - save on click
         */
        private init() {
            var locationId = this.$state.params.id;

            this.notificationService.warning(
                'WORK IN PROGRESS',
                'This feature isn`t implemented yet. Use <a href="/?p=user_shifts&edit_shift=' + locationId + '">Link (edit location)</a> instead'
            );

            this.service.getById(locationId).then((location: angularShift.locations.LocationInterface) => {
                this.location = location;
                this.notificationService.success('SUCCESS', 'Successfully loaded resource ' + location.Name);
            }, (error) => {
               this.notificationService.error('ERROR', 'Not able to fetch resource');
            });
        }
    }
    LocationEditController.$inject = ['NotificationService', '$state', 'LocationsService'];

    angular.module('angularShift.shifts').controller('LocationEditController', LocationEditController);
}
