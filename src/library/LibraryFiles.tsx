//  Framwork
import React from 'react';

// Typing interface
import { IFileProps } from './table.type';

// App file


// Material-UI
import { createStyles, IconButton, makeStyles } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import AssignmentIcon from '@material-ui/icons/Assignment';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(() =>
    createStyles({
        name: {
            fontSize: 18,
            fontWeight: "bold",
            width:'20%',
        },
    }),
);

/*  ---------------------------------------------------------------------------------------
 Library files generate the files row 
--------------------------------------------------------------------------------------- */
export const LibraryFiles = (props: IFileProps): JSX.Element => {
    const classes = useStyles();
    const row = props.rowProps;

/* ------------- Render ----------------------------------------------------------------------------- */  
    return (
        <TableRow id={row.name_file}>
            <TableCell>
                <AssignmentIcon/>
            </TableCell>
            <TableCell width='5%' padding='none' align="right">
                <Tooltip title='edit file' placement="left">
                    <IconButton aria-label='edit file'>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            </TableCell>
            <TableCell className={classes.name}>{row.name_file}</TableCell>
            <TableCell>{row.description_file}</TableCell>
        </TableRow>
    )
};