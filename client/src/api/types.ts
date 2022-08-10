export interface User {
    email: string;
    username: string;
}

export interface AuthResult {
    jwt: string;
    user: User;
}