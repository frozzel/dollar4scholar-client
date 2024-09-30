import client from "./client";
import { getToken } from "../utils/helper.jsx";
import { catchError } from "../utils/helper.jsx";


export const getAnAcceptPaymentPage = async (userId, email, refId, amount) => {
    const token = getToken();
    const params = {
        userId,
        email,
        refId,
        amount,
    };
   
    // console.log("API pass", userId, email, refId, amount, stripeId);
    try {
        const { data } = await client.post(`/auth/paymentPage/${userId}`, params, {
            headers: {
                authorization: "Bearer " + token,
            },
            
        });
        // console.log("Data API",data);
        return data;
    }
    catch (error) {
        return catchError(error);
    }
}
export const getAnAcceptPaymentPageDonor = async (userId, email, refId, amount) => {
    const token = getToken();
    const params = {
        userId,
        email,
        refId,
        amount,
    };
   
    try {
        const { data } = await client.post(`/auth/paymentPageDonor/${userId}`, params, {
            headers: {
                authorization: "Bearer " + token,
            },
            
        });
        return data;
    }
    catch (error) {
        return catchError(error);
    }
}