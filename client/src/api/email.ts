import client from '../lib/client';
import { EmailCount } from './types';
import { DeleteNumber } from './types';

//이메일 개수 조회 API
export async function getEmailCount(no: number) {
    const res = await client.get<EmailCount>(`api/email/count/${no}`);
    return res.data;
};

export async function getDeleteEmailNum(no: number) {
    const res = await client.get<DeleteNumber>(`api/email/${no}`);
    return res.data;
}