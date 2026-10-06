import { useState } from "react";
import "./Withdraw.css";
function Withdraw() {

  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleWithdraw = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const userId = localStorage.getItem("userId");

    if (!userId) {
      setError("Please login again.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    try {

      const response = await fetch(
        "http://localhost:8000/api/accounts/withdraw",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId,
            amount: Number(amount)
          })
        }
      );

      const data = await response.json();

      console.log("WITHDRAW RESPONSE:", data);

      if (!response.ok) {
        setError(data.message || "Withdrawal failed");
        return;
      }

      setMessage(
        `Money withdrawn successfully. New balance: ₹${data.balance}`
      );

      setAmount("");

    } catch (error) {

      console.log("Withdraw error:", error);

      setError("Unable to connect to server");
    }
  };

  return (
    <div className="withdraw-page">

      <div className="withdraw-container">

        <h1>Withdraw Money</h1>

        <p>
          Withdraw money from your SecureBank account.
        </p>

        <form onSubmit={handleWithdraw}>

          <label>Enter Amount</label>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
          />

          <button type="submit">
            Withdraw Money
          </button>

        </form>

        {message && (
          <div className="withdraw-success">
            {message}
          </div>
        )}

        {error && (
          <div className="withdraw-error">
            {error}
          </div>
        )}

      </div>

    </div>
  );
}

export default Withdraw;