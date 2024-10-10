/* eslint-disable no-unused-vars */
import { useState } from "react";
import BottomWarning from "../comps/BottomWarning";
import Button from "../comps/Button";
import Heading from "../comps/Heading";
import InputBox from "../comps/InputBox";
import Subheading from "../comps/Subheading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useRedirectIfAuthenticated from "../hook/useRedirect";

export default function SignIn() {
  useRedirectIfAuthenticated();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center min-h-screen bg-primary">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Heading>Sign In</Heading>
        <Subheading>Enter your credentials to access your account</Subheading>
        <InputBox
          title={"Email"}
          placeholder={"nZUeh@example.com"}
          type={"text"}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputBox
          title="Password"
          placeholder={"********"}
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-center">
          <Button
            onClick={() => {
              axios
                .post(
                  "https://digital-wallet-server-production.up.railway.app/api/v1/user/signin",
                  {
                    email,
                    password,
                  }
                )
                .then((res) => {
                  localStorage.setItem("token", res.data.token);
                  navigate("/dashboard");
                })
                .catch((err) => {
                  console.log(err.message);
                  alert(err.response.data.message);
                });
            }}
          >
            Sign In
          </Button>
        </div>
        <BottomWarning
          label={"Don't have an account? "}
          buttonText={"Sign Up"}
          to={"/signup"}
        />
      </div>
    </div>
  );
}
