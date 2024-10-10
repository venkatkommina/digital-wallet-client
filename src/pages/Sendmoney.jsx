import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Sendmoney() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");
  const receiver = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [timerid, setTimerId] = useState(null);

  const handleTransfer = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        "https://digital-wallet-server-production.up.railway.app/api/v1/account/transfer",
        {
          toAccountId: id,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage("Transfer successful");
      const timerid = setTimeout(() => navigate("/dashboard"), 10000);
      setTimerId(timerid); // Save the timer ID so we can clear it later
    } catch (error) {
      setMessage("Transfer not successful");
      const timerid = setTimeout(() => navigate("/dashboard"), 10000);
      setTimerId(timerid); // Save the timer ID so we can clear it later
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirectNow = () => {
    if (timerid) {
      clearTimeout(timerid); // Clear the timer if user clicks "Redirect Now"
    }
    navigate("/dashboard");
  };

  useEffect(() => {
    return () => {
      if (timerid) {
        clearTimeout(timerid); // Clean up the timer when the component unmounts
      }
    };
  }, [timerid]);

  return (
    <div className="flex justify-center h-screen bg-primary">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-2xl text-white">
                  {receiver[0].toUpperCase()}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">{receiver}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Amount (in Rs)
                </label>
                <input
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                />
              </div>
              <button
                onClick={handleTransfer}
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-secondary hover:bg-tertiary transition duration-200 ease-in text-white"
                disabled={isLoading}
              >
                {isLoading ? "Transfer pending..." : "Initiate Transfer"}
              </button>
              {message && (
                <div className="mt-10 text-center">
                  <p className="text-tertiary font-semibold mt-4">{message}</p>
                  <p className="text-tertiary font-semibold mt-2">
                    Redirecting to dashboard in 10s
                  </p>
                  <button
                    onClick={handleRedirectNow}
                    className="mt-4 bg-secondary hover:bg-tertiary text-white font-bold py-2 px-4 rounded"
                  >
                    Redirect Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
