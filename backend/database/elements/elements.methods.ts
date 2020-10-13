// dependencies.
import dotenv from 'dotenv';

// interface typing.
import { IGetElement, IGetElementsList, IGetNodeAndItsBranchesByParentID,
    IElement, IOriginalElement, ICreateOriginalElement, ICreateElement,
    IUpdateIntervalInput, IUpdateIntervalOutput, IInsertedElement
 } from './elements.types';

// local file.
import { DbConnection } from '../database';
import { getElementsListByParentID, insertNewElement, 
    updateIntervalInput, updateIntervalOutput,
 } from './elements.helpers.methods';

dotenv.config();

/* 
    Get the element by ID.
*/
export async function getElementByID (ID: number): Promise<IGetElement> {
    
    const requestDescription = `
        Get element by ID.
        Argument 'ID' passed : ${ID}.
        `;

    try {
        const response:any = await new Promise((resolve, reject) => {
            const query =   `SELECT * FROM ${process.env.TABLE_ELEMENT} 
                            WHERE ID = ?
                            `;

            DbConnection.query(query, [ID], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            });
        });
        return {
            request_description: requestDescription,
            error: false,
            element: response
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
    Get node and its branches by PARENT_ID. 
*/
export const getNodeAndItsBranchesByParentID= async (parentID: number): Promise<IGetNodeAndItsBranchesByParentID> => {
    
    const requestDescription = `
        Get node and its branches by PARENT_ID
        Argument 'parentID' passed : ${parentID}.
        `;

        try {
            const node: IGetElementsList = await getElementsListByParentID(parentID);
            const elementsOfTheBranches: IGetElementsList  = await getElementsListByParentID(node.elements_list[0].ID);

            return {
                    request_description: requestDescription,
                    error: false,
                    node: node,
                    branches: elementsOfTheBranches,
            };
        } catch (error) {
            return {
                    request_description: requestDescription,
                    error: true, 
                    message_error: error
            };    
        };
};

/* 
    Create the original element of the tree structure. 
*/
export const createOriginalElement = async (OriginalElement: IOriginalElement): Promise<ICreateOriginalElement> => {
    const requestDescription: string = `
        Create origin of the tree.
        Argument 'OriginalElement' passed : ${OriginalElement}.
        `;

    const createOriginalElement: IElement = {
        TITLE: OriginalElement.TITLE,
        DESCRIPTION: OriginalElement.DESCRIPTION,
        POSITION: 0,
        PARENT_ID: OriginalElement.PARENT_ID,
        INTERVAL_INPUT: 1,
        INTERVAL_OUTPUT: 2,
        TREE_LEVEL: 0,
        FILE_ID: OriginalElement.FILE_ID
    };

    try {
        const createOriginOfTheTree: IInsertedElement = await insertNewElement(createOriginalElement);

        return {
            request_description: requestDescription,
            error: false,
            origin_of_the_tree_created: createOriginOfTheTree,
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
    Create element in the tree structure. 
*/
export const createElement = async (newElement: IElement): Promise<ICreateElement> => {
    const requestDescription: string = `
        Create element.
        Argument 'newElement' passed : ${newElement}.
        Update INTERVAL_INPUT >= ${newElement.INTERVAL_INPUT}.
        Update INTERVAL_OUTPUT >= ${newElement.INTERVAL_OUTPUT}.
        Insert element ${newElement.TITLE}, parentID: ${newElement.PARENT_ID}.
        `;

    try {
        /*
        Update the INTERVAL_INPUT and INTERVAL_OUTPUT for all elements that are after the element inserted in the tree. 
        The update is done before the insertion.
        */
        const updateFollowingIntervalsInput: IUpdateIntervalInput = await updateIntervalInput(newElement.INTERVAL_INPUT, '+');
        const updateFollowingIntervalsOutput: IUpdateIntervalOutput = await updateIntervalOutput(newElement.INTERVAL_OUTPUT, '+');

        /*
        Insertion of the new element after updating the intervals of the elements that follow it in the tree structure.
        */
        const createElement: IInsertedElement = await insertNewElement(newElement);

        return {
            request_description: requestDescription,
            error: false,
            interval_input_updated: updateFollowingIntervalsInput,
            interval_output_updated: updateFollowingIntervalsOutput,
            element_created: createElement,
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