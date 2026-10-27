// Import the useState hook from React to handle input values, responses, and loading status.
import { useState } from "react";
import "./Deposit.css";

function Deposit() {

  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  // 'loading' tracks if the API request is currently being processed.
  const [loading, setLoading] = useState(false);

  const handleDeposit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    // Ensure a logged-in identity exists
    if (!userId) {
      setMessage("User not logged in");
      return;
    }

    //  Enforce that the deposit field cannot be empty, negative, or zero.
    if (!amount || Number(amount) <= 0) {
      setMessage("Please enter a valid amount");
      return;
    }

    try {
      // Set loading to true to give immediate interface feedback and clear old messages.
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

       //  Check for rejected status codes
      if (!response.ok) {
        setMessage(data.message || "Deposit failed");
        return;
      }

      setMessage(
        `Money deposited successfully. New balance: ₹${data.balance}`
      );

       // 8. Clear out the form text field input value so the user can see it has been applied. 
      setAmount("");

    } catch (error) {
      console.log("Deposit error:", error);
      setMessage("Unable to connect to server");

    } 
    finally 
    {
       // This segment executes universally at the end to unlock and re-enable the click button.  
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