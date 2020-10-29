//  Framwork
import React from 'react';

// Typing interface
import { ILibraryMindMap } from './table.type';

// Local file
import { TableToolBar } from './TableToolbarLibrary';
import { TableContainerLibrary } from './TableContainerLibrary';

// Material-UI
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
  }),
);

// ---------------------------------------------------------------------------------------
// Library MindMap. This element generate the page to manage and create mind map. 
// ---------------------------------------------------------------------------------------
export const LibraryMindMap: React.FC<ILibraryMindMap> = () => {

    const classes = useStyles();
// ---------------------------------------------------------------------------------------------------
//------------- Render -----------------------------------------------------------------------------    
//------------------------------------------------------------------------------------------------------ 
    return (
        <div>
            <Paper className= {classes.paper}>
                <TableToolBar />
                <TableContainerLibrary />
            </Paper>
        </div>
    )
};
