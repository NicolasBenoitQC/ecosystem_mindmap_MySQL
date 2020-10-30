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
