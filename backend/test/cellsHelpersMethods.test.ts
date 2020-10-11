// package
import 'mocha';
import { expect } from 'chai';

// Local file
import { UnitTestDatabaseConnection } from '../database/database';
import { CellModel, ParentsTreeOfTheCellModel } from '../database/cells/cells.model';
import { getCellByProps_Id } from '../database/cells/cells.methods';
import {getCellsByPropsIdStemCell, newCell, 
        newParentsTreeOfTheCell, getAllIdOfChildCells, 
        deleteAllChildrenCellsOfTheCellDeleted,
        deleteAllParentsTreesOfTheCellDeleted,
                            } from '../database/cells/cells.helpers.methods';
import { ICell } from '../database/cells/cells.types';
import { deleteAllRow } from './helpers';

const _id_MindMap = 0;
let parentsArray:string[];

let stemCell: ICell = {
    id: '',
    title: 'Stem Cell _ unit test',
    description: 'description Stem Cell _ unit test',
    position: 0,
    //stemCell: true,
    idStemCell: _id_MindMap,
};

let cell1: ICell = {
    id: '',
    title: 'Cell 1 _ unit test',
    description: 'description Cell 1 _ unit test',
    position: 2,
    //stemCell: false,
    idStemCell: stemCell.id,
};

let cell2: ICell = {
    id: '',
    title: 'Cell 2 _ unit test',
    description: 'description Cell 2 _ unit test',
    position: 4,
    //stemCell: false,
    idStemCell: stemCell.id,
};

describe('Helpers methods of communication with the database.', async () => {
    before( async () => {
        await UnitTestDatabaseConnection();
        await deleteAllRow();
    });
    
    after( async () => {
        await deleteAllRow();
    });

    it.only('Create new cell in database', async () => {
        const result = await newCell(
                                        stemCell.title, stemCell.description, 
                                        stemCell.position, stemCell.idStemCell
                                    );
                                    
        expect(result.cell_created.serverStatus).to.equal(2);
        
        // update stemCell after expect.
        stemCell = result.cell_created;
    });

    it.skip('Create parent tree of the cell in database', async () => {
        const createCell = await newCell(
                                            cell1.title, cell1.description, 
                                            cell1.position, stemCell.id
                                        );
        cell1 = createCell.cell_created;
        parentsArray = [stemCell.id];

        const result = await newParentsTreeOfTheCell( parentsArray , cell1.id);
        expect(result.error).to.equal(false);
        expect(result.parents_tree.parentsIdList[0]).to.equal(`${stemCell.id}`);
        expect(result.parents_tree.cellLevel).to.equal(parentsArray.length)
        expect(result.parents_tree.cellId).to.equal(`${cell1.id}`);
    });

    it('Get cell(s) by idStemCell', async () => {
        const result = await getCellsByPropsIdStemCell(stemCell.id);
        expect(result.error).to.equal(false);
        expect(result.cells_Request[0]._id).to.eql(cell1.id);
        expect(result.cells_Request[0].title).to.equal(cell1.title);
        expect(result.cells_Request[0].description).to.equal(cell1.description);
        expect(result.cells_Request[0].position).to.equal(cell1.position);
        expect(result.cells_Request[0].idStemCell).to.equal(cell1.idStemCell);              
        //expect(result.cells_Request[0].stemCell).to.equal(cell1.stemCell);
    });

    it('Get all the cells by idStemCell', async () => {
        const createCell = await newCell(
                                            cell2.title, cell2.description, 
                                            cell2.position, stemCell.id
        );

        cell2 = createCell.cell_created;

        await newParentsTreeOfTheCell( [`${stemCell.id}`] , `${createCell.cell_created._id}`);

        const result = await getCellsByPropsIdStemCell(`${stemCell.id}`);
        expect(result.cells_Request.length).to.equal(2); 
    });

    it('Get the cell by _id', async () => {
        const result = await getCellByProps_Id(`${stemCell.id}`);
        expect(result.cell_Request[0].title).to.equal('Stem Cell _ unit test');
    });

    it.skip('Get all document which contains the id in the parensIdList property', async () => {
        const result = await getAllIdOfChildCells(`${stemCell.id}`);
        expect(result.parents_tree.length).to.equal(2);
    });

    it.skip('Delete all children cells of the cell deleted.', async () => {

        const childrenIdList = await getAllIdOfChildCells(`${stemCell.id}`);
        await deleteAllChildrenCellsOfTheCellDeleted(childrenIdList);

        const result = await getCellByProps_Id(childrenIdList.parents_tree[0].cellId);
        expect(result.cell_Request.length).to.equal(0);
    });
    
    it.skip('Delete all parents trees of the children cells of the cell deleted.', async () => {
        const childrenIdList = await getAllIdOfChildCells(`${stemCell.id}`);
        await deleteAllParentsTreesOfTheCellDeleted(childrenIdList);

        const result = await ParentsTreeOfTheCellModel.find({_id: childrenIdList.parents_tree[0]._id})
        expect(result.length).to.equal(0);
    });
});