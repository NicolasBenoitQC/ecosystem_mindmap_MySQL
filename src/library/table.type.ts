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