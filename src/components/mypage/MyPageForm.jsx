import EditAlarmMethod from "./EditAlramMethod";
import EditUserInfo from "./EditUserInfo";
import "styles/mypage/MyPageForm.scss";
const MyPageForm = () => {
  return (
    <div className="mypage-form-container">
      <EditUserInfo />
      <EditAlarmMethod />
    </div>
  );
};

export default MyPageForm;
