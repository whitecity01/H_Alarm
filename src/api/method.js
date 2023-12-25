import { axiosForm } from "../utils/utils";

export const updateEmail = async(email) => {
    return await axiosForm(process.env.REACT_APP_SERVER_URL+"/alarm/delete", {email});
}

export const updatePhoneNumber = async(phoneNumber) => {
    return await axiosForm(process.env.REACT_APP_SERVER_URL+"/alarm/delete", {phoneNumber});
}