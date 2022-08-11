import { useMutation } from "@tanstack/react-query";
import { register } from '../api/auth';

export default function useRegister() {
    const mutation = useMutation(register, {
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.log(error);
        }
    });
    return mutation;
}