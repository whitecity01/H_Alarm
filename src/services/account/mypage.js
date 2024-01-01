import axios from "axios";
import { SERVER_IP } from "constants/api";

/**
 * auth API 요청 Interface
 * @param {String} url 통신 URI
 * @param {String} data 입력 데이터
 * @param {String} params 쿼리 데이터
 * @returns 응답 객체
 */
const myPageAPIInterface = async (url, data = null, params = null) => {
  try {
    const res = await axios.post(`${SERVER_IP}${url}`, data, {
      headers: { "Content-Type": "application/json" },
    });

    console.log(res);
    return res.data;
  } catch (e) {
    console.error("emergency : ", e);
  }
};

const requestEmailVerifyCode = (email) => {
  const res = myPageAPIInterface("/emailVerify", email);
  return res;
};

const requestPwVerify = (password) => {
  const res = myPageAPIInterface("/verify-pw", password);
  return res;
};

const requestPhoneNumberVerifyCode = (password) => {
  const res = myPageAPIInterface("/phone-number-verify", password);
  return res;
};

const changeEmail = (password) => {
  const res = myPageAPIInterface("/phone-number-verify", password);
  return res;
};

const changePw = (password) => {
  const res = myPageAPIInterface("/phone-number-verify", password);
  return res;
};

const changePhoneNumber = (password) => {
  const res = myPageAPIInterface("/phone-number-verify", password);
  return res;
};

export {
  requestEmailVerifyCode,
  requestPwVerify,
  requestPhoneNumberVerifyCode,
  changeEmail,
  changePw,
  changePhoneNumber,
};
