//import { Link } from 'react-router-dom';
import LoginLink from "./LoginLink";
import RegisterForm from "./RegisterForm";
import RegisterTitle from "./RegisterTitle";
import './register.scss';

const Register = () => {
  return (
    <div className="register-container" >
    <div className="register-title">
      <RegisterTitle/>
    </div>
    <div className="register-form-container">
      <RegisterForm/>
      <LoginLink/>
    </div>
</div>
  );
};

export default Register;
