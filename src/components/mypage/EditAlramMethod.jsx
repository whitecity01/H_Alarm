import { useState } from "react";
import { Form } from "react-router-dom";
import {
  requestEmailVerifyCode,
  requestPhoneNumberVerifyCode,
} from "services/account/mypage";

const EditAlarmMethod = () => {
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  const emailVerify = () => {
    const res = requestEmailVerifyCode(email);
    if (res === 200) {
      alert("입력된 이메일로 성공적으로 인증코드를 전송하였습니다.");
    } else {
      alert("인증코드 전송 실패");
    }
  };

  const phoneNumberVerify = () => {
    const res = requestPhoneNumberVerifyCode(phoneNumber);
    if (res === 200) {
      alert("입력된 전화번호로 성공적으로 인증코드를 전송하였습니다.");
    } else {
      alert("인증코드 전송 실패");
    }
  };

  const isEmpty = () => {
    if (email === null && phoneNumber === null) {
      alert("인증번호를 입력해주세요");
      return;
    }
  };

  return (
    <Form
      className="edit-alarm-method-container"
      method="post"
      onSubmit={isEmpty}
    >
      <h1 className="edit-alram-method-title">알람수단 수정</h1>

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

      <div className="edit-phone-number-container">
        <input
          className="edit-phone-number-form"
          name="edit-phone-number-input"
          type="number"
          placeholder="전화번호"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
        <button
          className="edit-phone-number-verify-request-btn"
          type="button"
          onClick={phoneNumberVerify}
        >
          인증번호 발송
        </button>
        <input
          className="edit-phone-number-verify-form"
          type="password"
          name="edit-phone-number-verify-input"
          placeholder="인증번호"
        />
      </div>

      <button className="save-alram-method-btn" type="submit">
        변경사항 저장
      </button>
    </Form>
  );
};

export default EditAlarmMethod;
