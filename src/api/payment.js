import client from "./client";
import { getToken } from "../utils/helper.jsx";
import { catchError } from "../utils/helper.jsx";


export const getAnAcceptPaymentPage = async (userId, email, refId, amount, stripeId) => {
    const token = getToken();
    console.log("API pass", userId, email, refId, amount, stripeId);
    try {
        const { data } = await client.post(`/auth/paymentPage`, {
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            params: {
                userId,
                email,
                refId,
                amount,
                stripeId
            }
        });
        // console.log("Data API",data);
        return data;
    }
    catch (error) {
        return catchError(error);
    }
}