import client from "./client";
import { getToken } from "../utils/helper.jsx";
import { catchError } from "../utils/helper.jsx";

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

// path to get current pot
export const getCurrentPot = async () => {
  try {
    const { data } = await client.get(`/scholarship/pot`);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

// path to buy ticket
export const buyTicket = async (userId, userData) => {
  const token = getToken();
  try {
    const { data } = await client.post(`/scholarship/enter/${userId}`, userData, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

// path to get donations
export const getDonations = async () => {
  try {
    const { data } = await client.get(`/scholarship/donations`);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

// path to get winner
export const getWinner = async () => {
  try {
    const { data } = await client.get(`/scholarship/previouswinner`);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

// path to get all active winners
export const getAllWinners = async () => {
  const token = getToken();
  try {
    const { data } = await client.get(`/scholarship/winners`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};
// path to get winner by scholarship id
export const getWinnerById = async (userId) => {
  const token = getToken();
  try {
    const { data } = await client.get(`/scholarship/winner/${userId}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
}
// path to close active scholarship
export const setActiveStatus = async (userId, userData) => {
  const token = getToken();
  try {
    const { data } = await client.put(`/scholarship/active/${userId}`, userData, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
}

// path to get user aggregated data
export const getNumberOfUsers = async () => {
  const token = getToken();
  try {
    const { data } = await client.get(`/scholarship/users`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
}

// path to get session data
export const getSessionData = async (transactionAmount) => {
  try {
    const { data } = await client.post(`/stripe/create-checkout-session`, transactionAmount);
    return data;
  } catch (error) {
    return catchError(error);
  }
}
// get session status
export const getSessionStatus = async (sessionId) => {
  try {
    const { data } = await client.get(`/stripe/session-status?session_id=${sessionId}`);
    return data;
  } catch (error) {
    return catchError(error);
  }
}

// path to get active status
export const getActiveStatus = async () => {
  try {
    const { data } = await client.get(`/scholarship/active`);
    return data;
  } catch (error) {
    return catchError(error);
  }
}