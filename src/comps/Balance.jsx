import { useEffect, useState } from "react";
import axios from "axios";

/* eslint-disable react/prop-types */
export default function Balance() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios
      .get(
        "https://digital-wallet-server-production.up.railway.app/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setBalance(res.data.balance);
      });
  }, [balance]);
  return (
    <div className="flex items-center">
      <div className="text-xl font-bold ml-10">Your Balance:</div>
      <div className="text-xl ml-4 font-semibold">{balance} INR</div>
    </div>
  );
}
