// dependencies.
import dotenv from 'dotenv';

// interface typing.
import { IDeletedElements, IElement, IInsertedElement,
    IUpdatedIntervalsInput, IUpdatedIntervalsOutput, IGetElementsList,
    IupdatedPositionOfTheElements
} from './elements.types';

// local file.
import { DbConnection } from '../database';

dotenv.config();

/* 
    Insert new element in database
*/
export const insertNewElement = async (element: IElement): Promise<IInsertedElement> => {
    const requestDescription = `
        Insert new element.
        Argument 'element' passed : ${element}.              
        `;

    try {
        const response = await new Promise((resolve, reject) => {
            const query :string =   `INSERT INTO ${process.env.TABLE_ELEMENT}
                                    (   TITLE,
                                        DESCRIPTION,
                                        POSITION,
                                        PARENT_ID,
                                        INTERVAL_INPUT,
                                        INTERVAL_OUTPUT,
                                        TREE_LEVEL,
                                        FILE_ID
                                    )
                                    VALUES (?,?,?,?,?,?,?,?);
                                    `;

            DbConnection.query(query,
                [   element.TITLE, 
                    element.DESCRIPTION, 
                    element.POSITION, 
                    element.PARENT_ID,
                    element.INTERVAL_INPUT,
                    element.INTERVAL_OUTPUT, 
                    element.TREE_LEVEL, 
                    element.FILE_ID
                ],
                (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                }
            );
        });
        
        return {
            request_description: requestDescription,
            error: false,
            inserted_element: response,
        }

    } catch (error) {
        console.log(error);
        return {
            request_description: requestDescription,
            error: true,
            message_error: error
        };
    };
};

/* 
    Delete elements and all children.
*/
export const deleteElementsBetweenIntervalInputAndOutput = async (
    elementIntervalInput: number,
    elementIntervalOutput: number,
    elementFileID: number): Promise<IDeletedElements> => {
    const requestDescription = `
        Delete element between interval input and output.
        Argument 'elementIntervalInput' passed : ${elementIntervalInput}.
        Argument 'elementIntervalOutput' passed : ${elementIntervalOutput}.
        Argument 'elementFileID' passed : ${elementFileID}             
        `;

    try {
        const response = await new Promise((resolve,reject) => {
            const query:string =    `DELETE FROM ${process.env.TABLE_ELEMENT}
                                    WHERE INTERVAL_INPUT >= ?
                                        AND INTERVAL_OUTPUT <= ?
                                        AND FILE_ID = ?
                                    `;
            
            DbConnection.query(query,[elementIntervalInput, elementIntervalOutput, elementFileID ],(err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            }); 
        });

        return {
            request_description: requestDescription,
            error: false,
            deleted_elements: response,
        };
    } catch (error) {
        console.log(error);
        return {
            request_description: requestDescription,
            error: true,
            message_error: error,
        };
    };
};

/* 
    Update to decrease or increase the INTERVAL_INPUT to + 2 or - 2
    for all items with an INTERVAL_INPUT >=
    to the INTERVAL_INPUT passed as argument to the function.
    This function is used when the function of inserting or deleting an element is used.
    This updates the interval tree for items that follow the inserted or deleted item.
*/
export const updateIntervalsInput = async (  intervalInputReferentNumber: number,
                                            fileID: number,
                                            numberReferenceForDecrease: number, 
                                            decreaseOrIncrease: string): Promise<IUpdatedIntervalsInput> => {
    const requestDescription: string = `
        Update to decrease or increase INTERVAL_INPUT. 
        Argument 'intervalInputReferentNumber' passed : ${intervalInputReferentNumber}.
        Argument 'fileID' passed : ${fileID}.
        Argument 'numberReferenceForDecrease' passed : ${numberReferenceForDecrease}.
        Argument 'decreaseOrIncrease' passed : ${decreaseOrIncrease} .
        `;

    try {
        const response = await new Promise((resolve, reject) => {
            const query:string =    `UPDATE ${process.env.TABLE_ELEMENT}
                                    SET INTERVAL_INPUT = INTERVAL_INPUT ${decreaseOrIncrease} ${numberReferenceForDecrease}
                                    WHERE INTERVAL_INPUT >= ?
                                        AND FILE_ID = ?`;
                                        
            DbConnection.query(query,[intervalInputReferentNumber, fileID],
                (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
        });

        return {
            request_description: requestDescription,
            error: false,
            update_increase_interval_input: response,
        }
    } catch (error) {
        console.log(error);
        return {
            request_description: requestDescription,
            error: true,
            message_error: error,
        };
    };
};

/* 
    Update to decrease or increase the INTERVAL_OUTPUT to + 2 or - 2
    for all items with an INTERVAL_OUTPUT >=
    to the INTERVAL_OUTPUT passed as argument to the function.
    This function is used when the function of inserting or deleting an element is used.
    This updates the interval tree for items that follow the inserted or deleted item.
*/
export const updateIntervalsOutput = async ( intervalINputReferentNumber: number,
                                            fileID: number,
                                            numberReferenceForDecrease: number,
                                            decreaseOrIncrease: string): Promise<IUpdatedIntervalsOutput> => {
    const requestDescription: string = `
        Update to decrease or increase INTERVAL_OUTPUT. 
        Argument 'intervalINputReferentNumber' passed : ${intervalINputReferentNumber}.
        Argument 'fileID' passed : ${fileID}.
        Argument 'numberReferenceForDecrease' passed : ${numberReferenceForDecrease}.
        Argument 'decreaseOrIncrease' passed : ${decreaseOrIncrease} .
        `;

    try {
        const response = await new Promise((resolve, reject) => {
            const query:string =    `UPDATE ${process.env.TABLE_ELEMENT}
                                    SET INTERVAL_OUTPUT = INTERVAL_OUTPUT ${decreaseOrIncrease} ${numberReferenceForDecrease}
                                    WHERE INTERVAL_OUTPUT >= ?
                                        AND FILE_ID = ?`;

            DbConnection.query(query,[intervalINputReferentNumber, fileID],
                (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
        });

        return {
            request_description: requestDescription,
            error: false,
            update_increase_interval_output: response,
        }
    } catch (error) {
        console.log(error);
        return {
            request_description: requestDescription,
            error: true,
            message_error: error,
        };
    };
};

/* 
    Get the element(s) list by PARENT_ID.
*/
export const getElementsListByParentID = async (parentID: number, fileID: number): Promise<IGetElementsList> => {

    const requestDescription = `
        Get element(s) list by PARENT_ID.
        Argument 'parentID' passed : ${parentID}.
        Argument 'fileID' passed : ${fileID}.
        `;

    try {
        const response: IElement[] = await new Promise((resolve, reject) => {
            const query =   `SELECT * FROM ${process.env.TABLE_ELEMENT} 
                            WHERE PARENT_ID = ?
                                AND FILE_ID = ?`;

            DbConnection.query(query, [parentID, fileID], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            });
        });
        return {
            request_description: requestDescription,
            error: false, 
            elements_list: response,
        };

    } catch (error) {
        return {
            request_description: requestDescription,
            error: true,
            message_error: error,
        }
    }
};

/* 
    Get the element by POSITION and PARENT_ID.
*/
/* export const getElementByPositionAndParentID = async (position: number, parentID: number): Promise<IGetElement> => {
    const requestDescription: string = `
        Get the element by POSITION and PARENT_ID.
        Argument 'position' passed : ${position}.
        Argument 'parentID' passed : ${parentID}.
    `;

    try {
        const response:any = await new Promise((resolve, reject) => {
            const query =   `SELECT * FROM ${process.env.TABLE_ELEMENT} 
                            WHERE POSITION = ? AND PARENT_ID = ?`;

            DbConnection.query(query, [position,parentID], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            });
        });
        return {
            request_description: requestDescription,
            error: false, 
            element: response,
        };

    } catch (error) {
        console.log(error);
        return {
            request_description: requestDescription,
            error: true,
            message_error: error,
        }
    }
    
}; */

/* 
    Update position of the elements
    This function is use when one element is created or deleted to adjust the position in the UI circle.
*/
export const updatePositionOfTheElements = async (
        elementReferent: IElement,
        decreaseOrIncrease: string,
        ): Promise<IupdatedPositionOfTheElements> => {
    const requestDescription: string = `
        Update position of the element by ID.
        Argument 'elementReferent' passed : ${elementReferent}.
        Argument 'decreaseOrIncrease' passed : ${decreaseOrIncrease}.
    `;

    try {
        const response = await new Promise((resolve, reject) => {
            const query: string =   `UPDATE ${process.env.TABLE_ELEMENT}
                                    SET POSITION = POSITION ${decreaseOrIncrease} 2
                                    WHERE PARENT_ID = ?
                                        AND POSITION >= ?
                                        AND FILE_ID = ?`;

            DbConnection.query(query,
                [elementReferent.PARENT_ID, elementReferent.POSITION, elementReferent.FILE_ID],
                (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            });
        });

        return {
            request_description: requestDescription,
            error: false,
            update_position_of_the_elements: response,
        };
    } catch (error) {
        console.log(error);
        return {
            request_description: requestDescription,
            error: true,
            message_error: error,
        };
    };
};