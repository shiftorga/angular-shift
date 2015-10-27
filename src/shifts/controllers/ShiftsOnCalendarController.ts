/// <reference path='../_all.ts' />

module angularShift.shifts {
    export class ShiftsOnCalendarController {
        private date: Date;
        private d: number;
        private m: number;
        private y: number;
        private events: Array<FullCalendar.EventObject> = [];
        private uiCalendarConfig: FullCalendar.Options;
        private eventSources: Array<FullCalendar.EventSource>;
        private shiftsService: ShiftsService;
        private converter: ShiftEventConverter;
        private $state;

        constructor(
            uiCalendarConfig,
            $scope,
            shiftsService: ShiftsService,
            converter: ShiftEventConverter,
            $state
        ) {
            this.date = new Date();
            this.d = this.date.getDate();
            this.m = this.date.getMonth();
            this.y = this.date.getFullYear();

            this.uiCalendarConfig = uiCalendarConfig;
            this.shiftsService = shiftsService;
            this.converter = converter;
            this.eventSources = [];
            this.$state = $state;

            $scope.uiConfig = {
                calendar:{
                    height: 450,
                    editable: true,
                    header:{
                        left: 'month agendaWeek agendaDay',
                        center: 'title',
                        right: 'today prev,next'
                    },
                    eventClick: (event) => {
                        this.$state.go('shifts.show', {id: event.shiftValues.sid});
                    },
                    eventDrop: $scope.alertOnDrop,
                    eventResize: $scope.alertOnResize,
                    viewRender: (view, element) => {
                        var params: GetShiftParameter = {
                            start: view.start.get()._d.getTime()/1000,
                            end: view.end.get()._d.getTime()/1000
                        };
                        this.shiftsService.getAll(params).then((data) => {
                            _.each(data, (shift: ShiftInterface) => {
                                this.events.push(this.converter.toEvent(shift))
                            });
                        });
                        return true;
                    }
                }
            };

            this.init();
        }

        init () {
            this.eventSources = [this.events];
        }

    }

    ShiftsOnCalendarController.$inject = [
        'uiCalendarConfig',
        '$scope',
        'ShiftsService',
        'ShiftsEventConverterService',
        '$state',
        'LocationsService'
    ];

    angular.module('angularShift.shifts').controller('ShiftsOnCalendarController', ShiftsOnCalendarController);
}
