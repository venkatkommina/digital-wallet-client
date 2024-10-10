/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Button from "./comps/Button";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Sendmoney from "./pages/Sendmoney";
import Profile from "./pages/Profile";
import Edit from "./pages/EditProfile";
import useRedirectIfAuthenticated from "./hook/useRedirect";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/send"
            element={<Sendmoney user={{ firstName: "Venkat" }} />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
