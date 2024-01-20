import { redirect } from "react-router-dom";
import LoginForm from "../../components/auth/login/LoginForm";
import LoginLayout from "../../components/auth/login/LoginLayout";
import { requestLogin } from "../../services/auth/auth";
import { setAccessTokenAtGlobal, setRefreshTokenAtGlobal } from "utils/token";

const LoginPage = () => {
  return (
    <div>
      <LoginLayout />
      <LoginForm />
    </div>
  );
};

export default LoginPage;

export const action = async ({ request }) => {
  const form = await request.formData();

  try{
    const {
      accessToken, 
      refreshToken, 
      expirationTimeByMinuteFromAccessToken, 
      expirationTimeByMinuteFromRefreshToken
    } = await requestLogin(form.get("id-form"), form.get("pw-form"));

    setRefreshTokenAtGlobal(refreshToken, new Date(expirationTimeByMinuteFromRefreshToken));
    setAccessTokenAtGlobal(accessToken, new Date(expirationTimeByMinuteFromAccessToken));

    return redirect("/alarm");
  }catch(e){
    console.log(e);
    alert("회원정보가 틀립니다.");
    return redirect("/login");
  }
};
