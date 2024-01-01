import { useState } from "react";
import { Form } from "react-router-dom";
import {
  requestEmailVerifyCode,
  requestPwVerify,
} from "services/account/mypage";

const EditUserInfo = () => {
  const [email, setEmail] = useState();
  const [pw, setPw] = useState();
  const [isPwVerify, setIsPwVerify] = useState(false);

  const emailVerify = () => {
    const res = requestEmailVerifyCode(email);
    if (res === 200) {
      alert("입력된 이메일로 성공적으로 인증코드를 전송하였습니다.");
    } else {
      alert("인증코드 전송 실패");
    }
  };

  const verifyPw = () => {
    const res = requestPwVerify(pw);
    if (res === 200) {
      setIsPwVerify(true);
      alert("변경하실 비밀번호를 입력해주세요");
    } else {
      alert("비밀번호가 일치하지 않습니다");
    }
  };

  const isVerify = () => {
    if (pw !== null && isPwVerify === false) return;
  };

  return (
    <Form
      className="edit-user-info-container"
      method="post"
      onSubmit={isVerify}
    >
      <h1 className="edit-user-info-title">회원정보 수정</h1>

      <div className="edit-email-container">
        <input
          className="edit-email-form"
          name="edit-email-input"
          placeholder="이메일"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <button
          className="edit-email-verify-request-btn"
          type="button"
          onClick={emailVerify}
        >
          인증번호 발송
        </button>
        <input
          className="edit-email-verify-form"
          type="password"
          name="edit-email-verify-input"
          placeholder="인증번호"
        />
      </div>

      <div className="edit-pw-container">
        <input
          className="edit-pw-form"
          type="password"
          name="edit-pw-input"
          placeholder="현재 비밀번호"
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
          }}
        />
        <button
          className="edit-pw-verify-request-btn"
          type="button"
          onClick={verifyPw}
        >
          비밀번호 확인
        </button>
        <input
          className="edit-pw-verify-form"
          name="edit-pw-verify-input"
          type="password"
          placeholder="변경할 비밀번호"
        />
      </div>

      <button className="save-user-info-btn" type="submit">
        변경사항 저장
      </button>
    </Form>
  );
};

export default EditUserInfo;
