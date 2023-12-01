import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage';
import StartPage from '../pages/auth/Startpage';
  
  const auth = [
    {
      index: true,
      element: <StartPage />,
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
  ];
  
  export default auth;