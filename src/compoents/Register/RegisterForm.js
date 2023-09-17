import { useState } from "react";
import { checkEmailAuth, checkPhoneNumberAuth, createUser, emailAuth, phoneNumberAuth } from "../../api/auth";

const RegisterForm = () => {
  const [emailValue, setEmail] = useState(""); // 이메일 입력값
  const [emailAuthValue, setEmailAuth] = useState(""); // 이메일 인증번호 입력값
  const [phoneNumberValue, setPhoneNumber] = useState(""); // 전화번호 입력값
  const [phoneNumberAuthValue, setPhoneNumberAuth] = useState(""); // 전화번호 인증번호 입력값
  const [password, setPassword] = useState(""); // 비밀번호 입력값 
  const [isEmailValid, setIsEmailValid] = useState(false); // 이메일 형식이 유효한지 여부
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false); // 전화번호 형식이 유효한지 여부
  const [isPasswordValid, setIsPasswordValid] = useState(false); // 비밀번호 유효성 검사 결과
  // 이메일 인증 버튼 클릭 시 호출되는 함수
  
  const sendEmailAuth = async () => {
    try{
      await checkEmailAuth(emailAuthValue);
      setIsEmailValid(true);
    }catch(e){
      console.log(e);
    }
  }
  
  const sendPhoneNumberAuth = async () => {
    try{
      await checkPhoneNumberAuth(phoneNumberAuthValue);
      setIsPhoneNumberValid(true);
    }catch(e){
      console.log(e);
    }
    
  }

  const emailVerify = (event) => { //이메일 유효성 검사
    event.preventDefault(); //유지
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValid = emailRegex.test(emailValue);

    if (isValid) {
      
      emailAuth(emailValue);
    } else {
      alert("이메일 형식이 올바르지 않습니다.");
    }
  };  

  const handleRegister = () => {

    if (isPasswordValid) {
        if(isEmailValid ){
          if(isPhoneNumberValid){
            createUser(emailValue, phoneNumberValue, password);
          }
          else{
            alert("휴대전화 인증이 필요합니다");
          }
        } 
        else{
          alert("이메일 인증이 필요합니다");
        }   
    } else {
      alert("비밀번호는 8자리 이상이어야 합니다.");
    }
  };

  const phoneNumberVerify = () =>{
    //인증 코드 구현해야함
    phoneNumberAuth(phoneNumberValue);
  }

  const handlePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    // 비밀번호가 8자리 이상인지 확인
    if (newPassword.length >= 8) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };
  
  return (
    <div>
      <div>
        <input
          id="email"
          type="email"
          placeholder="이메일 입력"
          value={emailValue}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="auth-btn" onClick={emailVerify}>
          인증
        </button>
      </div>

      <input
        id="number"
        type="text"
        placeholder="이메일 인증번호 입력"
        autoComplete="off"
        value={emailAuthValue}
        onChange={(e) => setEmailAuth(e.target.value)}
      />
      <button className="auth-btn" onClick={sendEmailAuth}>
        확인
      </button>
      <br />

      <input
        id="number"
        type="text"
        placeholder="전화번호 입력"
        autoComplete="off"
        value={phoneNumberValue}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button className="auth-btn" onClick={phoneNumberVerify}>
        인증
      </button>
      <br />

      <input
        id="number"
        type="text"
        placeholder="전화번호 인증번호 입력"
        autoComplete="off"
        value={phoneNumberAuthValue}
        onChange={(e) => setPhoneNumberAuth(e.target.value)}
      />
      <button className="auth-btn" onClick={sendPhoneNumberAuth}>
        확인
      </button>
      <br />

      <form>
        <label htmlFor="password" />
        <input
          id="password"
          type="password"
          placeholder="비밀번호 입력"
          autoComplete="current-password"
          value={password}
          onChange={handlePassword}
        />
        <br />
        <button className="register-btn" type="button" onClick={handleRegister}>
          회원가입
        </button>
      </form>

      <small>비밀번호 규칙: 8자 이상</small>
    </div>
  );
};

export default RegisterForm;
