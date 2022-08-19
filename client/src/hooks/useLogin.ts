import { useMutation } from "@tanstack/react-query";
import {login} from '../api/auth';
import { applyToken } from "../lib/client";

import authStorage from "../storages/authStorage";

import { useNavigation } from "@react-navigation/core";
import { useUserState } from "../contexts/UserContext";
import { RootStackNavigationProp } from "../stacks/types";

export default function useLogin() {
    const [, setUser] = useUserState();
    const navigation = useNavigation<RootStackNavigationProp>();

    const mutation = useMutation(login, {
        onSuccess: (data) => {
            setUser(data.user);
            //navigation.pop();
            applyToken(data.accesstoken);
            authStorage.set(data);
            /*연동된 이메일이 없으면 ConnectionEmailScreen으로 이동
            있으면 MainTab으로 이동 */
            // const isConnectionEmail = data.user.isConnectionEmail;
            // console.log('연동여부'+isConnectionEmail);
            // if(!isConnectionEmail){
            //     navigation.navigate('Connection');
            // } 
            console.log('로그인 사용자 정보',data);
        },
        onError: (error) => {
            console.log(error);
        }
    });
    return mutation;
}
