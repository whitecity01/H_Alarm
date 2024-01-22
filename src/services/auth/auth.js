import { axiosInterface } from "services/axiosForm";

const requestLogin = async (email, password) => {
  const res = await axiosInterface("/auth/signin",{email, password});
  return res;
};

const requestRegister = async (email, password, phoneNumber, emailToken, phoneNumberToken) => {
  const res = await axiosInterface("/auth/signup", {email, password, phoneNumber, emailToken, phoneNumberToken});
  return res;
};

const emailVerify = async (email) => {
  const res = await axiosInterface("/verify/email", {email});
  return res;
};

const emailCodeVerify = async (token, number) => {
  return await axiosInterface("/verify/email/number", {token, number});
}

const phoneNumberVerify = async (phoneNumber) => {
  const res = await axiosInterface("/verify/sms", {phoneNumber});
  return res;
};

const phoneNumberCodeVerify = async (token, number) => {
  const res = await axiosInterface("/verify/sms/number", {token, number});
  return res;
};

export { requestLogin, requestRegister, emailVerify, emailCodeVerify, phoneNumberVerify, phoneNumberCodeVerify};
