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
