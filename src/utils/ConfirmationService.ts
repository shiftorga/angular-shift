/// <reference path='../_all.ts' />

module angularShift.utils {
    export class ConfirmationService {
        private $q;

        constructor ($q) {
            this.$q = $q;
        }

        confirm  (values, successCb) {
            var defaultValues: BootboxDialogOptions = {
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
        }
    }
    ConfirmationService.$inject = ['$q'];
    angular
        .module('angularShift.utils.Confirmation', [])
        .service('ConfirmationService', ConfirmationService);
}
