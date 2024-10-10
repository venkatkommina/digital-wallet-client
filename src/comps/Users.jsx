/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://digital-wallet-server-production.up.railway.app/api/v1/user/bulk?filter=" +
          filter,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setUsers(res.data.users.filter((user) => user._id !== res.data.userId));
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [filter]);

  return (
    <div className="w-full h-full p-4 bg-white ">
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 mt-1 border rounded border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful font-semibold">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <Button
          onClick={() =>
            navigate(`/send?id=${user._id}&name=${user.firstName}`)
          }
        >
          Send Money
        </Button>
      </div>
    </div>
  );
}
