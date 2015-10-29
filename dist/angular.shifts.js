/// <reference path='_all.ts' />
/**
 * The main application file
 *
 * @todo Remove cause its a lib
 *
 * @type {angular.Module}
 */
var angularShift;
(function (angularShift) {
    'use strict';
    angular
        .module('angularShift', [
        'restangular',
        'angularShift.shifts',
        'angularShift.shiftEntries',
        'angularShift.locations',
        'angularShift.shiftTypes',
        'angularShift.utils.notification',
        'angularShift.utils.Confirmation',
        'ui.router',
        'toastr'
    ])
        .config(function (RestangularProvider) {
        RestangularProvider.setEncodeIds(false);
        RestangularProvider.setBaseUrl('api');
    })
        .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/user_shifts/calendar");
    });
})(angularShift || (angularShift = {}));
/// <reference path='../_all.ts' />
var angularShift;
(function (angularShift) {
    var utils;
    (function (utils) {
        var ConfirmationService = (function () {
            function ConfirmationService($q) {
                this.$q = $q;
            }
            ConfirmationService.prototype.confirm = function (values, successCb) {
                var defaultValues = {
                    title: 'Confirm',
                    message: 'Do you really want to continue?',
                    buttons: {
                        cancel: {
                            label: 'Cancel',
                            className: 'btn',
                            callback: function () {
                                return false;
                            }
                        },
                        confirm: {
                            label: 'OK',
                            className: 'btn btn-primary',
                            callback: successCb
                        }
                    }
                };
                if (_.isObject(values)) {
                    _.merge(defaultValues, values);
                }
                return this.$q(function (resolve, reject) {
                    defaultValues.callback = function (result) {
                        resolve(result);
                    };
                    return bootbox.dialog(defaultValues);
                });
            };
            return ConfirmationService;
        })();
        utils.ConfirmationService = ConfirmationService;
        ConfirmationService.$inject = ['$q'];
        angular
            .module('angularShift.utils.Confirmation', [])
            .service('ConfirmationService', ConfirmationService);
    })(utils = angularShift.utils || (angularShift.utils = {}));
})(angularShift || (angularShift = {}));
/// <reference path='../_all.ts' />
var angularShift;
(function (angularShift) {
    var utils;
    (function (utils) {
        var NotificationService = (function () {
            function NotificationService(toastr) {
                this.toastr = toastr;
                this.toastrConfig = {
                    tapToDismiss: true,
                    closeButton: true,
                    timeOut: 5000,
                    extendedTimeOut: 0,
                    allowHtml: true
                };
            }
            /**
             * Display a success message
             *
             * @param {string} title
             * @param {string} message
             * @param {object|undefined} customConfig
             */
            NotificationService.prototype.success = function (title, message, customConfig) {
                if (customConfig === void 0) { customConfig = {}; }
                this.showToastrMessage('success', title, message, customConfig);
            };
            /**
             * Display a info message
             *
             * @param {string} title
             * @param {string} message
             * @param {object|undefined} customConfig
             */
            NotificationService.prototype.info = function (title, message, customConfig) {
                if (customConfig === void 0) { customConfig = {}; }
                this.showToastrMessage('info', title, message, customConfig);
            };
            /**
             * Display a error message
             *
             * @param {string} title
             * @param {string} message
             * @param {object|undefined} customConfig
             */
            NotificationService.prototype.error = function (title, message, customConfig) {
                if (customConfig === void 0) { customConfig = {}; }
                this.showToastrMessage('error', title, message, customConfig);
            };
            /**
             * Display a warning message
             *
             * @param {string} title
             * @param {string} message
             * @param {object|undefined} customConfig
             */
            NotificationService.prototype.warning = function (title, message, customConfig) {
                if (customConfig === void 0) { customConfig = {}; }
                this.showToastrMessage('warning', title, message, customConfig);
            };
            /**
             * Enrich the toastr call with the predefined toastr config
             *
             * @param {string} method
             * @param {string} title
             * @param {string} message
             * @param {object|null} customConfig
             */
            NotificationService.prototype.showToastrMessage = function (method, title, message, customConfig) {
                if (customConfig === void 0) { customConfig = {}; }
                customConfig = customConfig || {};
                var config = angular.extend(this.toastrConfig, customConfig);
                if (false === angular.isFunction(this.toastr[method])) {
                    throw method + ' is not a toastr method';
                }
                this.toastr[method](message, title, config);
            };
            return NotificationService;
        })();
        utils.NotificationService = NotificationService;
        NotificationService.$inject = ['toastr'];
        var app = angular.module('angularShift.utils.notification', []);
        app.service('NotificationService', NotificationService);
    })(utils = angularShift.utils || (angularShift.utils = {}));
})(angularShift || (angularShift = {}));
/// <reference path='app.ts' />
/// <reference path="../typings/lodash/lodash.d.ts" />
/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='../typings/fullCalendar/fullCalendar.d.ts' />
/// <reference path='../typings/restangular/restangular.d.ts' />
/// <reference path='../typings/toastr/toastr.d.ts' />
/// <reference path='../typings/bootstrap/bootstrap.d.ts' />
/// <reference path='../typings/angular-ui-router/angular-ui-router.d.ts' />
/// <reference path='../typings/es6-promise/es6-promise.d.ts' />
/// <reference path='../typings/jquery/jquery.d.ts' />
/// <reference path='../typings/bootbox/bootbox.d.ts' />
/// <reference path='utils/ConfirmationService.ts' />
/// <reference path='utils/NotificationService.ts' />
/// <reference path='../typings/moment/moment.d.ts' />
/// <reference path='_all.ts' />
/**
 * The main application file
 *
 * @todo Remove cause its a lib
 *
 * @type {angular.Module}
 */
var angularShift;
(function (angularShift) {
    var locations;
    (function (locations) {
        'use strict';
        angular
            .module('angularShift.locations', [])
            .config(function ($stateProvider) {
            $stateProvider
                .state({
                name: 'locations',
                url: '/locations',
                abstract: true,
                views: { content: { templateUrl: "partials/shifts/shifts.html" } }
            })
                .state({
                name: 'locations.edit',
                url: "/edit/{id:int}",
                views: {
                    edit: {
                        templateUrl: "partials/shifts/location_edit.html",
                        controller: "LocationEditController",
                        controllerAs: 'locationEdit'
                    }
                }
            });
        });
    })(locations = angularShift.locations || (angularShift.locations = {}));
})(angularShift || (angularShift = {}));
/// <reference path='_all.ts' />
var angularShift;
(function (angularShift) {
    var locations;
    (function (locations) {
        ;
    })(locations = angularShift.locations || (angularShift.locations = {}));
})(angularShift || (angularShift = {}));
;
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
/// <reference path='../_all.ts' />
/// <reference path='_all.ts' />
/**
 * The main application file
 *
 * @todo Remove cause its a lib
 *
 * @type {angular.Module}
 */
var angularShift;
(function (angularShift) {
    var shifts;
    (function (shifts) {
        'use strict';
        angular
            .module('angularShift.shifts', ['ui.calendar', 'ui.router'])
            .config(function ($stateProvider) {
            $stateProvider
                .state({
                name: 'shifts',
                url: '/user_shifts',
                abstract: true,
                views: { content: { templateUrl: "partials/shifts/shifts.html" } }
            })
                .state({
                name: 'shifts.calendar',
                url: "/calendar",
                views: {
                    main: {
                        templateUrl: "partials/shifts/calendar.html",
                        controller: "ShiftsOnCalendarController",
                        controllerAs: 'shiftsOnCalendar'
                    }
                }
            })
                .state({
                name: 'shifts.show',
                url: "/show/{id}",
                views: {
                    main: {
                        templateUrl: "partials/shifts/show.html",
                        controller: "ShiftsShowController",
                        controllerAs: 'shiftShow'
                    }
                }
            })
                .state({
                name: 'shifts.edit',
                url: "/edit/{id:int}",
                views: {
                    edit: {
                        templateUrl: "partials/shifts/edit.html",
                        controller: "ShiftsEditController",
                        controllerAs: 'shiftEdit'
                    }
                }
            });
        });
    })(shifts = angularShift.shifts || (angularShift.shifts = {}));
})(angularShift || (angularShift = {}));
/// <reference path='_all.ts' />
/**
 * The main application file
 *
 * @todo Remove cause its a lib
 *
 * @type {angular.Module}
 */
var angularShift;
(function (angularShift) {
    var shiftEntries;
    (function (shiftEntries) {
        'use strict';
        angular
            .module('angularShift.shiftEntries', []);
    })(shiftEntries = angularShift.shiftEntries || (angularShift.shiftEntries = {}));
})(angularShift || (angularShift = {}));
/// <reference path='_all.ts' />
var angularShift;
(function (angularShift) {
    var shiftEntries;
    (function (shiftEntries) {
        ;
    })(shiftEntries = angularShift.shiftEntries || (angularShift.shiftEntries = {}));
})(angularShift || (angularShift = {}));
;
/// <reference path="../_all.ts" />
/// <reference path='shfitEntries_app.ts' />
/// <reference path='ShiftEntriesService.ts' />
/// <reference path='ShiftEntryInterface.ts' />
/// <reference path='../shifts/models/ShiftInterface.ts' />
/// <reference path='../neededAngels/models/AngelTypeInterface.ts' />
/// <reference path='_all.ts' />
var angularShift;
(function (angularShift) {
    var shiftEntries;
    (function (shiftEntries) {
        'use strict';
        var ShiftEntriesService = (function () {
            function ShiftEntriesService(restangular) {
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
            ShiftEntriesService.prototype.getAll = function (params) {
                if (params === void 0) { params = []; }
                return this.Resource.one().customGET('', params);
            };
            /**
             * Returns a single shiftEntry based on its id.
             *
             * @param id
             * @returns $bluebird
             */
            ShiftEntriesService.prototype.getById = function (id) {
                return this.Resource.one(id).get();
            };
            /**
             * Will delete a single shiftEntry based on its id.
             *
             * @param shiftEntry
             */
            ShiftEntriesService.prototype.remove = function (shiftEntry) {
                return this.Resource.one(shiftEntry.id).remove();
            };
            /**
             * Will save an existing shiftEntry or create a new one.
             *
             * @param shiftEntry
             */
            ShiftEntriesService.prototype.save = function (shiftEntry) {
                var id = shiftEntry.id;
                var promise;
                if (typeof id === 'undefined' || id === null) {
                    promise = this.Resource.post(shiftEntry);
                }
                else {
                    promise = this.Resource.getById(id).then(function (originalShiftEntry) {
                        _.assign(originalShiftEntry, shiftEntry);
                        return originalShiftEntry.put();
                    });
                }
                return promise.then(function (data) {
                    _.assign(data, shiftEntry);
                    return data;
                });
            };
            ShiftEntriesService.$inject = ['Restangular'];
            return ShiftEntriesService;
        })();
        shiftEntries.ShiftEntriesService = ShiftEntriesService;
        angular.module('angularShift.shifts').service('ShiftEntriesService', ShiftEntriesService);
    })(shiftEntries = angularShift.shiftEntries || (angularShift.shiftEntries = {}));
})(angularShift || (angularShift = {}));
/// <reference path='_all.ts' />
/**
 * The main application file
 *
 * @todo Remove cause its a lib
 *
 * @type {angular.Module}
 */
var angularShift;
(function (angularShift) {
    var shiftTypes;
    (function (shiftTypes) {
        'use strict';
        angular
            .module('angularShift.shiftTypes', [])
            .config(function ($stateProvider) {
            $stateProvider
                .state({
                name: 'shiftType',
                url: '/shift_type',
                abstract: true,
                views: { content: { templateUrl: "partials/shifts/shifts.html" } }
            })
                .state({
                name: 'shiftType.edit',
                url: "/edit/{id:int}",
                views: {
                    edit: {
                        templateUrl: "partials/shifts/shift_type_edit.html",
                        controller: "ShiftTypeEditController",
                        controllerAs: 'shiftTypeEdit'
                    }
                }
            });
        });
    })(shiftTypes = angularShift.shiftTypes || (angularShift.shiftTypes = {}));
})(angularShift || (angularShift = {}));
/// <reference path='_all.ts' />
var angularShift;
(function (angularShift) {
    var shifts;
    (function (shifts) {
        var ShiftTypeEditController = (function () {
            function ShiftTypeEditController(notificationService, $state, service) {
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
            ShiftTypeEditController.prototype.init = function () {
                var _this = this;
                var shiftTypeId = this.$state.params.id;
                this.notificationService.warning('WORK IN PROGRESS', 'This feature isn`t implemented yet. Use <a href="/?p=user_shifts&edit_shift=' + shiftTypeId + '">Link (edit shift type)</a> instead');
                this.service.getById(shiftTypeId).then(function (shiftType) {
                    _this.shiftType = shiftType;
                    _this.notificationService.success('SUCCESS', 'Successfully loaded resource ' + shiftType.name);
                }, function (error) {
                    _this.notificationService.error('ERROR', 'Not able to fetch resource');
                });
            };
            return ShiftTypeEditController;
        })();
        shifts.ShiftTypeEditController = ShiftTypeEditController;
        ShiftTypeEditController.$inject = ['NotificationService', '$state', 'ShiftTypesService'];
        angular.module('angularShift.shifts').controller('ShiftTypeEditController', ShiftTypeEditController);
    })(shifts = angularShift.shifts || (angularShift.shifts = {}));
})(angularShift || (angularShift = {}));
/// <reference path='_all.ts' />
var angularShift;
(function (angularShift) {
    var shiftTypes;
    (function (shiftTypes) {
        'use strict';
        var ShiftTypesService = (function () {
            function ShiftTypesService(restangular) {
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
            ShiftTypesService.prototype.getAll = function (params) {
                if (params === void 0) { params = []; }
                return this.Resource.one().customGET('', params);
            };
            /**
             * Returns a single shift based on its id.
             *
             * @param id
             * @returns $bluebird
             */
            ShiftTypesService.prototype.getById = function (id) {
                return this.Resource.one(id).get();
            };
            /**
             * Will delete a single shift based on its id.
             *
             * @param shiftType
             */
            ShiftTypesService.prototype.remove = function (shiftType) {
                return this.Resource.one(shiftType.id).remove();
            };
            /**
             * Will save an existing shift or create a new one.
             *
             * @param shiftType
             */
            ShiftTypesService.prototype.save = function (shiftType) {
                var id = shiftType.id;
                var promise;
                if (typeof id === 'undefined' || id === null) {
                    promise = this.Resource.post(shiftType);
                }
                else {
                    promise = this.Resource.getById(id).then(function (originalShift) {
                        _.assign(originalShift, shiftType);
                        return originalShift.put();
                    });
                }
                return promise.then(function (data) {
                    _.assign(data, shiftType);
                    return data;
                });
            };
            ShiftTypesService.$inject = ['Restangular'];
            return ShiftTypesService;
        })();
        shiftTypes.ShiftTypesService = ShiftTypesService;
        angular.module('angularShift.shiftTypes').service('ShiftTypesService', ShiftTypesService);
    })(shiftTypes = angularShift.shiftTypes || (angularShift.shiftTypes = {}));
})(angularShift || (angularShift = {}));
/// <reference path="../_all.ts" />
/// <reference path='shfitTypes_app.ts' />
/// <reference path="ShiftTypeEditController" />
/// <reference path="ShiftTypeInterface" />
/// <reference path="ShiftTypesService" />
/// <reference path='_all.ts' />
;
/// <reference path='../_all.ts' />
var angularShift;
(function (angularShift) {
    var shifts;
    (function (shifts) {
        'use strict';
        var ShiftsService = (function () {
            function ShiftsService(restangular, shiftEntriesService) {
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
            ShiftsService.prototype.getAll = function (params) {
                return this.Resource.one().customGET('', params);
            };
            /**
             * Returns a single shift based on its id.
             *
             * @param id
             * @returns $bluebird
             */
            ShiftsService.prototype.getById = function (id) {
                return this.Resource.one(id).get();
            };
            /**
             * Will delete a single shift based on its id.
             *
             * @param shift
             */
            ShiftsService.prototype.remove = function (shift) {
                return this.Resource.one(shift.sid).remove();
            };
            /**
             * Will save an existing shift or create a new one.
             *
             * @param shift
             */
            ShiftsService.prototype.save = function (shift) {
                var id = shift.sid;
                var promise;
                if (typeof id === 'undefined' || id === null) {
                    promise = this.Resource.post(shift);
                }
                else {
                    promise = this.Resource.getById(id).then(function (originalShift) {
                        _.assign(originalShift, shift);
                        return originalShift.put();
                    });
                }
                return promise.then(function (data) {
                    _.assign(data, shift);
                    return data;
                });
            };
            ShiftsService.prototype.getShiftEntries = function (shift) {
            };
            ShiftsService.$inject = ['Restangular', 'ShiftEntriesService'];
            return ShiftsService;
        })();
        shifts.ShiftsService = ShiftsService;
        angular.module('angularShift.shifts').service('ShiftsService', ShiftsService);
    })(shifts = angularShift.shifts || (angularShift.shifts = {}));
})(angularShift || (angularShift = {}));
/// <reference path='../_all.ts' />
var angularShift;
(function (angularShift) {
    var shifts;
    (function (shifts) {
        var ShiftEventConverter = (function () {
            function ShiftEventConverter() {
            }
            ShiftEventConverter.prototype.toEvent = function (shift) {
                var startDate = new Date();
                startDate.setTime(shift.start * 1000);
                var endDate = new Date();
                endDate.setTime(shift.end * 1000);
                return {
                    title: !_.isUndefined(shift.title) ? shift.title + '(' + shift.shiftType.name + ')' : shift.shiftType.name,
                    start: startDate,
                    end: endDate,
                    shiftValues: shift
                };
            };
            return ShiftEventConverter;
        })();
        shifts.ShiftEventConverter = ShiftEventConverter;
        angular.module('angularShift.shifts').service('ShiftsEventConverterService', ShiftEventConverter);
    })(shifts = angularShift.shifts || (angularShift.shifts = {}));
})(angularShift || (angularShift = {}));
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
/// <reference path='../_all.ts' />
var angularShift;
(function (angularShift) {
    var shifts;
    (function (shifts) {
        var ShiftsEditController = (function () {
            function ShiftsEditController(notificationService, $state, shiftService) {
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
            ShiftsEditController.prototype.init = function () {
                var _this = this;
                var shiftId = this.$state.params.id;
                this.notificationService.warning('WORK IN PROGRESS', 'This feature isn`t implemented yet. Use <a href="/?p=user_shifts&edit_shift=' + shiftId + '">Link (edit shift)</a> instead');
                this.shiftsService.getById(shiftId).then(function (shift) {
                    _this.shift = shift;
                });
            };
            return ShiftsEditController;
        })();
        shifts.ShiftsEditController = ShiftsEditController;
        ShiftsEditController.$inject = ['NotificationService', '$state', 'ShiftsService'];
        angular.module('angularShift.shifts').controller('ShiftsEditController', ShiftsEditController);
    })(shifts = angularShift.shifts || (angularShift.shifts = {}));
})(angularShift || (angularShift = {}));
/// <reference path='../_all.ts' />
var angularShift;
(function (angularShift) {
    var shifts;
    (function (shifts) {
        var ShiftsShowController = (function () {
            function ShiftsShowController($state, shiftsService, notificationService, confirmationService) {
                this.dateValues = {
                    dateStart: null,
                    dateEnd: null,
                    timeStart: null,
                    timeEnd: null
                };
                this.shiftsService = shiftsService;
                this.$state = $state;
                this.notificationService = notificationService;
                this.confirmation = confirmationService;
                this.init();
            }
            ShiftsShowController.prototype.init = function () {
                var _this = this;
                var shiftid = this.$state.params.id;
                this.shiftsService.getById(shiftid).then(function (shift) {
                    _this.shift = shift;
                    _this.dateValues = {
                        dateStart: moment(shift.start, 'X').format('YYYY-M-DD'),
                        dateEnd: moment(shift.end, 'X').format('YYYY-M-DD'),
                        timeStart: moment(shift.start, 'X').format('HH:mm'),
                        timeEnd: moment(shift.end, 'X').format('HH:mm')
                    };
                });
            };
            ShiftsShowController.prototype.countShiftEntriesForAngelType = function (shift, angelTypeId) {
                var count = 0;
                _.each(shift.shiftEntries, function (entry) {
                    if (entry.angelType.id === angelTypeId) {
                        count++;
                    }
                });
                return count;
            };
            ShiftsShowController.prototype.getPercentage = function (now, max) {
                var relation = now / max * 100;
                return Math.round(relation);
            };
            ShiftsShowController.prototype.deleteShift = function (shift) {
                var _this = this;
                this.confirmation.confirm({ message: 'Do you really want to delete the shift <b>' + this.buildLabel(shift) + '</b>' }, function () {
                    _this.shiftsService.remove(shift).then(function () {
                        _this.$state.go('shift.calendar');
                    }, function (error) {
                        console.log(error);
                        _this.notificationService.error('Failed to delete ...', 'Errors while trying to delete shift <b>' + _this.buildLabel(shift) + '</b>');
                    });
                });
            };
            ShiftsShowController.prototype.buildLabel = function (shift) {
                var title = !_.isUndefined(shift.title) && '' !== shift.title && null !== shift.title ? shift.title : null;
                return (null === title) ? shift.shiftType.name : title + ' (' + shift.shiftType.name + ')';
            };
            return ShiftsShowController;
        })();
        shifts.ShiftsShowController = ShiftsShowController;
        ShiftsShowController.$inject = ['$state', 'ShiftsService', 'NotificationService', 'ConfirmationService'];
        angular.module('angularShift.shifts').controller('ShiftsShowController', ShiftsShowController);
    })(shifts = angularShift.shifts || (angularShift.shifts = {}));
})(angularShift || (angularShift = {}));
/// <reference path="../_all.ts" />
/// <reference path='shifts_app.ts' />
/// <reference path='../shiftEntries/ShiftEntriesService.ts' />
/// <reference path='../shiftEntries/ShiftEntryInterface.ts' />
/// <reference path='../shiftTypes/ShiftTypeInterface.ts' />
/// <reference path='../neededAngels/models/NeededAngelTypeInterface.ts' />
/// <reference path='../utils/NotificationService.ts' />
/// <reference path='../utils/ConfirmationService.ts' />
/// <reference path='services/ShiftsService.ts' />
/// <reference path='models/ShiftInterface.ts' />
/// <reference path='services/ShiftEventConverter.ts' />
/// <reference path='controllers/ShiftsOnCalendarController' />
/// <reference path='controllers/ShiftsEditController' />
/// <reference path='controllers/ShiftsShowController' />
/// <reference path='../_all.ts' />
/// <reference path="../_all.ts" />
/// <referrnce path='neededAngels_app.ts' />
/// <reference path='models/NeededAngelTypeInterface.ts' />
/// <reference path='models/AngelTypeInterface.ts' />
///<reference path='../locations/LocationInterface.ts' />
///<reference path='../shifts/models/ShiftInterface.ts' />
/// <reference path='../_all.ts' />
/// <reference path="../_all.ts" />
/// <reference path='locations_app.ts' />
/// <reference path="LocationInterface.ts" />
/// <reference path="LocationEditController.ts" />
/// <reference path="LocationsService" />
/// <reference path="../neededAngels/models/NeededAngelTypeInterface.ts" />
/// <reference path='_all.ts' />
var angularShift;
(function (angularShift) {
    var locations;
    (function (locations) {
        var LocationEditController = (function () {
            function LocationEditController(notificationService, $state, service) {
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
            LocationEditController.prototype.init = function () {
                var _this = this;
                var locationId = this.$state.params.id;
                this.notificationService.warning('WORK IN PROGRESS', 'This feature isn`t implemented yet. Use <a href="/?p=user_shifts&edit_shift=' + locationId + '">Link (edit location)</a> instead');
                this.service.getById(locationId).then(function (location) {
                    _this.location = location;
                    _this.notificationService.success('SUCCESS', 'Successfully loaded resource ' + location.Name);
                }, function (error) {
                    _this.notificationService.error('ERROR', 'Not able to fetch resource');
                });
            };
            return LocationEditController;
        })();
        locations.LocationEditController = LocationEditController;
        LocationEditController.$inject = ['NotificationService', '$state', 'LocationsService'];
        angular.module('angularShift.shifts').controller('LocationEditController', LocationEditController);
    })(locations = angularShift.locations || (angularShift.locations = {}));
})(angularShift || (angularShift = {}));
/// <reference path='_all.ts' />
/**
 * The main application file
 *
 * @todo Remove cause its a lib
 *
 * @type {angular.Module}
 */
var angularShift;
(function (angularShift) {
    var neededAngels;
    (function (neededAngels) {
        'use strict';
        angular
            .module('angularShift.neededAngels', []);
    })(neededAngels = angularShift.neededAngels || (angularShift.neededAngels = {}));
})(angularShift || (angularShift = {}));
/// <reference path="../_all.ts" />
var angularShift;
(function (angularShift) {
    var shifts;
    (function (shifts) {
        var ListFilterController = (function () {
            function ListFilterController($scope, locationsService) {
                this.services = {
                    'location': null
                };
                this.services.location = locationsService;
                this.$scope = $scope;
                this.$scope.buttons = [];
                this.init();
            }
            ListFilterController.prototype.init = function () {
                var _this = this;
                this.services.location.getAll().then(function (locations) {
                    _.each(locations, function (location) {
                        _this.$scope.buttons.push({ check: true, label: location.Name });
                    });
                });
            };
            return ListFilterController;
        })();
        shifts.ListFilterController = ListFilterController;
        ListFilterController.$inject = ['$scope', 'LocationsService'];
        angular.module('angularShift.shifts').controller('ListFilterController', ListFilterController);
    })(shifts = angularShift.shifts || (angularShift.shifts = {}));
})(angularShift || (angularShift = {}));
/// <reference path="../_all.ts" />
var angularShift;
(function (angularShift) {
    var shifts;
    (function (shifts) {
        angular.module('angularShift.shifts')
            .directive('listFilter', function () {
            return {
                'restrict': 'E',
                'templateUrl': 'partials/shifts/list_filter.html',
                'scope': {
                    type: '@'
                },
                link: function ($scope, element, attr) {
                },
                'controller': 'ListFilterController'
            };
        });
    })(shifts = angularShift.shifts || (angularShift.shifts = {}));
})(angularShift || (angularShift = {}));
