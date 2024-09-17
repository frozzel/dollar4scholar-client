import client from "./client";



export const createUser = async (userInfo) => {
  // console.log("User Info", userInfo);
  try {
    const { data } = await client.post("/user/create", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};

export const verifyUserEmail = async (userInfo) => {
  try {
    const { data } = await client.post("/user/verify-email", userInfo);
    return data;
  } catch (error) {
    
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const signInUser = async (userInfo) => {
  try {
    const { data } = await client.post("/user/sign-in", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }

  
};

export const getIsAuth = async (token) => {
  try {
    const { data } = await client.get("/user/is-auth", {
      headers: {
        "Authorization": 'Bearer ' + token,
        accept: "application/json",
      },

    });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }

  
};

export const forgetPassword = async (email) => {
  try {
    const { data } = await client.post("/user/forget-password", {email});
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }

  
};
export const verifyPasswordResetToken = async (token, userId) => {
  try {
    const { data } = await client.post("/user/verify-pass-reset-token", {token, userId});
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }

  
};
export const resetPassword = async (passwordInfo) => {
  try {
    const { data } = await client.post("/user/reset-password", passwordInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};
export const resendEmailVerificationToken = async (userId) => {
  // console.log("User Id", userId);
  try {
    const { data } = await client.post("/user/resend-email-verification-token", {userId});
    // console.log("Data Returned",data);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    console.log("Error",error);
    return { error: error.message || error };
  }
};