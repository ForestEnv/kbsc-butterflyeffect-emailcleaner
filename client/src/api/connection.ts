import client from '../lib/client';
import { EmailConnectionResult } from './types';

//이메일 연동 API
export async function setConnection(params:EmailConnectionParams) {
    const res = await client.post<EmailConnectionResult>(
        'api/email/connection',
        params
    )
    return res.data;
}

//이메일 연동 API
export async function setAddConnection(params:EmailConnectionParams) {
    const res = await client.post<EmailConnectionResult>(
        'api/email/connectionAdd',
        params
    )
    console.log('DATA FROM EXPRESS:', res.data);
    return res.data;
}

//이메일 연동 시 매개변수 타입 설정
interface EmailConnectionParams {
    no: number;
    id: string | undefined;
    email_id: string;
    email_Pw: string;
}