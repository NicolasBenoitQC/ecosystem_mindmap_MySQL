import express from 'express';
import { DatabaseConnection } from './database/database';
import http from 'http';
import socketio from 'socket.io';
import {getNodeAndItsBranchesFromLevelZeroOfTheTreeStructure,
    getNodeAndItsBranchesFromLevelGreaterThanZeroOfTheTreeStructure,
    getElementByID, updatePropsElementByID, deleteElementAndAllChild,
    createTheOriginalElement, createElement
} from './database/elements/elements.methods'
import { IElement,IGetNodeAndItsBranchesFromLevelZeroOfTheTreeStructure,
    IGetNodeAndItsBranchesFromLevelGreaterThanZeroOfTheTreeStructure,
    IGetElement, IUpdatedElements, IDeleteElementAndAllChild,
    ICreateTheOriginalElement, ICreateElement,
 } from './database/elements/elements.types';

//import { updateIntervalsInput, updateIntervalsOutput } from './database/elements/elements.helpers.methods'

const app = express();
const port = process.env.PORT || 6000;

app.use(express.json());

// --------- Database -----------
DatabaseConnection();
// ------------------------------

// Socket.io --------------------
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', async (socket) => {

    socket.on('get_node_and_its_branches_level_zero_of_the_tree_structure',
        async (parentID: number, fileID: number, fn) => {
            const nodeAndItsBranches: IGetNodeAndItsBranchesFromLevelZeroOfTheTreeStructure = 
                await getNodeAndItsBranchesFromLevelZeroOfTheTreeStructure(parentID, fileID);
            await fn(nodeAndItsBranches);
            
            //console.log(nodeAndItsBranches)
        }
    );

    socket.on('get_node_and_its_branches_from_level_greater_than_zero_of_the_tree_structure',
        async (fileID: number, elementID: number, fn) => {
            const nodeAndItsBranches: IGetNodeAndItsBranchesFromLevelGreaterThanZeroOfTheTreeStructure = 
                await getNodeAndItsBranchesFromLevelGreaterThanZeroOfTheTreeStructure(elementID, fileID);
            await fn(nodeAndItsBranches);

            //console.log(nodeAndItsBranches)
        }
    );


    socket.on('get_element_by_ID', 
        async (elementID: number, fn) => {
            const element: IGetElement = await getElementByID(elementID);
            await fn(element);
        
            //console.log(element);
        }
    );

    socket.on('create_the_original_element', 
        async (fileID: number, fn) => {     
            const originalElement: ICreateTheOriginalElement = await createTheOriginalElement(fileID);  
            await fn(originalElement);
            
            //console.log(originalElement);
        }
    );

    socket.on('create_new_element', 
        async (element: IElement, fn) => {
            const createdElement: ICreateElement = await createElement(element);
            await fn(createdElement);

            //console.log(createdElement)
        }      
    );

    socket.on('update_props_element', 
        async (elementUpdated: IElement, fn) => {            
            const updatePropsElement: IUpdatedElements =  await updatePropsElementByID(elementUpdated);
            fn(updatePropsElement);
            
            //console.log(updatePropsElement);
        }
    );

    socket.on('delete_element_and_all_child', 
        async (element: IElement, fn) => {
            const deleteElements: IDeleteElementAndAllChild = await deleteElementAndAllChild(element);
            fn(deleteElements);

            //console.log(deleteElements)
        }
    );

    socket.on('test',
        async (fn) => {
             /* const element: IElement = {
                ID: 47,
                TITLE:'title0',
                DESCRIPTION: '',
                POSITION: 0,
                PARENT_ID: 0,
                INTERVAL_INPUT: 20,
                INTERVAL_OUTPUT: 25,
                TREE_LEVEL: 0,
                FILE_ID: 111,
            };

             const insertElement: any= await insertNewElement(element);
            fn(insertElement);
            //console.log(insertElement)
            
            
            const deleteElem = await deleteElementAndAllChild(element);
            fn(deleteElem); 
            console.log(deleteElem)
            const update = await updateIntervalsOutput(20, 111, '-');
            fn(update);
            console.log(update); */
        }
    )
});

server.listen(port, () => {
    console.log(`Server started on localhost: ${port}`);
});