import { Document, Model } from 'mongoose';

export interface ICellSchema {
    title: any;
    description: string;
    position: number;
    idStemCell: any;
    stemCell?: boolean;
};

export interface ICell {
    id: any;
    title: string;
    description: string;
    position: number;
    idStemCell: any;
    stemCell?: boolean;
};

export interface INewCell {
    request_type: string;
    error:boolean;
    message?: string;
    cell_created?: any;
};

export interface IGetCells {
    request_type: string;
    error:boolean;
    message?: any;
    cells_Request?: any;
};

export interface IGetCellByPropsId {
    request_type: string;
    error:boolean;
    message?: string;
    cell_Request?: ICell[];
}

export interface IgetEcoSystemByMindMapId {
    request_type: string;
    error:boolean;
    message?: any;
    stemCellOfEcosystem?: IGetCells
    cellsOfEcosystem?: IGetCells;
};

export interface IgetEcoSystemByStemCellId {
    request_type: string;
    error:boolean;
    message?: any;
    stemCellOfEcosystem?: IGetCellByPropsId;
    cellsOfEcosystem?: IGetCells;
};

export interface IUpdatePropsCellResp {
    request_type: string;
    error:boolean;
    message?: string;
    update_Cell?: ICell;
};

export interface IDeleteAllChildrenCellsOfTheCellDeleted {
    request_type: string;
    error:boolean;
    message?: string;
    child_cell_deleted?: ICell;
}

 export interface ICellDocument extends ICellSchema ,Document {
}; 

export interface ICellModel extends Model<ICellDocument> {   
};

/* ______________________________________________________________
---------------- Parents tree of the cell -----------------------
______________________________________________________________ */

export interface IParentsTreeOfTheCellSchema {
    cellId: string;
    cellLevel: number;
    parentsIdList: string[];
};

export interface IParentsTreeOfTheCell {
    _id: string;
    cellId: string;
    cellLevel: number;
    parentsIdList: string[];
};

export interface INewParentsTreeOfTheCellResp {
    request_type: string;
    error:boolean;
    message?: string;
    parents_tree?: IParentsTreeOfTheCell;
};

export interface IGetAllIdOfChildCellsResp {
    request_type: string;
    error:boolean;
    message?: string;
    parents_tree?: IParentsTreeOfTheCell[];
};



export interface IParentsTreeOfTheCellDocument extends IParentsTreeOfTheCellSchema ,Document {
};

export interface IParentsTreeOfTheCellModel extends Model<IParentsTreeOfTheCellDocument> {
};