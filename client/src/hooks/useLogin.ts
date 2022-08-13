import { useMutation } from "@tanstack/react-query";
import {login} from '../api/auth';

import { useNavigation } from "@react-navigation/core";
import { useUserState } from "../contexts/UserContext";
import { RootStackNavigationProp } from "../stacks/types";

export default function useLogin() {
    const [, setUser] = useUserState();
    const navigation = useNavigation<RootStackNavigationProp>();

    const mutation = useMutation(login, {
        onSuccess: (data) => {
            setUser(data.user);
            navigation.pop();
            console.log(data);
        },
        onError: (error) => {
            console.log(error);
        }
    });
    return mutation;
}
