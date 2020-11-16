// interface typing
import {IRequestDescription, IErrorsNewInterface} from '../../../database/types';

export interface IFilesAttributes {
    id?: number;
    name_file: string;
    description_file?: string
    createdAt?: Date;
    updatedAt?: Date;
    folder_id: number;
    active: boolean;
};

export interface IInsertedFile {
    request_description: IRequestDescription;
    error:boolean;
    message_error?: any;
    new_file?: any;
};

export interface IGetFilesList {
    request_description: IRequestDescription;
    error:boolean;
    message_error?: any;
    list_files?: IFilesAttributes[];
};

/*-----------------------------------------------------------------
------- INTERFACE SEQUELIZE --------------------------------------- 
-----------------------------------------------------------------*/

export interface INewFileInstance {
    dataValues?: IFilesAttributes,
    _previousDataValues?: IFilesAttributes,
    _changed?: any,
    _options?: {isNewRecord?: boolean, _schema?: any, _schemaDelimiter?: any},
    isNewRecord?: boolean,
    name?: string,
    errors?: IErrorsNewInterface 
};