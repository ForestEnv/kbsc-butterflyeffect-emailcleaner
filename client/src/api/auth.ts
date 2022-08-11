import client from "../lib/client";
import { AuthResult, User } from "./types";

//회원가입 API
export async function register(params: RegisterParams) {
    const res = await client.post<AuthResult>(
        '/api/users/register',
        params,
    );
    return res.data;
}

//로그인 API
export async function login(params: LoginParams) {
    const res = await client.post<AuthResult>('/api/users/login', params);
    return res.data;
}

interface RegisterParams {
    username: string;
    email: string;
    password: string;
}

interface LoginParams {
    email: string;
    password: string;
}


