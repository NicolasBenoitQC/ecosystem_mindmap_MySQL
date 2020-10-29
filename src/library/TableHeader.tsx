//  Framwork
import React from 'react';

// Typing interface
import { ITableHeader } from './table.type';

// local file


// Material-UI
import { createStyles, IconButton, makeStyles, Theme } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import { lightBlue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            cellHead: {
                fontSize: 25,
                paddingLeft: 5,
            },
            avatarAddFolder: {
                backgroundColor: lightBlue[500],
            },
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
export const TableHeader: React.FC<ITableHeader> = () => {
    const classes = useStyles();

    return (
        <TableHead>
            <TableRow>
                <TableCell></TableCell>
                <TableCell width='1%' padding='none'>
                    <Tooltip title='add folder' placement="left">
                        <IconButton aria-label='add folder'>
                            <Avatar className={classes.avatarAddFolder}>
                                <AddIcon aria-label="add folder"/>
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                </TableCell>
                <TableCell className={classes.cellHead} align="center">Name folder</TableCell>
                <TableCell className={classes.cellHead} align="center">Descriptif folder</TableCell>
            </TableRow>
        </TableHead>
    )
};

