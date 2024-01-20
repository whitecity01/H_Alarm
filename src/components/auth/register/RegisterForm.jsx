import { useState } from "react";
import { Form } from "react-router-dom";
import "styles/auth/RegisterForm.scss";
import { emailVerify, emailCodeVerify, phoneNumberVerify, phoneNumberCodeVerify } from "services/auth/auth";
import { isEmail, isPassword, isPhoneNumber } from "utils/valid";
const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [emailVerifyCode, setEmailVerifyCode] = useState("");
  const [isEmailVerify, setIsEmailVerify] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneVerifyCode, setPhoneVerifyCode] = useState("");
  const [isPhoneNumberVerify, setIsPhoneNumberVerify] = useState(false);
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [emailToken, setEmailToken] = useState("");
  const [phoneNumberToken, setPhoneNumberToken] = useState("");

  const requestEmailVerify = async () => {
    if (!isEmail(email)) {
      alert("이메일을 입력해주세요.");
      return;
    }
    try{
      const data = await emailVerify(email);
      setEmailToken(data.token);
      alert("전송 완료");
    }catch(e){
      alert(e.message);
    }
  };

  const requestEmailCodeVerify = async () => {
    try{
      const data = await emailCodeVerify( emailToken, emailVerifyCode );
      setEmailToken(data.token);
      setIsEmailVerify(true);
      alert("인증 완료");
    }catch(e){
      alert(e.message);
    }
  }

  const requestPhoneNumberVerify = async () => {
    if(!isPhoneNumber(phoneNumber)){
      alert("양식에 맞게 전화번호를 입력해주세요.");
      return;
    }
    try{
      const data = await phoneNumberVerify(phoneNumber);
      setPhoneNumberToken(data.token)
      alert("전송 완료");
    }catch(e){
      alert(e.message);
    }
  };

  const requestPhoneNumberCodeVerify = async () => {
    try{
      const data = await phoneNumberCodeVerify(phoneNumberToken, phoneVerifyCode);
      setPhoneNumberToken(data.token);
      setIsPhoneNumberVerify(true);
      alert("인증 완료");
    }catch(e){
      alert(e.message);
    }
  }

  const isVerify = (e) => {
    if (isEmailVerify === false){
      e.preventDefault();
      alert("이메일이 인증되지 않았습니다.");
    }else if(isPhoneNumberVerify === false){
      e.preventDefault();
      alert("휴대폰번호가 인증되지 않았습니다.")
    }else if(!isPassword(pw)){
      e.preventDefault();
      alert("비밀번호 양식에 맞게 입력해주세요.");
    }else if(pw !== pwCheck){
      e.preventDefault();
      alert("비밀번호가 맞지 않습니다.");
    }
  };

  return (
    <Form method="post" onSubmit={isVerify}>
      <div className="input-container">
        <div className="email-container">
          <input
            type="hidden" 
            name = "email-token"
            value={emailToken}
          />
          <input
            name="email-form"
            className="email-form"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="이메일"
          />
          <button
            className="email-verify-request-btn"
            type="button"
            onClick={requestEmailVerify}
          >
            인증번호 발송
          </button>
          <input
            className="email-verify-form"
            type="text"
            value={emailVerifyCode}
            onChange={(e) => {
              setEmailVerifyCode(e.target.value);
            }}
            placeholder="인증번호 입력"
          />
          <button
            className="email-verify-btn"
            type="button"
            onClick={requestEmailCodeVerify}
          >
            인증번호 확인
          </button>
        </div>

        <div className="phone-number-container">
          <input
            type="hidden"
            name = "phone-number-token"
            value={phoneNumberToken}
          />
          <input
            name="phone-number-form"
            className="phone-number-form"
            type="text"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            placeholder="전화번호 (ex 010-1234-1234, '-'를 넣어주세요.)"
          />
          <button 
            className="phone-number-verify-request-btn" 
            type="button"
            onClick={requestPhoneNumberVerify}
          >
            인증번호 발송
          </button>
          <input
            className="phone-number-verify-form"
            type="text"
            value={phoneVerifyCode}
            onChange={(e) => {
              setPhoneVerifyCode(e.target.value);
            }}
            placeholder="인증번호 입력"
          />
          <button 
            className="phone-number-verify-btn" 
            type="button"
            onClick={requestPhoneNumberCodeVerify}
          >
            인증번호 확인
          </button>
        </div>

        <div className="pw-container">
          <input
            name="pw-form"
            className="pw-form"
            type="password"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
            }}
            placeholder="비밀번호"
          />
          <input
            className="pw-check-form"
            type="password"
            value={pwCheck}
            onChange={(e) => {
              setPwCheck(e.target.value);
            }}
            placeholder="비밀번호 재입력"
          />
        </div>

        <button type="submit" className="register-btn">
          확인
        </button>
      </div>
    </Form>
  );
};

export default RegisterForm;
