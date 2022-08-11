export interface User {
    id: string;
    name: string;
}

export interface AuthResult {
    jwt: string;
    user: User;
}