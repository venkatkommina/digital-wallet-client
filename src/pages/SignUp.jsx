/* eslint-disable no-unused-vars */
import Heading from "../comps/Heading";
import Subheading from "../comps/Subheading";
import InputBox from "../comps/InputBox";
import Button from "../comps/Button";
import BottomWarning from "../comps/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useRedirectIfAuthenticated from "../hook/useRedirect";

export default function SignUp() {
  useRedirectIfAuthenticated();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center min-h-screen bg-primary">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Heading>Sign Up</Heading>
        <Subheading>Enter your Information to create your account</Subheading>
        <InputBox
          title={"First Name"}
          placeholder={"John"}
          type={"text"}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <InputBox
          title={"Last Name"}
          placeholder={"Smith"}
          type={"text"}
          onChange={(e) => setLastName(e.target.value)}
        />
        <InputBox
          title={"Email"}
          placeholder={"nZUeh@example.com"}
          type={"text"}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputBox
          title={"Password"}
          placeholder={"********"}
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-center">
          <Button
            onClick={async () => {
              try {
                const response = await axios.post(
                  "https://digital-wallet-server-production.up.railway.app/api/v1/user/signup",
                  {
                    firstName,
                    lastName,
                    email,
                    password,
                  }
                );
                // If the request is successful and returns a 201 status code
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              } catch (error) {
                // If the request returns an error
                if (error.response) {
                  if (error.response.status === 400) {
                    alert("Invalid Credentials");
                  } else if (error.response.status === 409) {
                    alert("Email Already Registered");
                  } else {
                    alert("An unexpected error occurred");
                  }
                } else {
                  alert("An unexpected error occurred");
                }
              }
            }}
          >
            Sign Up
          </Button>
        </div>
        <BottomWarning
          label={"Already have an account? "}
          buttonText={"Sign In"}
          to={"/signin"}
        />
      </div>
    </div>
  );
}
