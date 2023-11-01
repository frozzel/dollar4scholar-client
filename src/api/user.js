import client from "./client";
import { getToken } from "../utils/helper.jsx";
import { catchError } from "../utils/helper.jsx";

export const getProfile = async (userId) => {
    const token = getToken();
    try {
        const { data } = await client("/user/profile/"+ userId,{
            headers: {
                authorization: "Bearer " + token,
            },
        });
        return data;
    } catch (error) {
        return catchError(error);
    }
};
export const updateUser = async (userId, userData) => {
    const token = getToken();
    try {
      const { data } = await client.put(`/user/update/${userId}`, userData, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      return data;
    } catch (error) {
      return catchError(error);
    }
  };
// update donor profile
export const updateDonor = async (userId, userData) => {
    const token = getToken();
    try {
      const { data } = await client.put(`/user/donor/${userId}`, userData, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      return data;
    } catch (error) {
      return catchError(error);
    }
  };


// path to update user wallet
export const updateUserWallet = async (userId, userData) => {
  
    const token = getToken();
    try {
      const { data } = await client.post(`/user/wallet/${userId}`, userData, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      return data;
    } catch (error) {
      return catchError(error);
    }
  };

// path to donate to pot
export const donateToPot = async (userId, userData) => {

    const token = getToken();
    try {
      const { data } = await client.post(`/scholarship/donate/${userId}`, userData, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      return data;
    } catch (error) {
      return catchError(error);
    }
  };