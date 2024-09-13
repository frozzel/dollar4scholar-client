import client from "./client";
import { getToken } from "../utils/helper.jsx";
import { catchError } from "../utils/helper.jsx";


export const getAnAcceptPaymentPage = async (userId, refId, amount, email) => {
    const token = getToken();
    console.log(userId);
    try {
        const { data } = await client.post(`/auth/paymentPage`, {
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            params: {
                refId,
                amount,
                email
            }
        });
        console.log(data);
        return data;
    }
    catch (error) {
        return catchError(error);
    }
}