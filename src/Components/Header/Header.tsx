import React from 'react';
import {AppBar, Avatar, Box, IconButton, InputBase, Toolbar, Typography} from "@material-ui/core";
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import { Search } from "@material-ui/icons";
import {makeStyles, Theme, createStyles} from "@material-ui/core/styles"

const useStyle = makeStyles((theme:Theme) =>
    createStyles({
        appBar: {
            // width: `calc(100% - ${drawerWidth}px)`,
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: '#fff',
            boxShadow: 'none',
            borderBottom: '3px solid #edeef0',
            minHeight: '60px',
        },
        toolbar: theme.mixins.toolbar,
        toolbar__input: {
            marginLeft: 20
        },
        iconButton: {
            color: '#000',
            '&:hover': {
                backgroundColor: 'transparent',
            },
        },
        input__wrap: {
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#edeef0',
            borderRadius: '8px',
        },
        wrap__iconButton: {
            color: '#b9b9b9',
            padding: '5px 5px 5px 8px;',
            '&:hover': {
              backgroundColor: 'transparent',
            },
        },
        input__padding: {
            padding: '6px 0 6px',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        toolbar__avatar: {
            width: theme.spacing(4),
            height: theme.spacing(4),
            marginLeft: 'auto'
        }
}))

export const Header = () => {
    const classes = useStyle()

    return (
        <AppBar className={classes.appBar} position="fixed">
            <Toolbar className={classes.toolbar}>
                <Box>
                    <IconButton edge='start' className={classes.iconButton}>
                        <AlternateEmailIcon fontSize='large'/>
                        <Typography variant='h4' component='h2'>
                            Mail
                        </Typography>
                    </IconButton>
                </Box>
                <Box className={classes.toolbar__input}>
                    <Box className={classes.input__wrap} >
                        <IconButton className={classes.wrap__iconButton}>
                            <Search/>
                        </IconButton>
                        {/*<InputBase className={classes.input__padding} color='secondary' placeholder='Поиск'/>*/}
                        <InputBase
                            placeholder="Поиск…"
                            color='secondary'
                            classes={{
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Box>
                </Box>
                <Avatar className={classes.toolbar__avatar}/>
            </Toolbar>
        </AppBar>
    )
}
