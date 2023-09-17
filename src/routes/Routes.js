import { Routes, Route } from 'react-router-dom';
import Login from '../compoents/Login/Login';
import Register from '../compoents/Register/Register';

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/"   element={<Login/>} />
        <Route path="/register"  element={<Register/>} />
      </Routes>
    </div>
  );
};

export default Routing;