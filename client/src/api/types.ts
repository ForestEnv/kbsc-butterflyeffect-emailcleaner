import React from "react";

export interface User {
    no: number;
    id: string;
    isConnectionEmail: EmailConnection;
}

export interface AuthResult {
    accesstoken: string;
    user: User;
}

export interface EmailConnection {
    isConnectionEmail: boolean;
}

export interface EmailConnectionResult {
    isConnectionEmail: boolean;
}

export interface IsConnectionEmail {
    isConnectionEmail: boolean;
}

// export interface EmailCount {
//     emailCount: number;
// }