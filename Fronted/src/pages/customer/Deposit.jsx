import { useState } from "react";
import "./Deposit.css";

function Deposit() {

  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeposit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    if (!userId) {
      setMessage("User not logged in");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setMessage("Please enter a valid amount");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(
        "http://localhost:8000/api/accounts/deposit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: userId,
            amount: Number(amount)
          })
        }
      );

      const data = await response.json();

      console.log("DEPOSIT RESPONSE:", data);

      if (!response.ok) {
        setMessage(data.message || "Deposit failed");
        return;
      }

      setMessage(
        `Money deposited successfully. New balance: ₹${data.balance}`
      );

      setAmount("");

    } catch (error) {
      console.log("Deposit error:", error);
      setMessage("Unable to connect to server");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="deposit-page">

      <div className="deposit-card">

        <h1>Deposit Money</h1>

        <p className="deposit-description">Add money to your SecureBank account.</p>

        <form className="deposit-form" onSubmit={handleDeposit}>

          <label>Enter Amount</label>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Deposit Money"}
          </button>

        </form>

        {message && (
          <p className="deposit-message">{message}</p>
        )}

      </div>

    </div>
  );
}

export default Deposit;