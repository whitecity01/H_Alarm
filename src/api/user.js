import { axiosForm } from "../utils/utils";

export const createUser = async(email, phoneNumber, password) => {
    return await axiosForm(process.env.REACT_APP_SERVER_URL+"/user/create", {email, phoneNumber, password});
};

export const updateUser = async(phoneNumber, password) => {
    return await axiosForm(process.env.REACT_APP_SERVER_URL+"/user/update", {phoneNumber, password});
};

export const logIn = async(email, password) => {
    return await axiosForm(process.env.REACT_APP_SERVER_URL+"/user/logIn", {email, password});
};

export const logOut = async() => {
    return await axiosForm(process.env.REACT_APP_SERVER_URL+"/user/logOut", {});
};