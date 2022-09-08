import { useMutation } from "@tanstack/react-query";
import { getEmailClassification } from "../api/email";

export default function useScan() {
    const mutation = useMutation(getEmailClassification, {
        onSuccess: (data) => {
            console.log(data);
        }
    });
    return mutation;
}