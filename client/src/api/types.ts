
export interface User {
    no: number;
    id: string;
    name: string;
    isConnectionEmail: boolean;
}

export interface AuthResult {
    accesstoken: string;
    user: User;
    isRegistered: boolean;
}

export interface EmailConnectionResult {
    accesstoken: string;
    user: User;
}