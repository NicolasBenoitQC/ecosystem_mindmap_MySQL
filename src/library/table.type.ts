export interface IRequestDescription {
    description: string,
    argument: any,
};

/*-------------------------------- 
----- FOLDERS -------------------- 
--------------------------------*/
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

/*-------------------------------- 
----- FILES ---------------------- 
--------------------------------*/
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


