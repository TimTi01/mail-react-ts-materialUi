import React, {FC, useEffect, useState} from 'react';
import {Route, Switch} from "react-router-dom";
import {Content} from "../Components/Content/Content";
import {Mails} from "../Components/Content/Mails/Mails";
import {SocialNet} from "../Components/Content/SocialNet/SocialNet";
import {Spam} from "../Components/Content/Spam/Spam";
import {Mail} from "../Types/Types";
import axios from "axios";

export const Routers: FC = () => {
    const [mails, setMails] = useState<Mail[]>([])

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/comments?_limit=3')
            .then(response => setMails(response.data))
    }, [])

    return (
        <>
            <Switch>
                <Route exact path='/' component={Content}/>
                <Route path='/mails' render={(props) => <Mails {...props} mails={mails} setMails={setMails}/>}/>
                <Route path='/social' component={SocialNet}/>
                <Route path='/spam' render={(props) => <Spam {...props} mails={mails} setMails={setMails}/>}/>
            </Switch>
        </>
    )
}
