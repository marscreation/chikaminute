import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import ChangePassword from './pages/EditProfile/ChangePassword';
import EditProfile from './pages/EditProfile/EditProfile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const PrivateRoute = ({ element: Element }) => {
    return isLoggedIn ? <Element /> : <Navigate to="/" replace />;
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/profile" element={<PrivateRoute element={Profile} />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/changepassword" element={<ChangePassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
