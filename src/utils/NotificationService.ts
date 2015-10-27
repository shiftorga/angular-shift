/// <reference path='../_all.ts' />

module angularShift.utils {
    export class NotificationService {
        /**
         * Default toastr settings
         * @type {{tapToDismiss: boolean, closeButton: boolean, timeOut: number, extendedTimeOut: number}}
         */
        private toastrConfig: any;

        private toastr;

        constructor (toastr) {
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
        success (title, message, customConfig = {}) {
            this.showToastrMessage('success', title, message, customConfig);
        }

        /**
         * Display a info message
         *
         * @param {string} title
         * @param {string} message
         * @param {object|undefined} customConfig
         */
        info (title, message, customConfig = {}) {
            this.showToastrMessage('info', title, message, customConfig);
        }

        /**
         * Display a error message
         *
         * @param {string} title
         * @param {string} message
         * @param {object|undefined} customConfig
         */
        error (title, message, customConfig = {}) {
            this.showToastrMessage('error', title, message, customConfig);
        }
        /**
         * Display a warning message
         *
         * @param {string} title
         * @param {string} message
         * @param {object|undefined} customConfig
         */
        warning (title, message, customConfig = {}) {
            this.showToastrMessage('warning', title, message, customConfig);
        }

        /**
         * Enrich the toastr call with the predefined toastr config
         *
         * @param {string} method
         * @param {string} title
         * @param {string} message
         * @param {object|null} customConfig
         */
        private showToastrMessage (method, title, message, customConfig = {}) {
            customConfig = customConfig || {};
            var config = angular.extend(this.toastrConfig, customConfig);

            if (false === angular.isFunction(this.toastr[method])) {
                throw method + ' is not a toastr method';
            }

            this.toastr[method](
                message,
                title,
                config
            );
        }
    }
    NotificationService.$inject = ['toastr'];
    var app = angular.module('angularShift.utils.notification', []);
    app.service('NotificationService', NotificationService);
}
