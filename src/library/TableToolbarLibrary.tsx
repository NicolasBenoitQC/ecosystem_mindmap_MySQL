//  Framwork
import React from 'react';

// Typing interface
import { ITableToolBar } from './table.type';

// Material-UI
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const useToolbarStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                paddingLeft: theme.spacing(2),
                paddingRight: theme.spacing(2),
            },
            title: { 
                flex: '1 1 100%',
            },
            search: {
                position: 'relative',
                borderRadius: theme.shape.borderRadius,
                backgroundColor: fade(theme.palette.common.white, 0.15),
                '&:hover': {
                  backgroundColor: fade(theme.palette.common.white, 0.25),
                },
                marginRight: theme.spacing(2),
                marginLeft: 0,
                width: '100%',
                [theme.breakpoints.up('sm')]: {
                  marginLeft: theme.spacing(3),
                  width: 'auto',
                },
            },
            searchIcon: {
                padding: theme.spacing(0, 2),
                height: '100%',
                position: 'absolute',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
            inputRoot: {
                color: 'inherit',
              },
            inputInput: {
                padding: theme.spacing(1, 1, 1, 0),
                // vertical padding + font size from searchIcon
                paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
                transition: theme.transitions.create('width'),
                width: '100%',
                [theme.breakpoints.up('md')]: {
                  width: '20ch',
                },
            },
        }),
    );

// ---------------------------------------------------------------------------------------
// Table tool bar. 
// ---------------------------------------------------------------------------------------
export const TableToolBar: React.FC<ITableToolBar> = () => {

    const classes = useToolbarStyles();
  
    return (
        <Toolbar className = {classes.root} >
            <Typography className={classes.title} variant="h4" id="tableTitle" component="div">
                Library
            </Typography>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div>
        </Toolbar>
    );
};

