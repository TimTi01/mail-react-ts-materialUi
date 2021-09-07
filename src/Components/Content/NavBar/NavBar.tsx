import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Button, ButtonGroup, Collapse, Divider, List, ListItem, ListItemIcon, ListItemText, Toolbar} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import MarkunreadMailboxOutlinedIcon from "@material-ui/icons/MarkunreadMailboxOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import AttachmentIcon from "@material-ui/icons/Attachment";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import FolderIcon from "@material-ui/icons/Folder";

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            width: drawerWidth
        },
        drawerPaper: {
            width: drawerWidth
        },
        button: {
            marginTop: theme.spacing(2),
            marginLeft: theme.spacing(1),
            borderRadius: '20px'
        },
    })
)

export const Drawer = () => {
    const classes = useStyles()
    const [open, setOpen] = useState(true)

    const handleClick = () => {
        setOpen(!open)
    }

    return (
        <div className={classes.root}>
            <Drawer className={classes.drawer} variant='permanent' anchor='left' classes={{paper: classes.drawerPaper}}>
                <Toolbar/>
                <ButtonGroup>
                    <Button
                        onClick={() => console.log('Жмяк')}
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<CreateIcon/>}>
                        Создать
                    </Button>
                    <Button
                        onClick={() => console.log('Обновил')}
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<AutorenewIcon fontSize='large'/>}>
                    </Button>
                </ButtonGroup>
                <List component='nav' aria-label="main mailbox folders">
                    <ListItem button>
                        <ListItemIcon>
                            <MailOutlineOutlinedIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Входящие"/>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <MarkunreadMailboxOutlinedIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Рассылки"/>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <ChatBubbleOutlineOutlinedIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Социальные сети"/>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <AttachmentIcon/>
                        </ListItemIcon>
                        <ListItemText primary="С вложениями"/>
                    </ListItem>
                </List>
                <Divider/>

                <List component='nav'>
                    <ListItem button onClick={handleClick}>
                        {open ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>}
                        <ListItemText primary='Папки'/>
                        <CreateNewFolderIcon color='primary' fontSize='small'/>
                    </ListItem>
                    <Collapse in={open}>
                        <List component='div' disablePadding>
                            <ListItem button>
                                <ListItemIcon>
                                    <FolderIcon/>
                                </ListItemIcon>
                                <ListItemText primary='Папка1'/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <FolderIcon/>
                                </ListItemIcon>
                                <ListItemText primary='Папка2'/>
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </Drawer>
            {/*  ======  */}
        </div>
    )
}