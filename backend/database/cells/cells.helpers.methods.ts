// interface typing.
import { INewCell, IGetCells,
        INewParentsTreeOfTheCellResp, 
        IGetAllIdOfChildCellsResp,
        IParentsTreeOfTheCellDocument,
        IElement,
        IInsertedElement,
        IDeletedElement,
 } from './cells.types';

// Local file.
import { CellModel, ParentsTreeOfTheCellModel } from './cells.model';
import { DbConnection } from '../database';

/*
    Create new cell in database.
    Model : CellModel.
unit test _ done.

okkkkkkkkkkkkkkkkk ------------------------*/
export async function newCell ( 
title: string, description: string, position: number,
idStemCell: number,stemCell?: boolean ): Promise<INewCell> {

const requestType = 'Create new Cell.';

try {
    const response:object = await new Promise((resolve, reject) => {
        const query = `
        INSERT INTO cells_properties
        (title, description,position, idStemCell)
        VALUES (?,?,?,?);
        `;

        DbConnection.query(query, [title, description, position, idStemCell], (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
        });
    });
    //console.log(response);
    return {
        request_type: requestType,
        error: false, 
        cell_created: response,
    };

} catch (error) {
    console.log(error);
    return {
        request_type: requestType,
        error: true,
        message: error,
    }  
}
};

/* 
    Create parent tree of the cell in database.
    Model : ParentsTreeOfTheCellModel.
naaaaaaaaaaaaaaaaa. */
export async function newParentsTreeOfTheCell (parentsArray: string[], cell_id: string): Promise<INewParentsTreeOfTheCellResp> {

const requestType = 'create new parents tree of the cell.'; 

const newParentsTreeOfTheCell: IParentsTreeOfTheCellDocument  = new ParentsTreeOfTheCellModel({
    cellId: cell_id,
    cellLevel: parentsArray.length,
    parentsIdList: parentsArray,
});

const parentsTreeOfTheCellCreated = await newParentsTreeOfTheCell.save()
        .then(newParentsTreeCreated => {return {
                request_type: requestType,
                error: false,
                parents_tree: newParentsTreeCreated,
            }})
        .catch(error => {return {
                request_type: requestType,
                error: true,
                message: error,
            }});
return parentsTreeOfTheCellCreated;
};

/* 
    Get the cell(s) by idStemCell property specified as a parameter of this function.
    { idStemCell: id} 
    Model : CellModel.
unit test _ done. 

okkkkkkkkkkkkkkkkkkkk ------------------------*/
export async function getCellsByPropsIdStemCell (id: string) : Promise<IGetCells> {

    const requestType = 'Get cell(s) by idStemCell.';

    try {
        const response:any = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM cells_properties WHERE idStemCell = ?";

            DbConnection.query(query, [id], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            });
        });
        return {
            request_type: requestType,
            error: false, 
            cells_Request: response,
        };

    } catch (error) {
        return {
            request_type: requestType,
            error: true,
            message: error,
        }
    }
};

/* 
    Get the cell(s) by position and idStemCell property specified as a parameter of this function.
    { positon: position, idStemCell: id} 
    table : cells_properties.
unit test _ done. 

okkkkkkkkkkkkkkkkkkkkkkkkkkkk ------------------------*/
export async function getCellByPositionAndIdStemCell (position: any, id: any): Promise<any> {

    const requestType = 'Get cell(s) by position and idStemCell.';

    try {
        const response:any = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM cells_properties WHERE position = ? AND idStemCell = ?";

            DbConnection.query(query, [position,id], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            });
        });
        return {
            request_type: requestType,
            error: false, 
            cell_Request: response,
        };

    } catch (error) {
        return {
            request_type: requestType,
            error: true,
            message: error,
        }
    }
};

/* 
    Get all document which contains the id in the parensIdList property.
    This request is used to generate the list of each document containing
    the id, the level of the cell id passed as a parameter.
    {parentsIdList: id}
    Model : ParentsTreeOfTheCellModel.
naaaaaaaaaaaaaaaaaaaaaaaaaa _ done. */
export async function getAllIdOfChildCells (id: string): Promise<IGetAllIdOfChildCellsResp> {

const requestType = 'get all id of childs Cells.'

const childsIdList = await ParentsTreeOfTheCellModel.find({parentsIdList: id})
        .then(getChildsCells => {return {
                request_type: requestType,
                error: false,
                parents_tree: getChildsCells,
            }})
        .catch(error => {return {
                request_type: requestType,
                error: true,
                message: error,
            }});
return childsIdList;
};

/* 
    Delete all children cells of the cell deleted.
    Model : CellModel.
naaaaaaaaaaaaaaa _ done. */
export async function deleteAllChildrenCellsOfTheCellDeleted (chidrenIdList: IGetAllIdOfChildCellsResp) {

chidrenIdList.parents_tree.map(async currentId => {
    await CellModel.findByIdAndDelete(currentId.cellId)
        .then(deleteChildCell => {
            return {
                request_type: `Deleted child cell ${currentId.cellId} of model CellModel.`,
                error: false,
                child_cell_deleted: deleteChildCell,
            }
        })
        .catch(error => {
            return {
                request_type: `Deleted child cell ${currentId.cellId} of model CellModel.`,
                error: true,
                message: error,
            }
        });
});
};

/* 
    Delete all parents trees of the children cells of the cell deleted.
    Model : ParentsTreeOfTheCellModel.
naaaaaaaaaaaaaaaaaaa _ done. */
export async function deleteAllParentsTreesOfTheCellDeleted (childrenIdList: IGetAllIdOfChildCellsResp) {
childrenIdList.parents_tree.map(async currentId => {
    await ParentsTreeOfTheCellModel.findByIdAndDelete(currentId._id)
        .then(deleteParentTree => {
            return {
                request_type: `Delete parent tree ${currentId._id} of model ParentsTreeOfTheCellModel.`,
                error: false,
                parent_tree_deleted: deleteParentTree,
            }
        })
        .catch(error => {
            return {
                request_type: `Delete parent tree ${currentId._id} of model ParentsTreeOfTheCellModel.`,
                error: true,
                message: error,
            }
        });
});
};


export async function updatePositionOfTheCellById (position: any, id:any,):  Promise<any>  {
    
    const requestType = `update position cell of the cell_id ${id}` ;

    try {
        const response:any = await new Promise((resolve, reject) => {
            const query = "UPDATE cells_properties SET position=? WHERE id = ?";

            DbConnection.query(query, [position, id], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            });
        });
        //console.log(response);
        return {
            request_type: requestType,
            error: false, 
            update_Cell: response,
        };

    } catch (error) {
        console.log(error);
        return {
            request_type: requestType,
            error: true,
            message: error,
        }  
    }
}

export const insertElementInTree = async (element: IElement):Promise<IInsertedElement> => {
    const requestType = `Function insert element in tree. 
        Update interval input >= ${element.INTERVAL_INPUT}.
        Update interval output >= ${element.INTERVAL_OUTPUT}
        Insert element ${element.TITLE}, parentID: ${element.PARENT_ID}`;
    try {

        /* --
        Update the interval INPUT for all items that are after the item inserted in the tree. 
        The update is done before the insertion.
        -- */
        const responseIntervalInputUpdated: any = await new Promise((resolve, reject) => {
            const queryIntervalInputUpdate : string = `
                UPDATE interval_trees_of_the_cells
                SET INTERVAL_INPUT = INTERVAL_INPUT + 2
                WHERE INTERVAL_INPUT >= ?
            `;

            DbConnection.query(queryIntervalInputUpdate, 
                [element.INTERVAL_INPUT], 
                (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            //
        });
        console.log(responseIntervalInputUpdated);
        /* --
        Update the interval OUTPUT for all items that are after the item inserted in the tree. 
        The update is done before the insertion.
        -- */
        const responseIntervalOutputUpdated: any = await new Promise((resolve, reject) => {
            const queryIntervalOuputUpdate : string = `
                UPDATE interval_trees_of_the_cells
                SET INTERVAL_OUTPUT = INTERVAL_OUTPUT + 2
                WHERE INTERVAL_OUTPUT >= ?
            `;

            DbConnection.query(queryIntervalOuputUpdate,
                [element.INTERVAL_OUTPUT],
                (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            //
        });
        console.log(responseIntervalOutputUpdated);
        /* --
        Insertion of the new element after updating the intervals of the elements 
        that follow it in the tree structure. This function return the result of the insertion.
        -- */
        const responseInsertElementInTree: any = await new Promise((resolve, reject) => {
            const queryInsertElementInTree : string = `
                INSERT INTO interval_trees_of_the_cells
                (TITLE,DESCRIPTION,POSITION,PARENT_ID,INTERVAL_INPUT,INTERVAL_OUTPUT,TREE_LEVEL,FILE_ID)
                VALUES (?,?,?,?,?,?,?,?);
            `;

            DbConnection.query(queryInsertElementInTree,
                [element.TITLE, element.DESCRIPTION, element.POSITION, element.PARENT_ID,
                element.INTERVAL_INPUT, element.INTERVAL_OUTPUT, element.TREE_LEVEL, element.FILE_ID],
                (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
        });
        console.log(responseInsertElementInTree);
        return {
            request_type: requestType,
            error: false,
            inserted_element: responseInsertElementInTree, 
        }
    } catch (error) {
        console.log(error);
        return {
            request_type: requestType,
            error: true,
            message_error: error,
        }
    }
};


export const deleteElementInTree = async (element: IElement): Promise<IDeletedElement> => {
    const requestType = `Function delete element in tree.
        Insert element ${element.TITLE}, parentID: ${element.PARENT_ID}.
        Update interval input >= ${element.INTERVAL_INPUT}.
        Update interval output >= ${element.INTERVAL_OUTPUT}.`;

    try {
        /* --
        Deletion of the new element before updating the intervals of the elements 
        that follow it in the tree structure. This function return the result of the deletion.
        -- */
        const responseDeletedElementInTree: any = await new Promise((resolve, reject) => {
            const queryDeleteElementInTree : string = `
                DELETE FROM interval_trees_of_the_cells
                WHERE ID = ?
            `;

            DbConnection.query(queryDeleteElementInTree,
                [element.ID],
                (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
        });
        // console.log(responseDeletedElementInTree);

        /* --
        Update the interval INPUT for all items that are after the item inserted in the tree. 
        The update is done after the deletion.
        -- */
        const responseIntervalInputUpdated: any = await new Promise((resolve, reject) => {
            const queryIntervalInputUpdate : string = `
                UPDATE interval_trees_of_the_cells
                SET INTERVAL_INPUT = INTERVAL_INPUT - 2
                WHERE INTERVAL_INPUT >= ?
            `;

            DbConnection.query(queryIntervalInputUpdate,
                [element.INTERVAL_INPUT],
                (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
        });
        console.log(responseIntervalInputUpdated);

        /* --
        Update the interval OUTPUT for all items that are after the item inserted in the tree. 
        The update is done after the deletion.
        -- */
        const responseIntervalOutputUpdated: any = await new Promise((resolve,reject) => {
            const queryIntervalOutputUpdate : string =  `
                UPDATE interval_trees_of_the_cells
                SET INTERVAL_OUTPUT = INTERVAL_OUTPUT - 2
                WHERE INTERVAL_OUTPUT >= ?
            `;

            DbConnection.query(queryIntervalOutputUpdate,
                [element.INTERVAL_INPUT],
                (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
        });
        console.log(responseIntervalOutputUpdated);
        
        return {
            request_type: requestType,
            error: false,
            deleted_element: responseDeletedElementInTree, 
        };
    } catch (error) {
        console.log(error);
        return {
            request_type: requestType,
            error: true,
            message_error: error,
        };
    };
};


