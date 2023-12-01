import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage';
  
  const auth = [
    {
      index: true,
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
  ];
  
  export default auth;