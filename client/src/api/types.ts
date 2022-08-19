import React from "react";

export interface User {
    no: number;
    id: string;
    //name: string;
    isConnectionEmail: boolean;
}

export interface AuthResult {
    accesstoken: string;
    user: User;
}

export interface EmailCount {
    emailCount: number;
}

// export interface EmailConnectionResult {
//     //totalEmailCount: number;
//     emailCount:EmailCount;
// }

export interface IsConnectionEmail {
    isConnectionEmail: boolean;
}