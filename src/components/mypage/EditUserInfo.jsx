const EditUserInfo = () => {
  return (
    <div className="edit-user-info-container">
      <h1 className="edit-user-info-title">회원정보 수정</h1>

      <div className="edit-email-container">
        <input className="edit-email-form" placeholder="이메일" />
        <button className="edit-email-verify-request-btn" type="button">
          인증번호 발송
        </button>
        <input className="edit-email-verify-form" placeholder="인증번호" />
      </div>

      <div className="edit-pw-container">
        <input className="edit-pw-form" placeholder="비밀번호" />
        <button className="edit-pw-verify-request-btn" type="button">
          비밀번호 확인
        </button>
        <input className="edit-pw-verify-form" placeholder="비밀번호 재입력" />
      </div>

      <button className="save-user-info-btn" type="button">
        변경사항 저장
      </button>
    </div>
  );
};

export default EditUserInfo;
