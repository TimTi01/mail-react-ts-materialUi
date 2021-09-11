import React from 'react';
import {AppBar, Avatar, Box, IconButton, InputBase, Paper, Toolbar, Typography} from "@material-ui/core";
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import { Search } from "@material-ui/icons";
import {makeStyles, Theme, createStyles} from "@material-ui/core/styles"

const useStyle = makeStyles((theme:Theme) =>
    createStyles({
        appBar: {
            // width: `calc(100% - ${drawerWidth}px)`,
            zIndex: theme.zIndex.drawer + 1,
        },
        toolbar: theme.mixins.toolbar,
        toolbar__input: {
            marginLeft: 20
        },
        input__wrap: {
            display: 'flex',
            alignItems: 'center'
        },
        toolbar__avatar: {
            marginLeft: 'auto'
        }
}))

export const Header = () => {
    const classes = useStyle()

    return (
        <AppBar className={classes.appBar} position="fixed">
            <Toolbar className={classes.toolbar}>
                <Box>
                    <IconButton edge='start' color='inherit'>
                        <AlternateEmailIcon fontSize='large'/>
                        <Typography variant='h4' component='h2'>
                            Mail
                        </Typography>
                    </IconButton>
                </Box>
                <Box className={classes.toolbar__input}>
                    <Paper className={classes.input__wrap} >
                        <InputBase color='secondary' placeholder='Поиск'/>
                        <Search/>
                    </Paper>
                </Box>
                <Avatar className={classes.toolbar__avatar}/>
            </Toolbar>
        </AppBar>
    )
}
