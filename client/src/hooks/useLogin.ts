import { useMutation } from "@tanstack/react-query";
import {login} from '../api/auth';

export default function useLogin() {
    const mutation = useMutation(login, {
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.log(error);
        }
    });
    return mutation;
}
