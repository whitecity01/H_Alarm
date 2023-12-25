import { axiosForm } from "../utils/utils";

export const emailAuth = async(email) => {
    return await axiosForm(process.env.REACT_APP_SERVER_URL+"/auth/email", {email});
};

export const checkEmailAuth = async(email, authNumber) => {
    return await axiosForm(process.env.REACT_APP_SERVER_URL+"/auth/check/email", {email, authNumber});
};

export const phoneNumberAuth = async(phoneNumber) => {
    return await axiosForm(process.env.REACT_APP_SERVER_URL+"/auth/phoneNumber", {phoneNumber});
};

export const checkPhoneNumberAuth = async(phoneNumber, authNumber) => {
    return await axiosForm(process.env.REACT_APP_SERVER_URL+"/auth/check/phoneNumber", {phoneNumber, authNumber});
};