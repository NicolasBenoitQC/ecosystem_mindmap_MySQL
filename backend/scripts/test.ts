import { deleteElementInTree, insertElementInTree } from '../database/cells/cells.helpers.methods';
import { IDeletedElement, IElement, IInsertedElement } from '../database/cells/cells.types';


(async () => {
  const element: IElement = {
    ID: 8,
    TITLE:'title2.2 insert',
    DESCRIPTION: 'insert test',
    POSITION: 4,
    PARENT_ID: 3,
    INTERVAL_INPUT: 8,
    INTERVAL_OUTPUT: 9,
    TREE_LEVEL: 2,
    FILE_ID: 111,
  }

  //const insertElement: IInsertedElement= await insertElementInTree(element);

 /*  console.log(insertElement);
  if (insertElement.error === false) {
    console.log(insertElement.inserted_element);
  } */

  const deleteElement: IDeletedElement = await deleteElementInTree(element);

  console.log(deleteElement);
  if (deleteElement.error ===false) {
    console.log(deleteElement.deleted_element);
  };
})();


























  //Connect();
   // const id: any = '5edc131dab760d30dca2341e'
    /* const cellUpdated =
        {
          _id: '5edc131dab760d30dca2341e',
          title: 'Emmbbbbbb',
          description: 'Emma description',
          positionId: 1,
          titleOfMindMap: 'Dev Mind Map',
          titleStemCell: 'Stem Cell DEV',
          stemCell: false,
        }
 
    // test static methods
    //const update = async () =>{ ( await db.CellModel.updateCell(id,cellUpdated))}
    //await update();

    //const cell = await db.CellModel.find('5edc131dab760d30dca2341e');

    //const numOfCells = (await db.CellModel.find()).length;

    const bool:boolean = true;
    const stemCell = (await db.CellModel.findByStemCell(bool))

    

    console.log({stemCell});

*/    