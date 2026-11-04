import { useState } from "react";
import "./Transfer.css";
function Transfer() {

  const [receiverAccountNumber, setReceiverAccountNumber] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        alert("Please login first");
        return;
      }

      const response = await fetch(
        "http://localhost:8000/api/accounts/transfer",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json", // Inform server we are sending JSON data
            Authorization: `Bearer ${token}`  // Bearer token validation for route security
          },

          body: JSON.stringify({
            userId,
            receiverAccountNumber,
            amount
          })
        }
      );

      const data = await response.json();

      console.log("TRANSFER RESPONSE:", data);

      if (!response.ok) {
        alert(data.message || "Transfer failed");
        return;
      }

      alert("Money transferred successfully");

      setReceiverAccountNumber("");
      setAmount("");

    } catch (error) {

      console.log("Transfer error:", error);

      alert("Unable to connect to server");

    }
  };

  return (
    <div className="deposit-page">

      <div className="deposit-container">

        <h1>Transfer Money</h1>

        <p>
          Send money securely to another SecureBank account.
        </p>

        <form onSubmit={handleSubmit}>

          <label>
            Receiver Account Number
          </label>

          <input
            type="text"
            placeholder="Enter receiver account number"
            value={receiverAccountNumber}
            onChange={(e) =>
              setReceiverAccountNumber(e.target.value)
            }
            required
          />


          <label>
            Amount
          </label>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            required
            min="1"
          />


          <button type="submit">
            Transfer Money
          </button>

        </form>

      </div>

    </div>
  );
}

export default Transfer;