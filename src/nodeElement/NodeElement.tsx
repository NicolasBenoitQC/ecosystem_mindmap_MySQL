// Framwork
import React, { useState } from 'react';
import io from 'socket.io-client';

// Framwork material-ui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IElement } from '../elements.client.types'

// Local file
import './NodeElement.css';
import { ENDPOINT } from '../localhost';
import { OriginX, OriginY, WidthSvgViewBox } from '../svg-setting';

// Typing of the properties of the stem element component.
interface NodeElementProps {
    nodeElementProps: IElement,
    refreshNodeAndBranches: any,
    returnPreviousNodeElementProps: any;
};

// ---------------------------------------------------------------------------------------
// Node element component. This element generate the element in the center of the mind map. 
// ---------------------------------------------------------------------------------------
export const NodeElement: React.FC<NodeElementProps> = ({
        nodeElementProps, refreshNodeAndBranches, returnPreviousNodeElementProps,
    }) => {

    // setting of the stem element.
    const originX = OriginX;
    const originY = OriginY;
    const nodeElementRadius = (WidthSvgViewBox/2) / 8;
    const radiusAxisRotation = (WidthSvgViewBox/2) / 4;
    const widthTitleField = nodeElementRadius * 2;
    const heightTitleField = nodeElementRadius * 2;

    // State variable.
    const [updateNodeElement, setUpdateNodeElement] = useState(nodeElementProps);
    const [title, setTitle] = useState(nodeElementProps.TITLE);
    const [description, setDescription] = useState(nodeElementProps.DESCRIPTION);
    const [open, setOpen] = useState<boolean>(false);

/* -------------------------------------------------------------------------------------------------
    ----- Function ---------------------------------------------------------------------------------     
---------------------------------------------------------------------------------------------------- */
 
    // Function, open dialog when stem element is double clicked.
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Function, close dialog when button in the dialog is clicked.
    const handleClose = async () => {
        setOpen(false);
    };

    // Function, update the tilte when event is detected in the textfield 'Title'.
    const handleChangeTitle = (event: any) => {
        event.preventDefault();
        let val: string = event.target.value;
        setTitle(val);
    };
    
    // Function, update the description when event is detected in the textfield 'Description'.
    const handleChangeDescription = (event:any) => {
        event.preventDefault();
        setDescription(event.target.value);
    };

    // Fuction, set variable updateNodeElement when a user leaves an input field (textfield).
    const handleOnBlur = () => {
        setUpdateNodeElement({
            ID: nodeElementProps.ID,
            TITLE: title,
            DESCRIPTION: description,
            POSITION: nodeElementProps.POSITION,
            PARENT_ID: nodeElementProps.PARENT_ID,
            INTERVAL_INPUT: nodeElementProps.INTERVAL_INPUT,
            INTERVAL_OUTPUT: nodeElementProps.INTERVAL_OUTPUT,
            TREE_LEVEL: nodeElementProps.TREE_LEVEL,
            FILE_ID: nodeElementProps.FILE_ID,
        });
    };
    
    // Function, saves the change in title and description.
    const saveEditing = async (event:any) => {
        event.preventDefault();
        const socket = io.connect(ENDPOINT);
        socket.emit('update_props_element', updateNodeElement, async () => {
            await refreshNodeAndBranches()
            await handleClose(); 
        });    
    };

    // Function, removes the stem element and all children associated with that stem element.
    // if the stem element is the main stem element all is deleled and the main stem element default is created.
    const deleteElement = async (event:any) => {
        event.preventDefault();
        const socket = io.connect(ENDPOINT);
        socket.emit('delete_element_and_all_child', nodeElementProps , async () => {
            await handleClose(); 
            await returnPreviousNodeElementProps();
        });
        
    }

/* ---------------------------------------------------------------------------------------------------
------------- Render -----------------------------------------------------------------------------    
------------------------------------------------------------------------------------------------------ */
    return (
        <svg>
            <circle className='node-element'
                cx={originX}
                cy={originY}
                r={nodeElementRadius}
                stroke='white'
                strokeWidth='0.3'
                fill='gray'
            />
            <foreignObject
                x={originX - nodeElementRadius}
                y={originY - nodeElementRadius}
                width={widthTitleField}
                height={heightTitleField}
                fontSize='15%' 
                >
                <div className='container-node-element-title' >
                    <div className='node-element-title'>
                        {nodeElementProps.TITLE}
                    </div>
                </div>
            </foreignObject>
            <circle className='axis-of-rotation-of-element'
                cx={originX}
                cy={originY}
                r={radiusAxisRotation}
                fill='none'
                stroke='white'
                strokeWidth='0.1'
            />
            <circle className='node-element'
                cx={originX}
                cy={originY}
                r={nodeElementRadius}
                fillOpacity='0'
                onDoubleClick={handleClickOpen}
            />
            <div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"
                fullWidth={true} maxWidth={'md'}
                >
                    <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                id='filled-basic'
                                label='Title'
                                defaultValue={nodeElementProps.TITLE}
                                onChange={handleChangeTitle}
                                InputLabelProps={{shrink: true}}
                                onBlur={handleOnBlur}
                                autoFocus={true}
                            />
                            <br/>
                            <TextField
                                id='filled-basic'
                                label='Description' 
                                defaultValue={nodeElementProps.DESCRIPTION}                
                                onChange={handleChangeDescription}        
                                fullWidth
                                multiline
                                margin='normal'
                                rowsMax='23'
                                InputLabelProps={{shrink: true}}
                                onBlur={handleOnBlur}
                            />
                            <br />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={deleteElement} color="primary">
                            Delete
                        </Button>
                        <Button onClick={saveEditing} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </svg>
    )
};