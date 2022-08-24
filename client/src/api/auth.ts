import client from "../lib/client";
import { 
    AuthResult, 
    IsConnectionEmail, 
} from "./types";

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

//이메일 연동 여부 조회 API
export async function getIsConnectionEmail(no: number) {
    const res = await client.get<IsConnectionEmail>(`api/users/${no}`);
    return res.data
}

//회원가입 매개변수 타입
interface RegisterParams {
    id: string;
    name: string;
    password: string;
}

//로그인 매개변수 타입
interface LoginParams {
    id: string;
    password: string;
}

//이메일 연동 여부 조회 매개변수 타입
interface isConnectionEmailParams {
    isConnectionEmail: boolean;
}


