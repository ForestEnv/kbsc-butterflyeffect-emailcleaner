import client from '../lib/client';
import { EmailInfoArray } from './types';
import { DeleteNumber } from './types';

//이메일 개수 조회 API
export async function getEmailCount(user_no: number) {
    const res = await client.get<EmailInfoArray>(`api/email/count/${user_no}`);
    return res.data;
};

//연동된 이메일 아이디 조회
export async function getEmailAddress(user_no: number) {
    const res = await client.get(`api/email/inquiry/${user_no}`);
    return res.data.email_id;
}

//스캔 이후 분류된 이메일 리스트 조회 API
export async function getEmailClassification(params: EmailScanParams) {
    console.log('보낼 이메일 아이디:',params.email_id);
    const res = await client.post(
        'api/email/predict',
        params
    );
    return res.data;
};

//이메일 삭제 API
export async function deleteEmail(params: EmailDeleteParams) {
    console.log(params)
    const res = await client.post(
        'api/email/delete',
        params
    );
    console.log('삭제 결과:', res.data);
};

export async function getDeleteEmailNum(no: number) {
    const res = await client.get<DeleteNumber>(`api/email/${no}`);
    return res.data;
}

//이메일 연동 시 매개변수 타입 설정
interface EmailScanParams {
    user_no: number;
    email_id: string;
}

//이메일 삭제 시 매개변수 타입 설정
interface EmailDeleteParams {
    user_no: number;
    email_id: string;
    list: number[];
}

//이메일 아이디 조회 결과값 타입
interface EmailAddressResult {
    email_id: string;
}