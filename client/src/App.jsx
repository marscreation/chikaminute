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
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';

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
          <Route
            path="/home"
            element={
              <PrivateRoute element={Home} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route
            path="/register"
            element={<PrivateRoute element={Register} />}
          />
          <Route path="/profile" element={<PrivateRoute element={Profile} />} />
          <Route
            path="/editprofile"
            element={<PrivateRoute element={EditProfile} />}
          />
          <Route
            path="/changepassword"
            element={<PrivateRoute element={ChangePassword} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
