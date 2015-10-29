/// <reference path="../../_test_all.ts" />

describe('LocationEditController', function () {
    var controller, notificationService, $state;
    beforeEach(module("angularShift"));

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_; // service, der die Controller instanziert
    }));

    beforeEach(function () {
        controller = $controller("LocationEditController", {
            NotificationService: notificationService,
            $state: $state,
            LocationService: locationService
        });
    });

    describe('Initional handling', function () {
        it('should not be null', function () {
            expect(controller).not.toBeNull();
        })
    })
});
