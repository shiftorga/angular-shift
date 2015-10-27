/// <reference path='../_all.ts' />

module angularShift.shifts {
    export class ShiftsEditController {
        private notificationService: angularShift.utils.NotificationService;
        private shiftsService: ShiftsService;
        private $state;
        public shift: ShiftInterface;

        constructor (
            notificationService: angularShift.utils.NotificationService,
            $state,
            shiftService: ShiftsService
        ) {
            this.notificationService = notificationService;
            this.$state = $state;
            this.shiftsService = shiftService;

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
            var shiftId = this.$state.params.id;

            this.notificationService.warning(
                'WORK IN PROGRESS',
                'This feature isn`t implemented yet. Use <a href="/?p=user_shifts&edit_shift=' + shiftId + '">Link (edit shift)</a> instead'
            );

            this.shiftsService.getById(shiftId).then((shift: ShiftInterface) => {
                this.shift = shift;
            });
        }
    }
    ShiftsEditController.$inject = ['NotificationService', '$state', 'ShiftsService'];

    angular.module('angularShift.shifts').controller('ShiftsEditController', ShiftsEditController);
}
