import React, {FC} from 'react';
import {NavBar} from "./NavBar/NavBar";
import classes from "./content.module.scss";

export const Content:FC = ({children}) => {
    return (
        <div className={classes.content__container}>
            <NavBar/>
            {children}
        </div>
    )
}
