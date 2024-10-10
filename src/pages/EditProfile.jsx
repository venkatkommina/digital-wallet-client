/* eslint-disable no-unused-vars */
import { useState } from "react";
import Button from "../comps/Button";
import Heading from "../comps/Heading";
import InputBox from "../comps/InputBox";
import Subheading from "../comps/Subheading";
import axios from "axios";

export default function Edit() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async () => {
    setIsLoading(true);
    const requestBody = {};
    if (firstName) requestBody.firstName = firstName;
    if (lastName) requestBody.lastName = lastName;
    if (password) requestBody.password = password;
    if (Object.keys(requestBody).length === 0) {
      alert("No fields to update, should update at least one");
      setIsLoading(false);
      return;
    }

    try {
      await axios.put(
        "https://digital-wallet-server-production.up.railway.app/api/v1/user/",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Profile updated successfully, redirecting to dashboard");
      window.location.href = "/dashboard";
      setFirstName("");
      setLastName("");
      setPassword("");
    } catch (error) {
      console.error(error.message);
      alert("An error occurred while updating the profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex justify-center items-center">
      <div className="shadow p-8 bg-white h-full rounded-lg">
        <Heading>Edit Profile</Heading>
        <div className="mx-4">
          <Subheading>Edit your profile Here, optionally</Subheading>
        </div>
        <InputBox
          onChange={(e) => setFirstName(e.target.value)}
          title={"First Name"}
          placeholder={"John"}
          type={"text"}
        />
        <InputBox
          onChange={(e) => setLastName(e.target.value)}
          title={"Last Name"}
          placeholder={"Doe"}
          type={"text"}
        />
        <InputBox
          onChange={(e) => setPassword(e.target.value)}
          title={"Password"}
          placeholder={"********"}
          type={"password"}
        />
        <div className="flex justify-center mt-8">
          <Button onClick={handleOnClick}>
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </div>
      </div>
    </div>
  );
}
