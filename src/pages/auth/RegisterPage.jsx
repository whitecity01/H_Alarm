import { redirect } from "react-router-dom";
import RegisterForm from "components/auth/register/RegisterForm";
import RegisterLayout from "components/auth/register/RegisterLayout";
import { requestRegister } from "services/auth/auth";

const RegisterPage = () => {
  return (
    <>
      <RegisterLayout />
      <RegisterForm />
    </>
  );
};

export default RegisterPage;

export const action = async ({ request }) => {
  const data = await request.formData();

  try{
    await requestRegister(
      data.get("email-form"),
      data.get("pw-form"),
      data.get("phone-number-form"),
      data.get("email-token"),
      data.get("phone-number-token")
    );
    return redirect("/");
  }catch(e){
    alert("시간 만료");
    return redirect("/register");
  }
};
