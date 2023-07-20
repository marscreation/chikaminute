import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
      {/* <Register /> */}
    </>
  );
}

export default App;
