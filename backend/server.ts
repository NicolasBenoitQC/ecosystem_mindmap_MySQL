// Dependencies
import express from 'express';
import http from 'http';
import socketio from 'socket.io';

// interface typing
import { IFoldersAttributes, IGetFoldersList, IInsertedFolder } from './database/library/folders/folders.types';
import { IFilesAttributes, IInsertedFile, IGetFilesList } from './database/library/files/files.types';
import { IElement,IGetNodeAndItsBranchesFromLevelZeroOfTheTreeStructure,
    IGetNodeAndItsBranchesFromLevelGreaterThanZeroOfTheTreeStructure,
    IGetElement, IUpdatedElements, IDeleteElementAndAllChild,
    ICreateTheOriginalElement, ICreateElement,
 } from './database/elements/elements.types';

// App file
import { DatabaseConnection } from './database/database';
import {getNodeAndItsBranchesFromLevelZeroOfTheTreeStructure,
    getNodeAndItsBranchesFromLevelGreaterThanZeroOfTheTreeStructure,
    getElementByID, updatePropsElementByID, deleteElementAndAllChild,
    createTheOriginalElement, createElement
} from './database/elements/elements.methods'
import { createFolder, getFoldersList } from './database/library/folders/folders.methods';
import { createFile, getFilesList } from './database/library/files/files.methods';

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
    });

    socket.on('create_file', async (file: IFilesAttributes, fn) => {
        const createdFile: IInsertedFile = await createFile(file);
        await fn(createdFile);

        console.log(createdFile);
    });

    socket.on('get_folders_list', async (fn) => {
        const foldersList: IGetFoldersList = await getFoldersList();
        await fn(foldersList);
    });

    socket.on('get_files_list', async (fn) => {
        const filesList: IGetFilesList = await getFilesList();
        await fn(filesList);
    });

    socket.on('test', async (fn) => {
        const get_Folders_List: any = await getFoldersList();

        await fn(get_Folders_List);
    });
});

server.listen(port, () => {
    console.log(`Server started on localhost: ${port}`);
});