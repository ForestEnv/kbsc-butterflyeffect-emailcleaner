import client from '../lib/client';
import { EmailCount } from './types';

//이메일 개수 조회 API
export async function getEmailCount(no: number) {
    const res = await client.get(`api/email/count/${no}`);
    return res.data;
};