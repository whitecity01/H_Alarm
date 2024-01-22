import { SIGNIN_IP, SIGNUP_IP, VERIFY_EMAIL_CODE_IP, VERIFY_EMAIL_IP, VERIFY_SMS_CODE_IP, VERIFY_SMS_IP } from "constants/api";
import { axiosInterface } from "services/axiosForm";

const requestLogin = async (email, password) => {
  const res = await axiosInterface(SIGNIN_IP,{email, password});
  return res;
};

const requestRegister = async (email, password, phoneNumber, emailToken, phoneNumberToken) => {
  const res = await axiosInterface(SIGNUP_IP, {email, password, phoneNumber, emailToken, phoneNumberToken});
  return res;
};

const emailVerify = async (email) => {
  const res = await axiosInterface(VERIFY_EMAIL_IP, {email});
  return res;
};

const emailCodeVerify = async (token, number) => {
  return await axiosInterface(VERIFY_EMAIL_CODE_IP, {token, number});
}

const phoneNumberVerify = async (phoneNumber) => {
  const res = await axiosInterface(VERIFY_SMS_IP, {phoneNumber});
  return res;
};

const phoneNumberCodeVerify = async (token, number) => {
  const res = await axiosInterface(VERIFY_SMS_CODE_IP, {token, number});
  return res;
};

export { requestLogin, requestRegister, emailVerify, emailCodeVerify, phoneNumberVerify, phoneNumberCodeVerify};
