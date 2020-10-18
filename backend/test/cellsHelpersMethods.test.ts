/* // package
import 'mocha';
import { expect } from 'chai';

// Local file
import { UnitTestDatabaseConnection } from '../database/database';
import { ElementModel, ParentsTreeOfTheElementModel } from '../database/elements/elements.model';
import { getElementByProps_Id } from '../database/elements/elements.methods';
import {getElementsByPropsIdStemElement, newElement, 
        newParentsTreeOfTheElement, getAllIdOfChildElements, 
        deleteAllChildrenElementsOfTheElementDeleted,
        deleteAllParentsTreesOfTheElementDeleted,
                            } from '../database/elements/elements.helpers.methods';
import { IElement } from '../database/elements/elements.types';
import { deleteAllRow } from './helpers';

const _id_MindMap = 0;
let parentsArray:string[];

let stemElement: IElement = {
    id: '',
    title: 'Stem Element _ unit test',
    description: 'description Stem Element _ unit test',
    position: 0,
    //stemElement: true,
    idStemElement: _id_MindMap,
};

let element1: IElement = {
    id: '',
    title: 'Element 1 _ unit test',
    description: 'description Element 1 _ unit test',
    position: 2,
    //stemElement: false,
    idStemElement: stemElement.id,
};

let element2: IElement = {
    id: '',
    title: 'Element 2 _ unit test',
    description: 'description Element 2 _ unit test',
    position: 4,
    //stemElement: false,
    idStemElement: stemElement.id,
};

describe('Helpers methods of communication with the database.', async () => {
    before( async () => {
        await UnitTestDatabaseConnection();
        await deleteAllRow();
    });
    
    after( async () => {
        await deleteAllRow();
    });

    it.only('Create new element in database', async () => {
        const result = await newElement(
                                        stemElement.title, stemElement.description, 
                                        stemElement.position, stemElement.idStemElement
                                    );
                                    
        expect(result.element_created.serverStatus).to.equal(2);
        
        // update stemElement after expect.
        stemElement = result.element_created;
    });

    it.skip('Create parent tree of the element in database', async () => {
        const createElement = await newElement(
                                            element1.title, element1.description, 
                                            element1.position, stemElement.id
                                        );
        element1 = createElement.element_created;
        parentsArray = [stemElement.id];

        const result = await newParentsTreeOfTheElement( parentsArray , element1.id);
        expect(result.error).to.equal(false);
        expect(result.parents_tree.parentsIdList[0]).to.equal(`${stemElement.id}`);
        expect(result.parents_tree.elementLevel).to.equal(parentsArray.length)
        expect(result.parents_tree.elementId).to.equal(`${element1.id}`);
    });

    it('Get element(s) by idStemElement', async () => {
        const result = await getElementsByPropsIdStemElement(stemElement.id);
        expect(result.error).to.equal(false);
        expect(result.elements_Request[0]._id).to.eql(element1.id);
        expect(result.elements_Request[0].title).to.equal(element1.title);
        expect(result.elements_Request[0].description).to.equal(element1.description);
        expect(result.elements_Request[0].position).to.equal(element1.position);
        expect(result.elements_Request[0].idStemElement).to.equal(element1.idStemElement);              
        //expect(result.elements_Request[0].stemElement).to.equal(element1.stemElement);
    });

    it('Get all the elements by idStemElement', async () => {
        const createElement = await newElement(
                                            element2.title, element2.description, 
                                            element2.position, stemElement.id
        );

        element2 = createElement.element_created;

        await newParentsTreeOfTheElement( [`${stemElement.id}`] , `${createElement.element_created._id}`);

        const result = await getElementsByPropsIdStemElement(`${stemElement.id}`);
        expect(result.elements_Request.length).to.equal(2); 
    });

    it('Get the element by _id', async () => {
        const result = await getElementByProps_Id(`${stemElement.id}`);
        expect(result.element_Request[0].title).to.equal('Stem Element _ unit test');
    });

    it.skip('Get all document which contains the id in the parensIdList property', async () => {
        const result = await getAllIdOfChildElements(`${stemElement.id}`);
        expect(result.parents_tree.length).to.equal(2);
    });

    it.skip('Delete all children elements of the element deleted.', async () => {

        const childrenIdList = await getAllIdOfChildElements(`${stemElement.id}`);
        await deleteAllChildrenElementsOfTheElementDeleted(childrenIdList);

        const result = await getElementByProps_Id(childrenIdList.parents_tree[0].elementId);
        expect(result.element_Request.length).to.equal(0);
    });
    
    it.skip('Delete all parents trees of the children elements of the element deleted.', async () => {
        const childrenIdList = await getAllIdOfChildElements(`${stemElement.id}`);
        await deleteAllParentsTreesOfTheElementDeleted(childrenIdList);

        const result = await ParentsTreeOfTheElementModel.find({_id: childrenIdList.parents_tree[0]._id})
        expect(result.length).to.equal(0);
    });
}); */