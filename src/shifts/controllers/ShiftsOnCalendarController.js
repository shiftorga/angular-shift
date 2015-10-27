/// <reference path='../_all.ts' />
var angularShift;
(function (angularShift) {
    var shifts;
    (function (shifts) {
        var ShiftsOnCalendarController = (function () {
            function ShiftsOnCalendarController(uiCalendarConfig, $scope, shiftsService, converter, $state) {
                var _this = this;
                this.events = [];
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
                    calendar: {
                        height: 450,
                        editable: true,
                        header: {
                            left: 'month agendaWeek agendaDay',
                            center: 'title',
                            right: 'today prev,next'
                        },
                        eventClick: function (event) {
                            _this.$state.go('shifts.show', { id: event.shiftValues.sid });
                        },
                        eventDrop: $scope.alertOnDrop,
                        eventResize: $scope.alertOnResize,
                        viewRender: function (view, element) {
                            var params = {
                                start: view.start.get()._d.getTime() / 1000,
                                end: view.end.get()._d.getTime() / 1000
                            };
                            _this.shiftsService.getAll(params).then(function (data) {
                                _.each(data, function (shift) {
                                    _this.events.push(_this.converter.toEvent(shift));
                                });
                            });
                            return true;
                        }
                    }
                };
                this.init();
            }
            ShiftsOnCalendarController.prototype.init = function () {
                this.eventSources = [this.events];
            };
            return ShiftsOnCalendarController;
        })();
        shifts.ShiftsOnCalendarController = ShiftsOnCalendarController;
        ShiftsOnCalendarController.$inject = [
            'uiCalendarConfig',
            '$scope',
            'ShiftsService',
            'ShiftsEventConverterService',
            '$state',
            'LocationsService'
        ];
        angular.module('angularShift.shifts').controller('ShiftsOnCalendarController', ShiftsOnCalendarController);
    })(shifts = angularShift.shifts || (angularShift.shifts = {}));
})(angularShift || (angularShift = {}));
