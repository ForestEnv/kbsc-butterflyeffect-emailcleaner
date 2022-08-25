import client from '../lib/client';
import { EmailConnectionResult } from './types';

//이메일 연동 API
export async function setConnection(params:EmailConnectionParams) {
    const res = await client.post<EmailConnectionResult>(
        'api/email/connection',
        params
    )
    console.log('DATA FROM EXPRESS:', res.data);
    return res.data;
}

interface EmailConnectionParams {
    no: number;
    id: string | undefined;
    email: string;
    emailPassword: string;
}