import { redirect } from "react-router-dom";
import LoginForm from "../../components/auth/login/LoginForm";
import LoginLayout from "../../components/auth/login/LoginLayout";
import { requestLogin } from "../../services/auth/auth";
import { getAuthToken, setRefreshToken } from "utils/token";

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
  const data = await request.formData();

  const authForm = {
    id: data.get("id-form"),
    password: data.get("pw-form"),
  };

  const res = await requestLogin(authForm);

  if (res === 200) {
    const { setAccessToken } = getAuthToken();
    const { accessTokenDto, refreshTokenDto } = res.data;

    const { accessToken } = accessTokenDto;
    const { refreshToken, refreshTokenExpiredTime: expiredTime } =
      refreshTokenDto;
    setAccessToken(accessToken);
    setRefreshToken(refreshToken, expiredTime);

    return redirect("/home");
  }
};
