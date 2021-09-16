import React, {useState, FC} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Mail, spamProps} from '../../../Types/Types'
import {Box, Avatar, Button, Checkbox, Container, Divider, Paper, Toolbar, Grid, IconButton, Typography} from "@material-ui/core";
import ForwardIcon from '@material-ui/icons/Forward';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ReportIcon from '@material-ui/icons/Report';
import DraftsIcon from '@material-ui/icons/Drafts';
import UnsubscribeIcon from '@material-ui/icons/Unsubscribe';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import lightBlue from "@material-ui/core/colors/lightBlue";
import amber from "@material-ui/core/colors/amber";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";


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
        border: '3px solid #edeef0',
        boxShadow: 'none'
    },
    avatar: {
        height: theme.spacing(4),
        width: theme.spacing(4),
        color: '#fff',
        backgroundColor: lightBlue[400],
    },
    maxWidth: {
        maxWidth: '275px',
    },
    divider: {
        height: '3px',
        backgroundColor: '#edeef0',
    },
    mail: {
        borderTop: '1px solid #edeef0',
        borderBottom: '1px solid #edeef0',
    },
    mail__checkbox: {
        '&.Mui-checked': {
            color: '#ffcb00',
        },
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    mail__delIcon: {
        color: red[500],
    },
    mail__delIconDisabled: {
        color: grey[500],
    },
    mail__spamIcon: {
        color: amber[900],
    },
    mail__spamIconDisabled: {
        color: grey[500],
    },
    mail__BoxTitle: {
        width: '260px',
        padding: 0,
    },
    mail__title: {
        maxWidth: '200px',
    },
    mail__body: {
        maxWidth: '300px',
    }
}))

function changeAllMailChecked(mails: Mail[], setMails: any, checkedMain: boolean, setCheckedMain: any, disabled: boolean, setDisabled: any) {
    const newMails = []
    setCheckedMain(checkedMain = !checkedMain)
    for (const mail of mails) {
        if (mail.checked !== checkedMain) {
            mail.checked = !mail.checked
        }
        newMails.push(mail)
    }
    setMails(mails = newMails)

    // enabling the nav.bar
    let mailChecked = mails.find(mail => mail.checked)
    mailChecked ? setDisabled(false) : setDisabled(true)
}

// group checkboxes
function changeMailChecked(oldMails: Mail[], mailId: number, setMails: any, disabled: boolean, setDisabled: any, checkedMain: boolean, setCheckedMain: any) {
    const newMails = []
    for (const mail of oldMails) {
        if (mail.id === mailId) {
            mail.checked = !mail.checked
        }
        newMails.push(mail)
    }

    // enabling the nav.bar
    let newMailChecked = newMails.find(mail => mail.checked === true)
    let newMailNotChecked = newMails.find(mail => mail.checked === false)

    newMailChecked ? setDisabled(false) : setDisabled(true)
    if (newMailNotChecked) {
        setCheckedMain(false)
    }

    setMails(newMails)
}

function delMails(mails:Mail[], setMails:any, checkedMain:boolean) {
    const newMails = []
    for (let mail = 0; mail < mails.length; mail++) {
        if (mails[mail].checked) {
            mails.splice(mail, 1)
            mail = -1
        } else if (!mails[mail].checked) {
            newMails.push(mails[mail])
            mails.splice(mail, 1)
            mail = -1
        }
    }
    setMails(newMails)
}

function getSpamMail(mails:Mail[], setMails:any) {
    for (const mail of mails) {
        if (mail.checked) {
            mail.is_spam = true
            mail.checked = !mail.checked
        }
    }
    setMails(mails)
}

export const Mails:FC<spamProps> = ({mails, setMails}) => {
    const classes = useStyle()
    const [checkedMain, setCheckedMain] = useState(false)
    const [disabled, setDisabled] = useState(true)

    return (
        <Container className={classes.container} maxWidth={"xl"}>
            <Toolbar/>
            <Paper className={classes.paper}>
                <Grid container direction={"column"}>
                    <Grid item container direction={"row"} alignItems={"center"} justifyContent={'flex-start'}>
                        <Box pl={1}>
                            <Checkbox checked={checkedMain || false}
                                      className={classes.mail__checkbox}
                                      color='primary'
                                      onClick={() => changeAllMailChecked(mails, setMails, checkedMain, setCheckedMain, disabled, setDisabled)}
                            />
                        </Box>
                        <Box pl={1}>
                            <Button disabled={true} variant={'text'} startIcon={<ForwardIcon/>}>Переслать</Button>
                        </Box>
                        <Box pl={1}>
                            <Button disabled={disabled}
                                    onClick={() => delMails(mails, setMails, checkedMain)}
                                    variant={'text'}
                                    startIcon={<DeleteForeverIcon className={!disabled ? classes.mail__delIcon : classes.mail__delIconDisabled}/>}
                            >
                                    Удалить
                            </Button>
                        </Box>
                        <Box pl={1}>
                            <Button disabled={disabled} onClick={() => getSpamMail(mails, setMails)}
                                    variant={'text'}
                                    startIcon={<ReportIcon className={!disabled ? classes.mail__spamIcon : classes.mail__spamIconDisabled}/>}
                            >
                                Это спам!
                            </Button>
                        </Box>
                        <Box pl={1}>
                            <Button disabled={true} variant={'text'} startIcon={<DraftsIcon/>}>Прочитано</Button>
                        </Box>
                        <Box pl={1}>
                            <Button disabled={true} variant={'text'} startIcon={<UnsubscribeIcon/>}>Отключить рассылки</Button>
                        </Box>
                        <Box>
                            <IconButton disabled>
                                <MoreHorizIcon/>
                            </IconButton>
                        </Box>
                    </Grid>
                    <Divider className={classes.divider}/>
                    {mails.map((mail: Mail) => {
                        if (!mail.is_spam) {
                            return (
                                <Grid className={classes.mail} key={mail.id} item container zeroMinWidth direction={"row"} alignItems={"center"} justifyContent={'flex-start'}>
                                    <Box pl={1}>
                                        <Checkbox checked={mail.checked || false}
                                                  className={classes.mail__checkbox}
                                                  color='primary'
                                                  onClick={() => changeMailChecked(mails, mail.id, setMails, disabled, setDisabled, checkedMain, setCheckedMain)}
                                        />
                                    </Box>
                                    <Box className={classes.mail__BoxTitle} pr={10} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                                        <Avatar alt={mail.email} className={classes.avatar}/>
                                        <Box pl={1}>
                                            <Typography noWrap className={classes.mail__title}>{mail.email}</Typography>
                                        </Box>
                                    </Box>
                                    <Box pr={2}>
                                        <Typography noWrap className={classes.mail__body}>{mail.name}</Typography>
                                    </Box>
                                    <Box className={classes.maxWidth}>
                                        <Typography noWrap color={'textSecondary'} variant={'body2'}>
                                            {mail.body}
                                        </Typography>
                                    </Box>
                                </Grid>
                            )
                        }
                    })}
                </Grid>
            </Paper>
        </Container>
    )
}