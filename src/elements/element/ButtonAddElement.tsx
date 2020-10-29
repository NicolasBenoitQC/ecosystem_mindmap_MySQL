// Framwork
import React, { useState } from 'react';
import io from 'socket.io-client';

// Framwork material-ui
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// Local file
import './Element.css'
import { ENDPOINT } from '../../localhost'; 
import { WidthSvgViewBox, HeightSvgViewBox } from '../../svg-setting'
import { IElement } from '../elements.client.types'

// Typing of the properties of the button add element.
export interface ElementProps {
    elementProps: IElement;
    nodeElementProps: IElement[];
    position: number;
    quantityElements: number;
    noElement: boolean;
    refreshElements: any;
}

// ---------------------------------------------------------------------------------------
// Button add element component. These elements are the buttons + between the elements. 
// ---------------------------------------------------------------------------------------
export const ButtonAddElement: React.FC<ElementProps> = ({
                position, quantityElements, nodeElementProps, 
                noElement, elementProps, refreshElements,
    }) => {
    
    // setting of the node element.
    const rotationFormula = 2*Math.PI/(quantityElements *2);
    const originX = WidthSvgViewBox / 2;
    const originY = HeightSvgViewBox / 2;
    const radiusAxisRotation = originX / 4;
    const radiusAdd = originX / 15;
    const positionIdAddElement = position -1;
    const centerOfAddX = originX + ((radiusAxisRotation) * Math.sin(rotationFormula * positionIdAddElement));
    const centerOfAddY = originY - ((radiusAxisRotation) * Math.cos(rotationFormula * positionIdAddElement));

    // State variable.
    const [createElement, setCreateElement] = useState<IElement>();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [dialogState, setDialogState] = useState<boolean>(false);

    // Function, open dialog when node element is double clicked.
    const handleClickOpen= () => {
        setDialogState(true);
    };

    // Function, close dialog when button in the dialog is clicked.
    const handleClose = () => {
        setDialogState(false);
    };

    // Function, update the tilte when event is detected in the textfield 'Title'.
    const handleChangeTitle = (event:any) => {
        event.preventDefault();
        let val: string = event.target.value;
        setTitle(val);
    };

    // Function, update the description when event is detected in the textfield 'Description'.
    const handleChangeDescription = (event:any) => {
        event.preventDefault();
        setDescription(event.target.value);
    };

    // Fuction, set variable createElement when a user leaves an input field (textfield).
    const handleOnBlur = () => {
        if (noElement === true) {
            setCreateElement({ 
                TITLE: title,
                DESCRIPTION: description,
                POSITION: position,
                PARENT_ID: nodeElementProps[0].ID,
                INTERVAL_INPUT: nodeElementProps[0].INTERVAL_INPUT + 1,
                INTERVAL_OUTPUT: nodeElementProps[0].INTERVAL_INPUT + 2,
                TREE_LEVEL: nodeElementProps[0].TREE_LEVEL + 1,
                FILE_ID: nodeElementProps[0].FILE_ID,
               });
       } else {
           const newPosition: number = position + 2
            setCreateElement({ 
                TITLE: title,
                DESCRIPTION: description,
                POSITION: newPosition,
                PARENT_ID: nodeElementProps[0].ID,
                INTERVAL_INPUT: elementProps.INTERVAL_OUTPUT + 1,
                INTERVAL_OUTPUT: elementProps.INTERVAL_OUTPUT + 2,
                TREE_LEVEL: elementProps.TREE_LEVEL,
                FILE_ID: elementProps.FILE_ID,
            });
       };
    };

    // Function, create new element.
    const createNewElement = async (event:any) => {
        event.preventDefault();
        const socket = io.connect(ENDPOINT);
        socket.emit('create_new_element', createElement, (data:any) => {
            setDialogState(false);
            refreshElements();
        });
    };

/* ---------------------------------------------------------------------------------------------------
------------- Render -----------------------------------------------------------------------------    
------------------------------------------------------------------------------------------------------ */
    return (
            <svg>
                <foreignObject
                    className='container-add'
                    x={centerOfAddX-1}
                    y={centerOfAddY- 0.9}
                    width={radiusAdd}
                    height={radiusAdd}
                    fontSize='100%'
                >
                    <AddCircleIcon
                        className='add'
                        onClick={handleClickOpen}
                        style={{  
                                fontSize: '10%', 
                                color: 'white',
                                alignItems: 'center',
                                textAlign: 'center',
                                justifyContent: 'center',
                              }}
                    />
                </foreignObject>
                <div>
                    <Dialog open={dialogState} onClose={handleClose} aria-labelledby="form-dialog-title"
                    fullWidth={true} maxWidth={'md'} 
                    >
                        <DialogTitle id="form-dialog-title">Create element</DialogTitle>
                        <DialogContent >
                            <form>
                                <TextField
                                    id='filled-basic'
                                    label='Title'
                                    onChange={handleChangeTitle}
                                    InputLabelProps={{shrink: true}}
                                    onBlur={handleOnBlur}
                                    autoFocus={true}
                                />
                                <br/>
                                <TextField
                                    id='filled-basic'
                                    label='Description'                 
                                    onChange={handleChangeDescription}        
                                    InputLabelProps={{shrink: true}}
                                    onBlur={handleOnBlur}
                                    fullWidth
                                    multiline
                                    margin='normal'
                                    rowsMax='23'
                                />
                                <br />
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={createNewElement} color="primary">
                                Create new element
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </svg>
    );
};

