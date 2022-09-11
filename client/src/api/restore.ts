import client from '../lib/client';

//복구 이메일 리스트 조회 API
export async function getDeleteEmailList(user_no: number) {
    const res = await client.get<DeleteEmailListResult>(`api/email/deleteTable/${user_no}`);
    console.log('복원 데이터:', res.data);
    return res.data;
};

//복구 실행 API
export async function setRestoreEmailList(params: RestoreParamList){
    console.log('parmasRESTPR:', params);
    const res = await client.post(
        'api/email/restore',
        params
    );
    console.log('복구 실행:', res);
    return res.data;
};

interface DeleteEmailList {
    no: number;
    user_no: number;
    email_id: string;
    sender: string;
    date: string;
    title: string;
    body: string;
    email_no: number;
}

interface DeleteEmailListResult {
    result: DeleteEmailList[]
}

interface RestoreParamList {
    user_no: number;
    email_id:string;
    email_no:number;
    list:number[];
}