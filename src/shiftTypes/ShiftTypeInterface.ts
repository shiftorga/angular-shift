/// <reference path='_all.ts' />

module angularShift.shiftTypes {

    /**
     * The interface for the shifts we are getting from the api.
     */
    export interface ShiftTypeInterface {
        id: number;
        name: string;
        angeltype_id: number;
        description: string;
    }
};
