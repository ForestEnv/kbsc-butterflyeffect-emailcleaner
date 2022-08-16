
export interface User {
    no: number;
    id: string;
    name: string;
    isConnectionEmail: boolean;
}

export interface AuthResult {
    accesstoken: string;
    user: User;
}

export interface EmailConnectionResult {
    accesstoken: string;
    user: User;
}