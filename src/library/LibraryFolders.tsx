//  Framwork
import React, {useState} from 'react';

// Typing interface
import { IRows, IFileMindMap } from './table.type';

// local file
import { LibraryFiles } from './LibraryFiles';

// Material-UI
import { Box, Collapse, createStyles, 
    IconButton, makeStyles, Table, TableHead, 
    Theme, TableRow, TableCell, Tooltip, Avatar, TableBody } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { green,lightBlue } from '@material-ui/core/colors';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            cellHead: {
                fontSize: 25,
                paddingLeft: 5,
            },
            avatarAddFolder: {
                backgroundColor: lightBlue[500],
            },
            avatarAddMindmap: {
                fontSize:"small",
                margin: theme.spacing(2),
                backgroundColor: green[500],
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
interface props {
    rowProps: IRows
}

//export default function LibraryFolders ():JSX.Element {
export const LibraryFolders: React.FC<props> = ({rowProps}) => {
    const classes = useStyles();
    const [open,setOpen] = useState(false);

    const rowFiles: IFileMindMap[] = rowProps.mindMap;

    const rowFile = () => {
        return rowFiles.map((currentRow) => {
            return <LibraryFiles
                        rowsProps={currentRow}
                        />
        });
    } 

    return (
        <React.Fragment>
            <TableRow key={rowProps.folderName}>
                <TableCell>
                    <FolderOpenIcon/>
                </TableCell>
                <TableCell width='5%' align="right">
                    <IconButton arial-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell className={classes.name}>{rowProps.folderName}</TableCell>
                <TableCell >{rowProps.folderDescription}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Table size="small" arial-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell width='1%' padding='none'>
                                            <Tooltip title='add file' placement="left">
                                                <IconButton aria-label='add file'>
                                                    <Avatar className={classes.avatarAddMindmap}>
                                                        <AddIcon />
                                                    </Avatar>
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell className={classes.cellHead} align="center">Name mindmap</TableCell>
                                        <TableCell className={classes.cellHead} align="center">Description mindmap</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rowFile()} 
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
};


/*  */