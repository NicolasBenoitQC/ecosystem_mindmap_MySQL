
export interface ILibraryMindMap {
    
};

export interface ITableToolBar {
    
};

export interface ITableContainer {

};

export interface ITableHeader {

};

export interface ILibraryFolder {

};

export interface ILibraryFile {
    rowProps: IRows;
};

// -----------------------------------------------------------------

export interface IFileMindMap  {
        name: string;
        description: string;
}

export interface IRows  {
    folderName: string;
    folderDescription: string;
    mindMap: IFileMindMap[];
}


export interface ITableHeadLibrary {

};

export interface IColumn {
    id: string;
    label: string;
    minWidth: number;
    maxWidth: number;
};

export interface Data {
    Name: string,
    Description: string,
}

export type Order = 'asc' | 'desc';