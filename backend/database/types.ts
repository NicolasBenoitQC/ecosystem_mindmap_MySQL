export interface IRequestDescription {
    description: string,
    argument: any,
};

/*-----------------------------------------------------------------
------- INTERFACE SEQUELIZE --------------------------------------- 
-----------------------------------------------------------------*/

export interface IErrorsNewInterface {
    ValidationErrorItem: {
        message: string,
        type: string,
        path: string,
        value: any,
        origin: string,
        instance: [any],
        validatorKey: string,
        validatorName: any,
        validatorArgs: [any],
    };
};