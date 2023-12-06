import { useState } from "react";
import { Form } from "react-router-dom";
import "../../../styles/auth/RegisterForm.scss";
const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [emailVerifyCode, setEmailVerifyCode] = useState("");
  const [phoneVerifyCode, setPhoneVerifyCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  return (
    <Form method="post">
      <div className="input-container">
        <div className="email-container">
          <input
            className="email-form"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="이메일"
          />
          <input
            className="email-verfiy-form"
            type="text"
            value={emailVerifyCode}
            onChange={(e) => {
              setEmailVerifyCode(e.target.value);
            }}
            placeholder="인증번호 입력"
          />
        </div>

        <div className="phone-number-container">
          <input
            className="phone-number-form"
            type="text"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            placeholder="전화번호"
          />
          <input
            className="verify-code-form"
            type="text"
            value={phoneVerifyCode}
            onChange={(e) => {
              setPhoneVerifyCode(e.target.value);
            }}
            placeholder="인증번호 입력"
          />
        </div>

        <div className="pw-container">
          <input
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

        <button type="submit" className="login-btn">
          확인
        </button>
      </div>
    </Form>
  );
};

export default RegisterForm;
