// dependencies.
import dotenv from 'dotenv';

// interface typing.
import { IGetElement, IGetElementsList,
    IElement, ICreateTheOriginalElement, ICreateElement,
    IUpdatedIntervalsInput, IUpdatedIntervalsOutput, IInsertedElement, IUpdatedElements, IupdatedPositionOfTheElements,
    IDeleteElementAndAllChild,
    IGetNodeAndItsBranchesFromLevelZeroOfTheTreeStructure,
    IGetNodeAndItsBranchesFromLevelGreaterThanZeroOfTheTreeStructure,
 } from './elements.types';

// local file.
import { DbConnection } from '../database';
import { getElementsListByParentID, insertNewElement, 
    updateIntervalsInput, updateIntervalsOutput,
    updatePositionOfTheElements, deleteElementsBetweenIntervalInputAndOutput,
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
    get node and its branches from level zero of the tree structure.
*/
export const getNodeAndItsBranchesFromLevelZeroOfTheTreeStructure = async (
        parentID: number,
        fileID: number,
    ): Promise<IGetNodeAndItsBranchesFromLevelZeroOfTheTreeStructure> => {
        const requestDescription: string = `
            Get node and its branches from level zero of the tree structure.
            Argument 'parentID' passed : ${parentID}.
            Argument 'fileID' passed : ${fileID}.
            `;

        try {
            const elementNode: IGetElementsList = await getElementsListByParentID(parentID, fileID);
            const elementsOfTheBranches: IGetElementsList = await getElementsListByParentID(elementNode?.elements_list[0]?.ID, fileID);

            return {
                request_description: requestDescription,
                error: false,
                node: elementNode,
                branches: elementsOfTheBranches,
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

/* 
    get the elements of level 0 from the tree structure.
*/
export const getNodeAndItsBranchesFromLevelGreaterThanZeroOfTheTreeStructure = async (
    elementID: number,
    fileID: number,
): Promise<IGetNodeAndItsBranchesFromLevelGreaterThanZeroOfTheTreeStructure> => {
    const requestDescription: string = `
    Get node and its branches from level greater than zero of the tree structure.
        Argument 'parentID' passed : ${elementID}.
        Argument 'fileID' passed : ${fileID}.
        `;

    try {
        const elementNode: IGetElement = await getElementByID(elementID);
        const elementsOfTheBranches: IGetElementsList = await getElementsListByParentID(elementNode?.element[0].ID, fileID);

        return {
            request_description: requestDescription,
            error: false,
            node: elementNode,
            branches: elementsOfTheBranches,
        };

    } catch (error) {
        console.log(error);
        return {
            request_description: requestDescription,
            error: true,
            message_error: error,                
        }
    }
}

/* 
    Create the original element of the tree structure. 
*/
export const createTheOriginalElement = async (fileID: number): Promise<ICreateTheOriginalElement> => {
    const requestDescription: string = `
        Create origin of the tree.
        Argument 'fileID' passed : ${fileID}.
        `;

    const createOriginalElement: IElement = {
        TITLE: 'The original ELEMENT',
        DESCRIPTION: 'Describe your original element',
        POSITION: 0,
        PARENT_ID: 0,
        INTERVAL_INPUT: 1,
        INTERVAL_OUTPUT: 2,
        TREE_LEVEL: 0,
        FILE_ID: fileID,
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
       const numberReferenceForDecrease: number = 2;
        const updateFollowingIntervalsInput: IUpdatedIntervalsInput = 
            await updateIntervalsInput(newElement.INTERVAL_INPUT, newElement.FILE_ID, numberReferenceForDecrease, '+');
        const updateFollowingIntervalsOutput: IUpdatedIntervalsOutput = 
            await updateIntervalsOutput(newElement.INTERVAL_INPUT, newElement.FILE_ID, numberReferenceForDecrease, '+');

        /* 
            Update position of the elements
            This function is use when one element is created or deleted to adjust the position in the UI circle.
        */
        const updatePosition: IupdatedPositionOfTheElements = await updatePositionOfTheElements(newElement, '+');


        /*
        Insertion of the new element after updating the intervals of the elements that follow it in the tree structure.
        */
        const createElement: IInsertedElement = await insertNewElement(newElement);

        return {
            request_description: requestDescription,
            error: false,
            interval_input_updated: updateFollowingIntervalsInput,
            interval_output_updated: updateFollowingIntervalsOutput,
            update_position_of_the_elements: updatePosition,
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

/* 
    Update title or description of the element by ID
*/
export const updatePropsElementByID = async (updateElement: IElement): Promise<IUpdatedElements> => {
    const requestDescription: string = `
        Update props element by ID.
        Argument 'updateElement' passed : ${updateElement}.
    `;
    try {
        const response: any = await new Promise((resolve, reject) => {
            const query: string =   `UPDATE ${process.env.TABLE_ELEMENT}
                                    SET title = ?, description = ?
                                    WHERE ID = ?
                                    `;
            DbConnection.query(query,
                [updateElement.TITLE, updateElement.DESCRIPTION, updateElement.ID],
                (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                }
            );
        });

        return {
            request_description: requestDescription,
            error: false,
            updated_elements: response,
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
    Delete element and all children in the tree.
*/
export const deleteElementAndAllChild = async (deleteElement: IElement) : Promise<IDeleteElementAndAllChild> => {
    const requestDescription: string = `
        Delete element and all child.
        Argument 'deleteElement' passed : ${deleteElement}.
    `;

    try {
        /* 
            Delete elements and all children.
        */
        const deletedElements = 
                await deleteElementsBetweenIntervalInputAndOutput(
                        deleteElement.INTERVAL_INPUT, 
                        deleteElement.INTERVAL_OUTPUT, 
                        deleteElement.FILE_ID);
        const numberReferenceForDecrease: number = 
            (deleteElement.INTERVAL_OUTPUT - deleteElement.INTERVAL_INPUT) + 1;                       

        /*
            Update the INTERVAL_INPUT and INTERVAL_OUTPUT for all elements that are after the element deleted in the tree. 
        */
        const updateFollowingIntervalsInput: IUpdatedIntervalsInput = 
                await updateIntervalsInput(
                    deleteElement.INTERVAL_INPUT,
                    deleteElement.FILE_ID,
                    numberReferenceForDecrease,
                    '-');
        const updateFollowingIntervalsOutput: IUpdatedIntervalsOutput = 
                await updateIntervalsOutput(
                    deleteElement.INTERVAL_INPUT,
                    deleteElement.FILE_ID,
                    numberReferenceForDecrease,
                    '-');
 
        /* 
            Update position of the elements
            This function is use when one element is created or deleted to adjust the position in the UI circle.
        */
        const updatePosition: IupdatedPositionOfTheElements = 
                await updatePositionOfTheElements(deleteElement, '-');
 
        return {
            request_description: requestDescription,
            error: false,
            delete_elements: deletedElements,
            interval_input_updated: updateFollowingIntervalsInput,
            interval_output_updated: updateFollowingIntervalsOutput,
            update_position_of_the_elements: updatePosition,
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