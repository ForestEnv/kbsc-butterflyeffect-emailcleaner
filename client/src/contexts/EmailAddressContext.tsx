import React, {createContext, useContext, useState} from 'react';
import { EmailAddress } from '../api/types';

type EmailAddressContextState = [string[] | null, (email_id: string[] | null) => void];

const EmailAddressContext = createContext<EmailAddressContextState | null>(null);

export function EmailAddressContextProvider({children}: {children: React.ReactNode}) {
    const emailAddressState = useState<string[] | null>(null);
    return (
        <EmailAddressContext.Provider value={emailAddressState}>
            {children}
        </EmailAddressContext.Provider>
    )
};

export function useEmailAddressState() {
    const emailAddressState = useContext(EmailAddressContext);
    if(!emailAddressState) {
        throw new Error('EmailAddressContext is not used');
    }
    return emailAddressState;
}