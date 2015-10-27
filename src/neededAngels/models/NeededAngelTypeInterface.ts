/// <reference path='../_all.ts' />

module angularShift.neededAngels {

    /**
     * The needed angels we are getting from the API.
     */
    export interface NeededAngelTypeInterface {
        id: number;
        name: string;
        location: angularShift.locations.LocationInterface;
        shift: angularShift.shifts.ShiftInterface;
        angelType: AngelType;
        count: number;
    }
}
