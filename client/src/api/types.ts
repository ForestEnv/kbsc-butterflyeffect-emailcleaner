export interface User {
    id: string;
    name: string;
}

export interface AuthResult {
    accesstoken: string;
    user: User;
}