import axios from "axios";
import { SERVER_IP } from "constants/api";

/**
 * auth API 요청 Interface
 * @param {String} url 통신 URI
 * @param {String} data 입력 데이터
 * @param {String} params 쿼리 데이터
 * @returns 응답 객체
 */
const authAPIInterface = async (url, data = null, params=null) => {
  try{
    const res = await axios.post(`${SERVER_IP}${url}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  }catch(e){
    switch (e.response.status) {
      case 400:
        throw new Error("잘못된 입력");
      case 401:
        throw new Error("인증 실패");
      default:
        throw new Error(`서버 에러: ${e.response.status}`);
    }
  }
};

const requestLogin = async (data) => {
  const res = await authAPIInterface("/login", data);
  return res;
};

const requestRegister = async (data) => {
  const res = await authAPIInterface("/register", data);
  return res;
};

const emailVerify = async (email) => {
  const res = await authAPIInterface("/verify/email", {email});
  return res;
};

const emailCodeVerify = async (token, number) => {
  return await authAPIInterface("/verify/email/number", {token, number});
}

const phoneNumberVerify = async (phoneNumber) => {
  const res = await authAPIInterface("/verify/sms", {phoneNumber});
  return res;
};

const phoneNumberCodeVerify = async (token, number) => {
  const res = await authAPIInterface("/verify/sms/number", {token, number});
  return res;
};

export { requestLogin, requestRegister, emailVerify, emailCodeVerify, phoneNumberVerify, phoneNumberCodeVerify};
