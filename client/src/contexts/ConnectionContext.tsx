import React, {createContext, useContext, useState} from 'react';
import { EmailConnection } from '../api/types';

type ConnectionContextState = [EmailConnection | null, (isConnectionEmail: EmailConnection | null) => void];

const ConnectionContext = createContext<ConnectionContextState | null>(null);

export function ConnectionContextProvider({children}: {children: React.ReactNode}) {
    const connectionState = useState<EmailConnection | null>(null);
    return (
        <ConnectionContext.Provider value = {connectionState}>
            {children}
        </ConnectionContext.Provider>
    )
};

export function useConnectionState() {
    const connectionState = useContext(ConnectionContext);
    if(!connectionState){
        throw new Error('ConnectionContext is not used');
    }
    return connectionState;
}