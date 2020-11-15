// Dependencies
import express from 'express';
import http from 'http';
import socketio from 'socket.io';

// interface typing

// App file
import { DatabaseConnection } from './database/database';
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
import { createFolder } from './database/library/folders/folders.methods';
import { IFoldersAttributes, IInsertedFolder } from './database/library/folders/folders.types';


const app: express.Application = express();
app.use(express.json());

const port = process.env.PORT || 6000;

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

            console.log(createdElement)
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

    socket.on('create_folder', async (folder: IFoldersAttributes, fn) => {
        const createdFolder: IInsertedFolder = await createFolder(folder);
        await fn(createdFolder);

        console.log(createdFolder);
    })
    
    socket.on('test', async (folder , fn) => {
        

    });
});

server.listen(port, () => {
    console.log(`Server started on localhost: ${port}`);
});