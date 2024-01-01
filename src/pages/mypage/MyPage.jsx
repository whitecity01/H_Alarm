import MyPageForm from "components/mypage/MyPageForm";
import MyPageLayout from "components/mypage/MyPageLayout";
import {
  changeEmail,
  changePhoneNumber,
  changePw,
} from "services/account/mypage";

const MyPage = () => {
  return (
    <>
      <MyPageLayout />
      <MyPageForm />
    </>
  );
};

export default MyPage;

export const action = async ({ request }) => {
  const formData = await request.formData();

  const email = {
    email: formData.get("edit-email-input"),
    emailVerifyCode: formData.get("edit-email-verify-input"),
  };
  const pw = {
    pw: formData.get("edit-pw-verify-input"),
  };
  const phoneNumber = {
    phoneNumber: formData.get("edit-phone-number-input"),
    phoneNumberVerifyCode: formData.get("edit-phone-number-verify-input"),
  };

  if (email.email !== "" && email.emailVerifyCode !== "") {
    const res = await changeEmail(email);
    if (res === 200) {
      alert("성공적으로 이메일을 변경하였습니다");
    }
  }
  if (pw.pw !== "") {
    const res = await changePw(pw);
    if (res === 200) {
      alert("성공적으로 비밀번호를 변경하였습니다");
    }
  }
  if (
    phoneNumber.phoneNumber !== "" &&
    phoneNumber.phoneNumberVerifyCode !== ""
  ) {
    const res = await changePhoneNumber(phoneNumber);
    if (res === 200) {
      alert("성공적으로 전화번호를 변경하였습니다");
    }
  }

  return null;
};
