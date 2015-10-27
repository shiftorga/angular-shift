/// <reference path='_all.ts' />

module angularShift.locations {

    /**
     * The interface for the locations we are getting from the api.
     */
    export interface LocationInterface {
        RID : number;
        Name: string;
        Man: string;
        FromPentabarf: string;
        show: string;
        Number: number;
        neededAngelTypes: Array<angularShift.neededAngels.NeededAngelTypeInterface>;
    };
};
