import React from "react";

//사용자 정보
export interface User {
    no: number;
    id: string;
    isConnectionEmail: EmailConnection;
}

//인증 결과 조회
export interface AuthResult {
    accesstoken: string;
    user: User;
}

//이메일 연동 실행
export interface EmailConnection {
    isConnectionEmail: boolean;
}

//이메일 연동 결과 조회
export interface EmailConnectionResult {
    isConnectionEmail: boolean;
}

//이메일 주소 
export interface EmailAddress {
    email_id: string[];
}

//이메일 개수 조회
export interface EmailCountResult {
    emailCount: number;
    email_address: string;
}

//연동된 사용자의 이메일 주소 & 이메일 수에 대한 배열 
export interface EmailInfoArray {
    Ressult: EmailCountResult[]
}

export interface DeleteNumber {
    deleteNum:number;
}

export interface IsConnectionEmail {
    isConnectionEmail: boolean;
}
