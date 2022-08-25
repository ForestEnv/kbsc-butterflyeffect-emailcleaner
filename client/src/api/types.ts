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

//이메일 개수 조회
export interface EmailCount {
    email: string;
    emailCount: number;
}

export interface IsConnectionEmail {
    isConnectionEmail: boolean;
}
