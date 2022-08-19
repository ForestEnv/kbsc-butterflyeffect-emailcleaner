import client from '../lib/client';
//import { EmailConnectionResult } from './types';
import { EmailCount } from './types';

//이메일 연동 API
export async function emailConnection(params:EmailConnectionParams) {
    const res = await client.post<EmailCount>(
        'api/email/',
        params
    )
    console.log('DATA FROM EXPRESS:', res);
    return res.data;
}

interface EmailConnectionParams {
    no: number;
    id: string | undefined;
    email: string;
    emailPassword: string;
}