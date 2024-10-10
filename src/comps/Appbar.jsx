/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const Appbar = function () {
  const [firstName, setFirstName] = useState("");
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
      });
  }, [firstName]);
  return (
    <div className="shadow h-16 flex justify-between bg-white">
      <div className="flex items-center h-full ml-20 font-bold font-serif text-2xl text-tertiary">
        PayLite
      </div>
      <div className="flex">
        <div className="flex items-center h-full mr-4 font-semibold">
          Hello, {firstName}
        </div>
        <Link
          to={"/profile"}
          className="rounded-full h-12 w-12 bg-primary flex flex-col justify-center mt-2 mr-2 mr-8"
        >
          <div className="flex flex-col justify-center h-full text-xl">
            <FontAwesomeIcon icon={faUser} />
          </div>
        </Link>
      </div>
    </div>
  );
};
