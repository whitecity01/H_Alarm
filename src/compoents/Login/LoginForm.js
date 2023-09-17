import { useState } from "react";
//import { LoginPost } from "../../Api/LoginApi";

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });

    const verify = (event) => {
      event.preventDefault();
      //LoginPost(formData);
    };
  
    const handleInputChange = (event) => {
      const { id, value } = event.target;
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    };
  
    return (
      <form  onSubmit={verify}>
        
        <label htmlFor="email"/>
        <input
          id="email"
          
          placeholder="이메일 입력"
          onChange={handleInputChange}
          value={formData.email}
        /> 
        
        <label htmlFor="password"/>
        <input
          id="password"
          type="password"
          placeholder="비밀번호 입력"
          onChange={handleInputChange}
          value={formData.password}
        />
        
        <button type="submit">로그인</button>
      </form>
    )
};

export default LoginForm;
