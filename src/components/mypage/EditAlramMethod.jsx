const EditAlarmMethod = () => {
  return (
    <div className="edit-alarm-method-container">
      <h1 className="edit-alram-method-title">알람수단 수정</h1>

      <div className="edit-email-container">
        <input className="edit-email-form" placeholder="이메일" />
        <button className="edit-email-verify-request-btn" type="button">
          인증번호 발송
        </button>
        <input className="edit-email-verify-form" placeholder="인증번호" />
      </div>

      <div className="edit-phone-number-container">
        <input className="edit-phone-number-form" placeholder="전화번호" />
        <button className="edit-phone-number-verify-request-btn" type="button">
          인증번호 발송
        </button>
        <input
          className="edit-phone-number-verify-form"
          placeholder="인증번호"
        />
      </div>

      <button className="save-alram-method-btn" type="button">
        변경사항 저장
      </button>
    </div>
  );
};

export default EditAlarmMethod;
