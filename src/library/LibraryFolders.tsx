//  Framwork
import React, {useState, useRef, useEffect} from 'react';
import io from 'socket.io-client';

// Typing interface
import { IFolderProps, IFileMindMapRow, IFilesAttributes,
    IInsertedFile, 
} from './table.type';

// App file
import { LibraryFiles } from './LibraryFiles';
import { ENDPOINT } from '../localhost';

// Material-UI
import { Collapse, createStyles, 
    makeStyles, Table, TableHead, 
    Theme, TableRow, TableCell, Tooltip, Avatar, 
    TableBody,
} from '@material-ui/core';
import { green,lightBlue } from '@material-ui/core/colors';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import AddIcon from '@material-ui/icons/Add';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

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
        drawer: {
            width: '100%',
            //height: '50%',
            flexShrink: 0,
          },
          drawerPaper: {
            width: '100%',
            //height: '50%',
            maxHeight: '60%',
          },
          drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-start',
          },
          textField: {
              display: 'flex',
              margin: '0% 5%',
              padding: theme.spacing(3),
              // necessary for content to be below app bar
              ...theme.mixins.toolbar,
          },
          box: {
             justify: 'flex-start',
             alignItems: 'flex-start',
          },
          buttonCreateFile: {
            marginBottom: '6px',
            marginLeft: '16px',
          },
    }),
);

/*  ---------------------------------------------------------------------------------------
 Library folders generate the folders row 
--------------------------------------------------------------------------------------- */
export const LibraryFolders = (props: IFolderProps): JSX.Element => {
    const classes = useStyles();
    const [openFolder, setOpenFolder] = useState(false);
    const [open,setOpen] = useState(false);
    const row = props.rowProps;
    const rowFiles: IFileMindMapRow[] = row.mindMap;


    const [nameFile, setNameFile] = useState<string>('');
    const [descriptionFile, setDescriptionFile] = useState<string>('');
    const [createFile, setCreateFile] = useState<IFilesAttributes>();
    const [checkTitleEmpty, setCheckTitleEmpty] = useState<boolean>(false);
    const [helperTextOfTitle, setHelperTextOfTitle] = useState<string>('');
    const [trigger, setTrigger] = useState<number>(0);
    const inputRef = useRef<any>();

    useEffect(() => {
    },[]);

    // use to fix bug auto focus textfield title when the drawer is open.
    useEffect(() => {
      const timeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
  
      return () => {
        clearTimeout(timeout);
      };
    },[open]);

    // actualise when the new file is created.
    useEffect(() => {
        resetValues()
    },[trigger]);

    // Update the variable 'open' for open the drawer to edit the props of the new file.
    const handleDrawerOpen = async () => {
        setOpen(true);
    };
    
    // Update the variable 'open' for close the drawer.
    const handleDrawerClose = async () => {
        setOpen(false);

    };

    // Update the tilte when event is detected in the textfield 'Title'.
    const handleChangeTitle = async (event:any) => {
        event.preventDefault();
        let val: string = event.target.value;
        setNameFile(val);
        setHelperTextOfTitle(``);
        setCheckTitleEmpty(false);
    };

    // Update the description when event is detected in the textfield 'Description'.
    const handleChangeDescription = async (event:any) => {
        event.preventDefault();
        setDescriptionFile(event.target.value);
    };

    // Set variable createFile when a user leaves an input field (textfield).
    const handleOnBlur = async () => {
        setCreateFile({ 
            name_file: nameFile,
            description_file: descriptionFile,
            active: true,
            folder_id: 1,
        });
    };

    // Reset values when the adding file is completed.
    const resetValues = async () => {
        setNameFile('');
        setDescriptionFile(''); 
        setCreateFile({ 
          name_file: '',
          description_file: '',
          active: true,
          folder_id: 1,

        });
        setHelperTextOfTitle('');
        setCheckTitleEmpty(false);
    };

    // Request to database to add new file to this folder.
    const addNewFileToThisFolder = async () => {
        if (createFile?.name_file) {
          const socket = io.connect(ENDPOINT);
          socket.emit('create_file', createFile,async (data: IInsertedFile) => {
              setTrigger(+1);
              await handleOnBlur();
              await handleDrawerClose();
              console.log(data);
          });
        } else {
          setHelperTextOfTitle(`This field is required, it's should be not empty. 
                                  Please entry the title of the file you want create.`);
          setCheckTitleEmpty(true);
        }    
    };


    const fileRows = () => {
        return rowFiles.map((currentRow) => {
            return <LibraryFiles
                        rowProps={currentRow}
                        />
        });
    };

/* ------------- Render ----------------------------------------------------------------------------- */  
    return (
        <React.Fragment>
            <TableRow id={`Header_of_folder_${row.folderName}`}>
                <TableCell>
                    <FolderOpenIcon/>
                </TableCell>
                <TableCell width='5%' align="right">
                    <IconButton arial-label="expand row" size="small" onClick={() => setOpenFolder(!open)}>
                        {openFolder ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell className={classes.name}>{row.folderName}</TableCell>
                <TableCell >{row.folderDescription}</TableCell>
            </TableRow>
            <TableRow key={`row_${row.folderName}`}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={openFolder} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Table size="small" arial-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell width='1%' padding='none'>
                                            <Tooltip title='create mindmap' placement="bottom">
                                                <IconButton aria-label='create mindmap' onClick={handleDrawerOpen}>
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
                                    {fileRows()} 
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="bottom"
                open={open}
                classes={{
                paper: classes.drawerPaper,
            }}>
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                      <CloseIcon/>
                    </IconButton>
                </div>
                <Divider />
                <form >
                    <TextField
                        inputRef={inputRef}
                        className={classes.textField}
                        id='filled-basic'
                        label='Title'
                        value={nameFile}
                        onChange={handleChangeTitle}
                        InputLabelProps={{shrink: true}}
                        onBlur={handleOnBlur}
                        style={{ width: '50%' }}
                        required={true}
                        helperText={helperTextOfTitle}
                        error={checkTitleEmpty}
                      />
                    <TextField
                        className={classes.textField}
                        id='filled-basic'
                        label='Description'
                        value={descriptionFile}                 
                        onChange={handleChangeDescription}        
                        InputLabelProps={{shrink: true}}
                        onBlur={handleOnBlur}
                        multiline
                        margin='normal'
                        rowsMax='23'
                    />
                </form>
                <div style={{ width: '100%' }}>
                    <Box className={classes.box}>
                        <Button className={classes.buttonCreateFile} onClick={addNewFileToThisFolder} color="primary">
                            Add file
                        </Button>
                    </Box>
                </div>
            </Drawer>
        </React.Fragment>
    );
};
