// Dependencies
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// interface typing
import { IGetNodeAndItsBranchesFromLevelZeroOfTheTreeStructure,
    IGetNodeAndItsBranchesFromLevelGreaterThanZeroOfTheTreeStructure,
    IElement, IGetElement, ICreateTheOriginalElement,
    } from '../elements/elements.client.types';
import { IMindMap } from './mindMap.type';

// Component React
import { NodeElement } from '../elements/nodeElement/NodeElement';
import { Element } from '../elements/element/Element';
import { ButtonAddElement } from '../elements/element/ButtonAddElement';

// App file
import './MindMapBuilder.css';
import { ENDPOINT } from '../localhost';
import { WidthSvgViewBox, HeightSvgViewBox } from '../svg-setting';


// ---------------------------------------------------------------------------------------
// Object Mindmap while waiting for the "Mind Map library" page.
// --------------------------------------------------------------------------------------- 
const mindMapSelected: IMindMap[] = [{
    ID: 111,
    TITLE: 'Mind map DEV',
    DESCRIPTION: 'This is the mindmap DEV for build the code',
    STATUS: 0,
}];
// _______________________________________________________________________________________
// _______________________________________________________________________________________

// ---------------------------------------------------------------------------------------
// Mind Map builder component. This is the main page for build each mind map. 
// ---------------------------------------------------------------------------------------
export const MindMapBuilder: React.FC = () => {

    // setting of the template svg.
    const [widthSvgViewBox] = useState(WidthSvgViewBox);
    const [heightSvgViewBox] = useState(HeightSvgViewBox);
    const [svgViewBoxProps] = useState(`0 0 ${widthSvgViewBox} ${heightSvgViewBox}`);

    // State variable
    const [mindMapSelectedID] = useState(mindMapSelected[0].ID);
    const [elements, setElements] = useState<IElement[]>([]);
    const [nodeElement, setNodeElement] = useState<IElement[]>([]);
    const [refresh, setRefresh] = useState<number>(1);
    
    // Effect during the first connection.
    useEffect( () => {
        getNodeAndItsBranchesFromLevelZeroOfTheTreeStructure();
    },[]);

    // Effect to actualize elements.
    useEffect(() => {
        getNodeAndItsBranchesFromLevelGreaterThanZeroOfTheTreeStructure();
    },[refresh]);

/* -------------------------------------------------------------------------------------------------
    ----- Function ---------------------------------------------------------------------------------     
---------------------------------------------------------------------------------------------------- */
    // Get node and its branches from level zero of the tree structure.
    const getNodeAndItsBranchesFromLevelZeroOfTheTreeStructure =  async () => {
        try {
            const socket = io.connect(ENDPOINT);
                socket.emit('get_node_and_its_branches_level_zero_of_the_tree_structure',
                                0, 
                                mindMapSelectedID ,
                                (data: IGetNodeAndItsBranchesFromLevelZeroOfTheTreeStructure) => {
                    //console.log(data);           
                    
                    if (data.node?.elements_list?.length === 0) {
                        
                            socket.emit('create_the_original_element', mindMapSelectedID,
                                (data: ICreateTheOriginalElement) => {
                                    originalElementCreated();
                                    console.log(data);
                            });
                        
                        
                    } else {
                        setNodeElement(data.node?.elements_list);
                        setElements(data.branches?.elements_list);
                        //console.log(data.node?.elements_list[0])
                    };
                });
        } catch (error) {
            console.log({
                request_type: 'function get ecosystem to first connection.',
                error: true,
                message: error,
            });
        };
    };

    // Get the elements of level 0 from the tree structure.
    const getNodeAndItsBranchesFromLevelGreaterThanZeroOfTheTreeStructure = async () => {
        if(refresh > 1) {
            try {
                const socket = io.connect(ENDPOINT);
                    socket.emit('get_node_and_its_branches_from_level_greater_than_zero_of_the_tree_structure', 
                                nodeElement[0]?.FILE_ID,
                                nodeElement[0]?.ID,  
                                (data:IGetNodeAndItsBranchesFromLevelGreaterThanZeroOfTheTreeStructure) => {
                                    setNodeElement(data.node?.element);
                                    setElements(data.branches?.elements_list);
                                    //console.log(data);
                    });
            } catch (error) {
                console.log({
                    request_type: 'function get ecosystem to Actualize.',
                    error: true,
                    message: error,
                });
            };
        }
        
    };

    // Function use when orginal element is created in the function getNodeAndItsBranchesFromLevelZeroOfTheTreeStructure.
    const originalElementCreated = async () => {
        await getNodeAndItsBranchesFromLevelZeroOfTheTreeStructure();
    };

    // Modify the variable 'refresh' to active the useEffect and refresh the node and branches.
    const refreshNodeAndBranches =  async () => {
        setRefresh(refresh+1);
    };

    // Moves the clicked element to the center of the mind map. (element becomes like a node element.)
    const doubleClick =  async (elementSelected:IElement) => {
        setNodeElement([elementSelected]);
        await refreshNodeAndBranches();
    };

    // Go back one level.
    const returnPreviousNodeElement = async  () => {
        if (nodeElement[0].PARENT_ID === 0) {
            await getNodeAndItsBranchesFromLevelZeroOfTheTreeStructure();
            await refreshNodeAndBranches();
        } else {
            const socket = io.connect(ENDPOINT);
            socket.emit('get_element_by_ID', nodeElement[0].PARENT_ID,  async (data:IGetElement) => {
                setNodeElement(data.element);
                await refreshNodeAndBranches();
            }) 
        }
    };

    /* const increaseLevel = async () => {1
        setLevel = Level + 
    } */

    // test database
    const buttonTest = async () => {
        console.log(elements)
        const socket = io.connect(ENDPOINT);
        socket.emit('test', (data:any) => {
            console.log(data);
        })
    } 

/* ---------------------------------------------------------------------------------------------------
    ----- Elements ------------------------------------------------------------------------------------     
------------------------------------------------------------------------------------------------------ */
    
    // Node element element. This element is the element at the center of the mind map.
    const listNodeElement = () => {
        //console.log(nodeElement[0]);
        if (nodeElement[0]) {
            return nodeElement.map((currentNodeElement: IElement) => { 
                return <NodeElement
                            key={currentNodeElement?.POSITION}
                            nodeElementProps={currentNodeElement}
                            refreshNodeAndBranches={refreshNodeAndBranches}
                            returnPreviousNodeElementProps={returnPreviousNodeElement}
                        />
            });
        }; 
    };  

    // Elements elements. These element are the elements around the center element of the mind map.
    const listElements = () => {
        //console.log(elements);
        return elements.map((currentElement: IElement) => {
             return <Element
                    key={currentElement.POSITION}
                    elementProps={currentElement}
                    quantityElements={elements.length}
                    actionDoubleClick={doubleClick} 
                />
        }); 
    };

    // Buttons add elements. These elements are the buttons + between the elements.
    const listbuttonAddElement = () => {
        if (elements.length === 0) {
            return <ButtonAddElement
                key={1}
                position={2}
                quantityElements={elements.length+2}
                nodeElementProps={nodeElement}
                noElement={true}
                elementProps={elements[0]}
                refreshElements={refreshNodeAndBranches}
            />
        } else {
            return elements.map((currentElement: IElement) => {
                return <ButtonAddElement
                        key={currentElement.POSITION}
                        position={currentElement.POSITION}
                        quantityElements={elements.length}
                        nodeElementProps={nodeElement}
                        elementProps= {currentElement}
                        refreshElements={refreshNodeAndBranches}
                        noElement={false}
                    />
            });
        };
    };

/* ---------------------------------------------------------------------------------------------------
    ------------- Render -----------------------------------------------------------------------------    
------------------------------------------------------------------------------------------------------ */
    return (
        <div className='mind-map-builder-container'>
            <div className='svg-container'  >
                <svg 
                    className='svg-content' 
                    version='1.1' 
                    viewBox={svgViewBoxProps}
                >
                    {listNodeElement()}
                    {listElements()}
                    {listbuttonAddElement()}
                </svg>
            </div>

            <div>
                <button onClick={returnPreviousNodeElement}>
                    Previous node
                </button>
                <button onClick={buttonTest}>
                    TEST
                </button>
            </div>
        </div>
    );
};