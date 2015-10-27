/// <reference path='_all.ts' />

module angularShift.shifts {
    export class ShiftTypeEditController {
        private notificationService: angularShift.utils.NotificationService;
        private $state;
        private service: angularShift.shiftTypes.ShiftTypesService;
        public shiftType: angularShift.shiftTypes.ShiftTypeInterface;

        constructor (
            notificationService: angularShift.utils.NotificationService,
            $state,
            service: angularShift.shiftTypes.ShiftTypesService
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
            var shiftTypeId = this.$state.params.id;

            this.notificationService.warning(
                'WORK IN PROGRESS',
                'This feature isn`t implemented yet. Use <a href="/?p=user_shifts&edit_shift=' + shiftTypeId + '">Link (edit shift type)</a> instead'
            );

            this.service.getById(shiftTypeId).then((shiftType: angularShift.shiftTypes.ShiftTypeInterface) => {
                this.shiftType = shiftType;
                this.notificationService.success('SUCCESS', 'Successfully loaded resource ' + shiftType.name);
            }, (error) => {
               this.notificationService.error('ERROR', 'Not able to fetch resource');
            });
        }
    }
    ShiftTypeEditController.$inject = ['NotificationService', '$state', 'ShiftTypesService'];

    angular.module('angularShift.shifts').controller('ShiftTypeEditController', ShiftTypeEditController);
}
