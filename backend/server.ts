import express from 'express';
import { DatabaseConnection } from './database/database';
import http from 'http';
import socketio from 'socket.io';
import { getEcoSystemByStemCellId, getCellByProps_Id, createDefaultStemCell,
        addCell, updatePropsCellById, deleteCellAndAllChilds,
         } from './database/cells/cells.methods';
import { ICell, ICellSchema} from './database/cells/cells.types';
//import { deleteElementInTree, insertElementInTree } from './database/cells/cells.helpers.methods';
import { updateIntervalInput } from './database/elements/elements.helpers.methods';
//import { IElement } from './database/elements/elements.types';

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

    socket.on('get ecosystem',
        async (stemCell_id: string, parentIsMindMap: boolean, fn) => {
            const ecosystem = await getEcoSystemByStemCellId(stemCell_id, parentIsMindMap);
            await fn(ecosystem);

            //console.log(ecosystem)
        }
    );

    socket.on('get cell by _id', 
        async (idCell: string, fn) => {
            const cell = await getCellByProps_Id(idCell);
            await fn(cell);
        
            //console.log(cell);
        }
    );

    socket.on('create default stem cell', 
        async (stemCellId, fn) => {     
            const defaultStemCell = await createDefaultStemCell(stemCellId);  
            await fn(defaultStemCell);
            
            //console.log(defaultStemCell);
        }
    );

    socket.on('add cell', 
        async (cell:ICellSchema, parentTree: string[], fn) => {
            const newCell = await addCell(cell, parentTree);
            await fn(newCell);

            //console.log(newCell)
        }      
    );

    socket.on('update props cell', 
        async (cellUpdated:ICell, fn) => {            
            const updatePropsCell =  await updatePropsCellById(cellUpdated);
            fn(updatePropsCell);
            
            //console.log(updatePropsCell);
        }
    );

    socket.on('delete cell and all child', 
        async (cell: ICell, fn) => {
            const deleteCells = await deleteCellAndAllChilds(cell);
            fn(deleteCells);

            //console.log(deleteCells)
        }
    );

    socket.on('test',
        async (fn) => {
            /* const element: IElement = {
                ID: 12,
                TITLE:'title2.2 insert',
                DESCRIPTION: 'insert test',
                POSITION: 4,
                PARENT_ID: 3,
                INTERVAL_INPUT: 8,
                INTERVAL_OUTPUT: 9,
                TREE_LEVEL: 2,
                FILE_ID: 111,
            }; */

            /* const insertElement: any= await insertNewElement(element);
            fn(insertElement); */
            //console.log(insertElement)
            
            /* const deleteElem: IDeletedElements = await deleteElementByID(element.ID);
            fn(deleteElem); 
            console.log(deleteElem) */

            const update = await updateIntervalInput(8,'-');
            fn(update);
            console.log(update);
        }
    )
});

server.listen(port, () => {
    console.log(`Server started on localhost: ${port}`);
});