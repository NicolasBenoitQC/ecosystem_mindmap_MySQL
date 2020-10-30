//  Framwork
import React from 'react';

// Typing interface

// Local file
import { LibraryTableToolbar } from './LibraryTableToolbar';
import { LibraryTableContainer } from './LibraryTableContainer';

// Material-UI
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '100%',
    },
  }),
);

/* ---------------------------------------------------------------------------------------
 Library MindMap. This element generate the page to manage and create mind map. 
--------------------------------------------------------------------------------------- */
export const LibraryMindMap = (): JSX.Element => {
    const classes = useStyles();

/* ------------- Render ----------------------------------------------------------------------------- */    
    return (
        <div>
            <Paper className= {classes.paper}>
                <LibraryTableToolbar />
                <LibraryTableContainer />
            </Paper>
        </div>
    );
};
