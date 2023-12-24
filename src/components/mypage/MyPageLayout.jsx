import { Link } from "react-router-dom";
import "styles/mypage/MyPageLayout.scss";

const MyPageLayout = () => {
  return (
    <div className="mypage-layout-container">
      <Link className="mypage-back-link" to="/alarm">
        &lt;
      </Link>
      <span className="mypage-title">마이페이지</span>
      <Link className="logout-link" to="/">
        <img className="logout-btn" src="/logout_btn.png" alt="Logout" />
      </Link>
    </div>
  );
};

export default MyPageLayout;
