// interface typing
import {IRequestDescription, IErrorsNewInterface} from '../../../database/types';


export interface IFoldersAttributes {
    id?: number;
    name_folder: string;
    description_folder?: string
    createdAt?: Date;
    updatedAt?: Date;
    active: boolean;
};

export interface IInsertedFolder {
    request_description: IRequestDescription;
    error:boolean;
    message_error?: any;
    new_folder?: any;
};

export interface IGetFoldersList {
    request_description: IRequestDescription;
    error:boolean;
    message_error?: any;
    list_folders?: IFoldersAttributes[];
};

/*-----------------------------------------------------------------
------- INTERFACE SEQUELIZE --------------------------------------- 
-----------------------------------------------------------------*/

export interface INewFolderInstance {
    dataValues?: IFoldersAttributes,
    _previousDataValues?: IFoldersAttributes,
    _changed?: any,
    _options?: {isNewRecord?: boolean, _schema?: any, _schemaDelimiter?: any},
    isNewRecord?: boolean,
    name?: string,
    errors?: IErrorsNewInterface 
};