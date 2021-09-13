import React, {FC, useState} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import {
    Button,
    ButtonGroup,
    IconButton,
    Collapse,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Dialog,
    DialogActions,
    DialogContent,
    TextField,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import MarkunreadMailboxOutlinedIcon from "@material-ui/icons/MarkunreadMailboxOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import ReportIcon from '@material-ui/icons/Report';
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import FolderIcon from "@material-ui/icons/Folder";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {Folders} from "../../../Types/Types";
import lightBlue from '@material-ui/core/colors/lightBlue';
import red from '@material-ui/core/colors/red';

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            width: drawerWidth - 10,
            [theme.breakpoints.up(1440)]: {
                width: drawerWidth - 130,
            },
            [theme.breakpoints.between('md', 1441)]: {
                width: drawerWidth - 40,
            },
        },
        drawerPaper: {
            width: drawerWidth,
            borderRight: '3px solid #edeef0',
            [theme.breakpoints.up('md')]: {
                width: drawerWidth - 30,
            },
        },
        button: {
            marginTop: theme.spacing(2),
            marginLeft: theme.spacing(1),
            borderRadius: theme.spacing(4),
            backgroundColor: lightBlue[400],
            color: '#fff',
            '&:hover': {
                backgroundColor: lightBlue[400],
            },
        },
        list__ListItem: {
            padding: '3px 16px',
            '&:hover': {
                backgroundColor: '#edeef0',
            },
        },
        listItem__ListItemIcon: {
            minWidth: '40px',
        },
        divider: {
            height: '3px',
            backgroundColor: '#edeef0',
        },
        button_color: {
            color: lightBlue[400],
        },
        folderIcon: {
            minWidth: '40px',
        },
        folderDelButton: {
            padding: '5px 12px',
            '&:hover': {
                color: red[600],
                backgroundColor: 'transparent',
            },
        }
    })
)

function deleteFolder(folderId: number, folders: Folders[], setFolders: any) {
    const newFolders = []
    for (let folder = 0; folder < folders.length; folder++) {
        if (folders[folder].id === folderId) {
            folders.splice(0, 1)
            folder = -1
        } else {
            newFolders.push(folders[folder])
            folders.splice(0, 1)
            folder = -1
        }
    }
    setFolders(newFolders)
}


export const NavBar:FC = () => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [openDialog, setOpenDialog] = useState(false);
    const [folders, setFolders] = useState<Folders[]>([])

    const [value, setValue] = useState("")
    const history = useHistory()

    const handleClick = () => {
        setOpen(!open)

    }
    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleChange = (e: any) => {
        setValue(e.target.value)
    };

    function addFolders() {
        folders.push({id:folders.length, primary: value})
        setFolders(folders)
    }

    return (
        <div className={classes.root}>
            <Drawer className={classes.drawer} variant='permanent' anchor='left' classes={{paper: classes.drawerPaper}}>
                <Toolbar/>
                <ButtonGroup>
                    <Button
                        onClick={() => console.log('Жмяк')}
                        variant="contained"
                        className={classes.button}
                        startIcon={<CreateIcon/>}>
                        Создать
                    </Button>
                    <Button
                        onClick={() => console.log('Обновил')}
                        variant="contained"
                        className={classes.button}
                        startIcon={<AutorenewIcon fontSize='large'/>}>
                    </Button>
                </ButtonGroup>
                <List component='nav' aria-label="main mailbox folders">
                    <ListItem className={classes.list__ListItem} button onClick={() => history.push('/mails')}>
                        <ListItemIcon className={classes.listItem__ListItemIcon}>
                            <MailOutlineOutlinedIcon className={classes.button_color}/>
                        </ListItemIcon>
                        <ListItemText primary="Входящие"/>
                    </ListItem>
                    <ListItem className={classes.list__ListItem} button>
                        <ListItemIcon className={classes.listItem__ListItemIcon}>
                            <MarkunreadMailboxOutlinedIcon className={classes.button_color}/>
                        </ListItemIcon>
                        <ListItemText primary="Рассылки"/>
                    </ListItem>
                    <ListItem className={classes.list__ListItem} button onClick={() => history.push('/social')}>
                        <ListItemIcon className={classes.listItem__ListItemIcon}>
                            <ChatBubbleOutlineOutlinedIcon className={classes.button_color}/>
                        </ListItemIcon>
                        <ListItemText primary="Социальные сети"/>
                    </ListItem>
                    <ListItem className={classes.list__ListItem} button onClick={() => history.push('/spam')}>
                        <ListItemIcon className={classes.listItem__ListItemIcon}>
                            <ReportIcon className={classes.button_color}/>
                        </ListItemIcon>
                        <ListItemText primary="Спам"/>
                    </ListItem>
                </List>
                <Divider className={classes.divider}/>

                <List component='nav'>
                    <ListItem button onClick={handleClick}>
                        {open ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>}
                        <ListItemText primary='Папки'/>
                        <IconButton onClick={() => handleClickOpen()} edge="end" aria-label="delete">
                            <CreateNewFolderIcon className={classes.button_color} fontSize='small'/>
                        </IconButton>

                        <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogContent>
                                <TextField
                                    onChange={handleChange}
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Email Address"
                                    type="email"
                                    value={value}
                                    fullWidth
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Закрыть
                                </Button>
                                <Button onClick={() => addFolders()} color="primary">
                                    Отправить
                                </Button>
                            </DialogActions>
                        </Dialog>

                    </ListItem>
                        <Collapse in={open}>
                            <List component='div' disablePadding>
                                {folders.map((folder:Folders) => (
                                    <ListItem button key={folder.id}>
                                        <ListItemIcon className={classes.folderIcon}>
                                            <FolderIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={folder.primary}/>
                                        <IconButton className={classes.folderDelButton} onClick={() => deleteFolder(folder.id, folders, setFolders)} edge="end" aria-label="delete">
                                            <HighlightOffIcon fontSize='small'/>
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                </List>
            </Drawer>
        </div>
    )
}
