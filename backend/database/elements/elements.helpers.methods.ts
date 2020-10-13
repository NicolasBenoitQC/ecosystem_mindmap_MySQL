// dependencies.
import dotenv from 'dotenv';

// interface typing.
import { IDeletedElements, IElement, IInsertedElement,
    IUpdateIntervalInput, IUpdateIntervalOutput, IGetElementsList,
    IGetElement,   
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
    Delete element by id in the databse.
*/
export const deleteElementByID = async (elementID: number): Promise<IDeletedElements> => {
    const requestDescription = `
        Delete element by id.
        Argument 'elementID' passed : ${elementID}.              
        `;

    try {
        const response = await new Promise((resolve,reject) => {
            const query:string =    `DELETE FROM ${process.env.TABLE_ELEMENT}
                                    WHERE ID = ?
                                    `;
            
            DbConnection.query(query,[elementID],(err, results) => {
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
export const updateIntervalInput = async (  intervalInputReferentNumber: number, 
                                            decreaseOrIncrease: string): Promise<IUpdateIntervalInput> => {
    const requestDescription: string = `
        Update to decrease or increase INTERVAL_INPUT. 
        Argument 'intervalInputReferentNumber' passed : ${intervalInputReferentNumber}.
        Argument 'decreaseOrIncrease' passed : ${decreaseOrIncrease} .
        `;

    try {
        const response = await new Promise((resolve, reject) => {
            const query:string =    `UPDATE ${process.env.TABLE_ELEMENT}
                                    SET INTERVAL_INPUT = INTERVAL_INPUT ${decreaseOrIncrease} 2
                                    WHERE INTERVAL_INPUT >= ?`;

            DbConnection.query(query,[intervalInputReferentNumber],
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
export const updateIntervalOutput = async ( intervalOutputReferentNumber: number,
                                            decreaseOrIncrease: string): Promise<IUpdateIntervalOutput> => {
    const requestDescription: string = `
        Update to decrease or increase INTERVAL_OUTPUT. 
        Argument 'intervalOutputReferentNumber' passed : ${intervalOutputReferentNumber}.
        Argument 'decreaseOrIncrease' passed : ${decreaseOrIncrease} .
        `;

    try {
        const response = await new Promise((resolve, reject) => {
            const query:string =    `UPDATE ${process.env.TABLE_ELEMENT}
                                    SET INTERVAL_OUTPUT = INTERVAL_OUTPUT ${decreaseOrIncrease} 2
                                    WHERE INTERVAL_OUTPUT >= ?`;

            DbConnection.query(query,[intervalOutputReferentNumber],
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
export const getElementsListByParentID = async (parentID: number): Promise<IGetElementsList> => {

    const requestDescription = `
        Get element(s) list by PARENT_ID.
        Argument 'parentID' passed : ${parentID}.
        `;

    try {
        const response = await new Promise((resolve, reject) => {
            const query =   `SELECT * FROM ${process.env.TABLE_ELEMENT} 
                            WHERE PARENT_ID = ?`;

            DbConnection.query(query, [parentID], (err, results) => {
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
export const getElementByPositionAndParentID = async (position: number, parentID: number): Promise<IGetElement> => {
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
    
};

