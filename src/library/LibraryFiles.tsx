//  Framwork
import React from 'react';

// Typing interface
import { IFileMindMap } from './table.type';

// local file


// Material-UI
import { createStyles, IconButton, makeStyles, Theme } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import AssignmentIcon from '@material-ui/icons/Assignment';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            name: {
                fontSize: 18,
                fontWeight: "bold",
                width:'20%',
            },
        }),
    );

// ---------------------------------------------------------------------------------------
// Table tool bar. 
// ---------------------------------------------------------------------------------------
export const LibraryFiles: React.FC<any>= ({rowsProps}) => {
    const classes = useStyles();
    const row = rowsProps;
    return (
        <TableRow>
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
            <TableCell className={classes.name}>{row.name}</TableCell>
            <TableCell>{row.description}</TableCell>
        </TableRow>
    )

};

/* 

*/

