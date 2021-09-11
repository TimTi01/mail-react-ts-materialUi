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


const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            width: drawerWidth - 10,
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

function deleteFolder(folderId: number, folders: Folders[], setFolders: any) {
    // for (const folder of folders) {
    //     if (folder.id === folderId) {
    //         folders.splice(folder.id, 1)
    //     } else {
    //         newFolders.push(folder)
    //     }
    // }
    const newFolders = []
    debugger
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
    const [folders, setFolders] = useState<Folders[]>([
        {id: 0, primary: 'Папка 1'},
        {id: 1, primary: 'Папка 2'},
        {id: 2, primary: 'Папка 3'},
    ])

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
                    <ListItem button onClick={() => history.push('/mails')}>
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
                    <ListItem button onClick={() => history.push('/social')}>
                        <ListItemIcon>
                            <ChatBubbleOutlineOutlinedIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Социальные сети"/>
                    </ListItem>
                    <ListItem button onClick={() => history.push('/spam')}>
                        <ListItemIcon>
                            <ReportIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Спам"/>
                    </ListItem>
                </List>
                <Divider/>

                <List component='nav'>
                    <ListItem button onClick={handleClick}>
                        {open ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>}
                        <ListItemText primary='Папки'/>
                        <IconButton onClick={() => handleClickOpen()} edge="end" aria-label="delete">
                            <CreateNewFolderIcon color='primary' fontSize='small'/>
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
                                        <ListItemIcon>
                                            <FolderIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={folder.primary}/>
                                        <IconButton onClick={() => deleteFolder(folder.id, folders, setFolders)} edge="end" aria-label="delete">
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
