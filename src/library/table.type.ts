export interface IRow  {
    folderName: string;
    folderDescription: string;
    mindMap: IFileMindMapRow[];
}

export interface IFileMindMapRow  {
    name: string;
    description: string;
}

export interface IFolderProps {
    rowProps: IRow
}

export interface IFileProps {
    rowProps: IFileMindMapRow
}


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