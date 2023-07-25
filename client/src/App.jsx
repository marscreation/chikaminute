import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import ChangePassword from "./pages/EditProfile/ChangePassword";
import EditProfile from "./pages/EditProfile/EditProfile";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";

function App() {
  function PrivateRoute({ element: Element }) {
    const isLoggedIn = sessionStorage.getItem("token") !== null;

    if (isLoggedIn && window.location.pathname === "/register") {
      return <Navigate to="/home" replace />;
    } else if (!isLoggedIn && window.location.pathname === "/register") {
      return <Element />;
    }
    return isLoggedIn ? <Element /> : <Navigate to="/" replace />;
  }

  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<PrivateRoute element={Home} />} />
            <Route
              path="/register"
              element={<PrivateRoute element={Register} />}
            />
            <Route
              path="/profile"
              element={<PrivateRoute element={Profile} />}
            />
            <Route
              path="/editprofile"
              element={<PrivateRoute element={EditProfile} />}
            />
            <Route
              path="/changepassword"
              element={<PrivateRoute element={ChangePassword} />}
            />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
