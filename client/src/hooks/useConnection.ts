import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/core";

import { useConnectionState } from "../contexts/ConnectionContext";
import { setConnection } from "../api/connection";

import { RootStackNavigationProp } from "../stacks/types";

export default function useConnection() {
    const [isConnectionEmail, setIsConnectionEmail] = useConnectionState();

    const mutation = useMutation(setConnection, {
        onSuccess: (data) => {
            setIsConnectionEmail(data);
        },
        onError: (error) => {
            console.log(error);
        }
    });
    return mutation;
};