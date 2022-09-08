import client from '../lib/client';
import { EmailCount } from './types';
import { DeleteNumber } from './types';

//이메일 개수 조회 API
export async function getEmailCount(no: number) {
    const res = await client.get<EmailCount>(`api/email/count/${no}`);
    return res.data;
};

//스캔 이후 분류된 이메일 리스트 조회 API
export async function getEmailClassification(params:EmailScanParams) {
    const res = await client.post(
        'api/email/predict',
        params
    );
    return res.data;
};

export async function getDeleteEmailNum(no: number) {
    const res = await client.get<DeleteNumber>(`api/email/${no}`);
    return res.data;
}

//이메일 연동 시 매개변수 타입 설정
interface EmailScanParams {
    no: number;
    id: string | undefined;
    email: string;
}