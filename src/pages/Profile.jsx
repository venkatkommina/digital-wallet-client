import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Info from "../comps/Info";
import Button from "../comps/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://digital-wallet-server-production.up.railway.app/api/v1/user/me",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setFirstName(res.data.user.firstName);
        setLastName(res.data.user.lastName);
        setEmail(res.data.user.email);
      });
  }, [firstName, lastName, email]);
  return (
    <div className="min-h-screen bg-primary flex justify-center items-center">
      <div className="shadow p-14 bg-white h-full rounded-lg">
        <div className="flex justify-center items-center mb-16">
          <div className="rounded-full h-16 w-16 bg-primary flex justify-center items-center mt-1 mr-2">
            <FontAwesomeIcon icon={faUser} size="2x" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Info type="First Name" label={firstName}></Info>
          {lastName && <Info type="Last Name" label={lastName}></Info>}
          <Info type="Email" label={email}></Info>
        </div>
        <div className="mt-14 flex flex-col justify-center items-center">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/signin";
            }}
            className="bg-red-400 hover:bg-red-700 text-white border border-black-400 hover:border-black-500 font-bold py-2 px-16 my-2 rounded transition duration-300 ease-in-out"
          >
            Logout
          </button>
          <Link to="/editprofile">
            <Button>Edit Profile</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
