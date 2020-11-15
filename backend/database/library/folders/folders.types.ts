export interface IFoldersAttributes {
    id?: number;
    name_folder: string;
    description_folder?: string
    createdAt?: Date;
    updatedAt?: Date;
    active: boolean;
};

export interface IRequestDescription {
    description: string,
    argument: any,
};

export interface IInsertedFolder {
    request_description: IRequestDescription;
    error:boolean;
    message_error?: any;
    new_folder?: any;
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

export interface INewFolderInstance {
    dataValues?: IFoldersAttributes,
    _previousDataValues?: IFoldersAttributes,
    _changed?: any,
    _options?: {isNewRecord?: boolean, _schema?: any, _schemaDelimiter?: any},
    isNewRecord?: boolean,
    name?: string,
    errors?: IErrorsNewInterface 
};