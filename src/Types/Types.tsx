import React from 'react';

export type Mail = {
    id: number,
    name: string,
    email: string,
    body: string,
    checked: boolean,
    is_spam: boolean,
}

export type Folders = {
    id: number,
    primary: string,
}

export interface spamProps {
    mails: Mail[],
    setMails: any,
}