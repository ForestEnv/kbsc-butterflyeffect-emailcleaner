import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/core";

import { useConnectionState } from "../contexts/ConnectionContext";
import { setConnection } from "../api/connection";

export default function useAddConnection() {

    const mutation = useMutation(setConnection, {
        onSuccess: (data) => {
        },
        onError: (error) => {
            console.log(error);
        }
    });
    return mutation;
};