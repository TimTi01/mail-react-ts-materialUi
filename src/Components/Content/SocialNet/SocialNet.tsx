import React, {useEffect, useState, FC} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Mail} from '../../../Types/Types'
import axios from "axios";
import {Box, Avatar, Button, Checkbox, Container, Divider, Paper, Toolbar, Grid, IconButton, Typography} from "@material-ui/core";
import ForwardIcon from '@material-ui/icons/Forward';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ReportIcon from '@material-ui/icons/Report';
import DraftsIcon from '@material-ui/icons/Drafts';
import UnsubscribeIcon from '@material-ui/icons/Unsubscribe';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { deepPurple } from '@material-ui/core/colors';

const useStyle = makeStyles((theme:Theme) => createStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '900px',
        marginTop: theme.spacing(2),
        paddingLeft: 0,
        paddingRight: 0,
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },
    avatar: {
        height: theme.spacing(4),
        width: theme.spacing(4),
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    maxWidth: {
        maxWidth: '275px',
    }
}))

// upper checkbox
// function changeAllMailChecked(mails: Mail[], setMails: (value: (((prevState: Mail[]) => Mail[]) | Mail[])) => void, checkedMain: boolean, setCheckedMain: any, disabled: boolean, setDisabled: any) {
//     setCheckedMain(!checkedMain)
//     for (const mail of mails) {
//         if (mail.checked === checkedMain) {
//             mail.checked = !mail.checked
//         }
//     }
//     let mailChecked = mails.find(mail => mail.checked)
//     mailChecked ? setDisabled(false) : setDisabled(true)
//     setDisabled(!disabled)
// }

function changeAllMailChecked(mails: Mail[], setMails:any, checkedMain: boolean, setCheckedMain:any, disabled: boolean, setDisabled:any) {
    // debugger
    const newMails = []
    setCheckedMain(checkedMain = !checkedMain)
    for (const mail of mails) {
        if (mail.checked !== checkedMain) {
            mail.checked = !mail.checked
        }
        newMails.push(mail)
    }
    setMails(newMails)
    let mailChecked = mails.find(mail => mail.checked)
    mailChecked ? setDisabled(false) : setDisabled(true)
    setDisabled(!disabled)
}

// group checkboxes
function changeMailChecked(oldMails: Mail[], mailId: number, setMails: any, disabled: boolean, setDisabled:any) {
    const newMails = []
    for (const mail of oldMails) {
        if (mail.id === mailId) {
            mail.checked = !mail.checked
        }
        newMails.push(mail)
    }
    let newMailChecked = newMails.find(mail => mail.checked === true)
    newMailChecked ? setDisabled(false) : setDisabled(true)
    setMails(newMails)
}

function delMails(mails:Mail[], setMails:any, checkedMain:boolean) {
    debugger
    const newMails = []
    for (const mail of mails) {
        if (mail.checked) {
            mails.splice(mail.id - 1, 1)
        } else {
            newMails.push(mail)
        }
    }
    setMails(newMails)
    // setMails(mails)
}

export const SocialNet:FC = () => {
    const classes = useStyle()
    const [mails, setMails] = useState<Mail[]>([])
    const [checkedMain, setCheckedMain] = useState(false)
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/comments?_limit=0')
            .then(response => setMails(response.data))
    }, [])

    function checkArray() {
        if (mails.length <= 0) {
            return (
                <Grid container justifyContent='center'>
                    <Grid item>
                        <Typography variant="h2"> Писем неть :(</Typography>
                    </Grid>
                </Grid>
        )
        }
    }

    return (
        <Container className={classes.container} maxWidth={"xl"}>
            <Toolbar/>
            <Paper className={classes.paper} elevation={5}>
                <Grid container direction={"column"}>
                    <Grid item container direction={"row"} alignItems={"center"} justifyContent={'flex-start'}>
                        <Box pl={1}>
                            <Checkbox checked={checkedMain}
                                      onClick={() => changeAllMailChecked(mails, setMails, checkedMain, setCheckedMain, disabled, setDisabled)}
                            />
                        </Box>
                        <Box pl={1}>
                            <Button disabled={disabled} variant={'text'} startIcon={<ForwardIcon/>}>Переслать</Button>
                        </Box>
                        <Box pl={1}>
                            <Button disabled={disabled} onClick={() => {delMails(mails, setMails, checkedMain)}} variant={'text'} startIcon={<DeleteForeverIcon/>}>Удалить</Button>
                        </Box>
                        <Box pl={1}>
                            <Button disabled={disabled} variant={'text'} startIcon={<ReportIcon/>}>Это спам!</Button>
                        </Box>
                        <Box pl={1}>
                            <Button disabled={disabled} variant={'text'} startIcon={<DraftsIcon/>}>Прочитано</Button>
                        </Box>
                        <Box pl={1}>
                            <Button disabled={disabled} variant={'text'} startIcon={<UnsubscribeIcon/>}>Отключить рассылки</Button>
                        </Box>
                        <Box>
                            <IconButton disabled>
                                <MoreHorizIcon/>
                            </IconButton>
                        </Box>
                    </Grid>
                    <Divider/>
                    {checkArray()}
                    {mails.map((mail: Mail) => (
                        <Grid key={mail.id} item container zeroMinWidth direction={"row"} alignItems={"center"} justifyContent={'flex-start'}>
                            <Box pl={1}>
                                {/*<Checkbox checked={mail.checked || checkedMain}*/}
                                {/*          onClick={() => changeMailChecked(mails, mail.id, setMails, disabled, setDisabled)}*/}
                                {/*/>*/}
                                <Checkbox checked={mail.checked}
                                          onClick={() => changeMailChecked(mails, mail.id, setMails, disabled, setDisabled)}
                                />
                            </Box>
                            <Box pr={10} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                                <Avatar alt={mail.email} className={classes.avatar}/>
                                <Box pl={1}>
                                    <Typography>{mail.email}</Typography>
                                </Box>
                            </Box>
                            <Box pr={2}>
                                <Typography>{mail.name}</Typography>
                            </Box>
                            <Box className={classes.maxWidth}>
                                <Typography noWrap color={'textSecondary'} variant={'body2'}>
                                    {mail.body}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Container>
    )
}