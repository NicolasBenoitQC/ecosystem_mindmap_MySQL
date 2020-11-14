export interface IFoldersAttributes {
    id?: number;
    name_folder: string;
    description_folder?: string
    createdAt?: Date;
    updatedAt?: Date;
    active: boolean;
};

export interface ICreatedFolder {
    dataValues?: IFoldersAttributes,
    _previousDataValues?: IFoldersAttributes,
    _changed?: any,
    _options?: {isNewRecord?: boolean, _schema?: any, _schemaDelimiter?: any},
    isNewRecord?: boolean
}

export interface IRequestDescription {
    description: string,
    argument: object,
};

export interface IInsertedFolder {
    request_description: IRequestDescription;
    error:boolean;
    message_error?: any;
    inserted_folder?: any;
};