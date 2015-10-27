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
