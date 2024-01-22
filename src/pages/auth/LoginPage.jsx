import { redirect } from "react-router-dom";
import LoginForm from "../../components/auth/login/LoginForm";
import LoginLayout from "../../components/auth/login/LoginLayout";
import { requestLogin } from "../../services/auth/auth";
import { setAccessTokenAtGlobal, setRefreshTokenAtGlobal } from "utils/token";
import { ACCESS_TOKEN, ACCESS_TOKEN_EXPIRATION, REFRESH_TOKEN, REFRESH_TOKEN_EXPIRATION } from "constants/api";

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
    const res = await requestLogin(form.get("id-form"), form.get("pw-form"));

    setRefreshTokenAtGlobal(res[REFRESH_TOKEN], new Date(res[REFRESH_TOKEN_EXPIRATION]));
    setAccessTokenAtGlobal(res[ACCESS_TOKEN], new Date(res[ACCESS_TOKEN_EXPIRATION]));

    return redirect("/alarm");
  }catch(e){
    console.log(e);
    alert("회원정보가 틀립니다.");
    return redirect("/login");
  }
};
