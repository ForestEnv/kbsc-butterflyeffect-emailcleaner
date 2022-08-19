import React, {createContext, useContext, useState} from 'react';
import {User} from '../api/types';
import {EmailCount} from '../api/types';

type EmailCountContextState = [EmailCount | null, (emailCount: EmailCount | null) => void];

const EmailCountContext = createContext<EmailCountContextState | null>(null);

export function EmailCountContextProvider({children}: {children: React.ReactNode}) {
    const emailCountState = useState<EmailCount | null>(null);
    return (
        <EmailCountContext.Provider value = {emailCountState}>{children}</EmailCountContext.Provider>
    )
};

//custom hook
export function useEmailCountState() {
    const emailCountState = useContext(EmailCountContext);
    if(!emailCountState){
        throw new Error('EmailCountContext is not used');
    }
    return emailCountState;
}