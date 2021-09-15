import React, { FC } from 'react';
import './App.css';
import {Container} from "@material-ui/core";
import {Header} from "./Components/Header/Header";
import {Content} from "./Components/Content/Content";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            color: grey[200],
            [theme.breakpoints.up('xl')]: {
                maxWidth: '2100px',
            },
        }
    })
)

const App: FC = ({children}) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Container maxWidth="xl">
                <Header/>
                <Content children={children}/>
            </Container>
        </div>
    );
}

export default App;
