//  Framwork
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

// Typing interface
import { IFoldersAttributes, ICreatedFolder, IRow } from './table.type';

// App file
import { LibraryTableHeader } from './LibraryTableHeader';
import { LibraryFolders } from './LibraryFolders';
import { ENDPOINT } from '../localhost';


// Material-UI
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const rows: IRow[] = [
    {folderName: 'Agriculture  alternative',
        folderDescription: `
          L’agriculture alternative définit des systèmes de production s’éloignant des méthodes conventionnelles.
          La redécouverte de ces systèmes de production est éclairée par les concepts agroécologiques.
          Ces systèmes aspirent à atteindre des rendements durables tout en valorisant l’ensemble des ressources des agroécosystèmes.`,
        mindMap:[
              {name:'Agroforesterie', 
                  description: `
                      L’agroforesterie est un mode d’exploitation des terres agricoles associant des arbres et des cultures ou de l'élevage.
                      L'association arbres et agricultures présente des avantages considérables notamment dans le domaine de la protection des sols. `,
              },
              {name:'Aquaponie', 
                  description: `
                      L'aquaponie est un système qui unit la culture de plante et l'élevage de poissons ;
                      les plantes sont parfois cultivées sur des billes d'argile, pouvant être irriguées en circuit fermé par de l'eau provenant d'aquarium où sont élevés les poissons.`,
              },
              {name:'Hydroponie', 
                  description: `
                      L’hydroponie ou culture hydroponique, est la culture de plantes réalisée sur un substrat neutre et inerte. 
                      Ce substrat est régulièrement irrigué d’un courant de solution qui apporte des sels minéraux et des nutriments essentiels à la plante.`,
              }
        ],
    },
    {folderName: 'Cylces naturels',
    folderDescription: `
      Processus naturel au cours duquel les elements circulent continuellement sous diverses formes entre les différents milieux de l'environnement (par exemple l'air, l'eau, le sol, les organismes).
      Parmi les cycles naturels, on retrouve les cycles du carbone, de l'azote et du phosphore (cycles des éléments nutritifs) ainsi que le cycle de l'eau.`,
    mindMap:[
            {name:`Cycle de l'azote`, 
             description: `
              Le cycle de l'azote est un cycle biogéochimique qui décrit la succession des modifications subies par les différentes formes de l'azote neutre en formes réactives et vice-versa.`,
            },
            {name:`Cycle du carbone`, 
             description: `
              Le cycle du carbone est le cycle biogéochimique du carbone sur une planète.
              Celui de la Terre est rendu plus complexe par l'existence d'importantes masses d'eau océaniques, et surtout par le fait que la vie y tient une place importante. `,
            },
            {name:`Cycle du phosphore`, 
             description: `
              Le cycle du phosphore est un cycle biogéochimique mettant en jeu le phosphore.
              Le phosphore est un constituant indispensable de la matière organique, même si son importance pondérale est relativement faible par rapport à l'azote ou au potassium. `,
            }
        ],
    },      
  ];

const newFolder: IFoldersAttributes = {
    name_folder: 'socket io 2222',
    description_folder: 'test des',
    active: true,
};

const drawerWidth = 100;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `100%`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginBottom: '100%',
    },
    title: {
      flexGrow: 1,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: '100%',
      flexShrink: 0,
    },
    drawerPaper: {
      width: '100%',
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
    button: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(50),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    box: {
        display: 'flex',
        flexDirection: 'row-reverse', 
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
  }),
);


/*  ---------------------------------------------------------------------------------------
 Table to display all folder and file mindmap.
--------------------------------------------------------------------------------------- */
export const LibraryTableContainer = (): JSX.Element => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [nameFolder, setNameFolder] = useState<string>('');
    const [descriptionFolder, setDescriptionFolder] = useState<string>('');
    const [createFolder, setCreateFolder] = useState<IFoldersAttributes>();

    const handleDrawerOpen = async () => {
        setOpen(true);
    };
    
    const handleDrawerClose = async () => {
        setOpen(false);
    };

    // Function, update the tilte when event is detected in the textfield 'Title'.
    const handleChangeTitle = async (event:any) => {
        event.preventDefault();
        let val: string = event.target.value;
        setNameFolder(val);
    };

    // Function, update the description when event is detected in the textfield 'Description'.
    const handleChangeDescription = async (event:any) => {
        event.preventDefault();
        setDescriptionFolder(event.target.value);
    };

    // Fuction, set variable createElement when a user leaves an input field (textfield).
    const handleOnBlur = async () => {
        setCreateFolder({ 
            name_folder: nameFolder,
            description_folder: descriptionFolder,
            active: true
        });
    };

    const resetValues = async () => {
        setNameFolder('');
        setDescriptionFolder(''); 
    };

    const createNewFolder = async () => {
        const socket = io.connect(ENDPOINT);
        socket.emit('create_folder', createFolder,async (data: ICreatedFolder) => {
            await resetValues();
            await handleOnBlur();
            await handleDrawerClose();

            console.log('create folder !!!!!!!!');
        })
    };
    
    const folderRows = () => {
        return rows.map((currentFolderRow) => {
            return <LibraryFolders
                        rowProps= {currentFolderRow}
                    />
        });
    };

/* ------------- Render ----------------------------------------------------------------------------- */  
    return (
        <TableContainer component={Paper}>
            <main>
                <Table>
                    <LibraryTableHeader
                        handle_Drawer_Open = {handleDrawerOpen}    
                    />
                    {folderRows()}
                </Table>
            </main>
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
                        {theme.direction === 'rtl' ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </div>
                <Divider />
                <form >
                    <TextField
                        className={classes.textField}
                        id='filled-basic'
                        label='Title'
                        value={nameFolder}
                        onChange={handleChangeTitle}
                        InputLabelProps={{shrink: true}}
                        onBlur={handleOnBlur}
                        autoFocus={true}
                        style={{ width: '50%' }}
                        required={true}
                    />
                    <br/>
                    <TextField
                        className={classes.textField}
                        id='filled-basic'
                        label='Description'
                        value={descriptionFolder}                 
                        onChange={handleChangeDescription}        
                        InputLabelProps={{shrink: true}}
                        onBlur={handleOnBlur}
                        multiline
                        margin='normal'
                        rowsMax='23'
                    />
                    <br />
                </form>
                <div style={{ width: '100%' }}>
                    <Box className={classes.box}>
                        <Button  onClick={handleDrawerClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={createNewFolder} color="primary">
                            Create folder
                        </Button>
                        <div style={{ width: '50%' }}/>
                    </Box>
                </div>
            </Drawer>
        </TableContainer>
    );
};