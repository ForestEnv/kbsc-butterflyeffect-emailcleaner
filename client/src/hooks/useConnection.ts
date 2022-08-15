import { useMutation } from '@tanstack/react-query';
import { emailConnection } from '../api/connection';

import authStorage from "../storages/authStorage";

import { useUserState } from '../contexts/UserContext';

export default function useConnection() {
    const [, setUser] = useUserState();

    const mutation = useMutation(emailConnection, {
        onSuccess: (data) => {
            setUser(data.user);
            authStorage.set(data);
            console.log(data);
        },
        onError: (error) => {
            console.log(error);
        }
    });
    return mutation;
}