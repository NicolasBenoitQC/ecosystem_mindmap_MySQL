//  Framwork
import React from 'react';
import io from 'socket.io-client';

// Typing interface
import { IFoldersAttributes, ICreatedFolder } from './table.type';

// App file
import { ENDPOINT } from '../localhost';

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
export const LibraryTableHeader = (props: any): JSX.Element => {
    const classes = useStyles();

    const newFolder: IFoldersAttributes = {
        name_folder: 'socket io 2222',
        description_folder: 'test des',
        active: true,
    };

    const createFolder = async () => {
        const socket = io.connect(ENDPOINT);
        socket.emit('create_folder', newFolder,async (data: ICreatedFolder) => {
            console.log('create folder !!!!!!!!');
        })
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell></TableCell>
                <TableCell width='1%' padding='none'>
                    <Tooltip title='add folder' placement="left">
                        <IconButton aria-label='add folder' onClick={props.handle_Drawer_Open}>
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

