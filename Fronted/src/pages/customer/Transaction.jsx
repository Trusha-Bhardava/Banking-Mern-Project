import { useEffect, useState } from "react";
import "./Transaction.css";

function Transactions() {

   // State to hold the list of transactions fetched from the backend
  const [transactions, setTransactions] = useState([]);
   // State to track whether the API request is still loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchTransactions = async () => {

      try {

        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          alert("Please login first");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:8000/api/accounts/transactions/${userId}`,
          {
            method: "GET",
            headers: {
              // Attach the JWT bearer token in the headers for server authentication.
              Authorization: `Bearer ${token}`
            }
          }
        );

           // Parse the response from the server back into a usable JavaScript object.
        const data = await response.json();

        console.log("TRANSACTIONS RESPONSE:", data);

        if (response.ok) {

          setTransactions(data.transactions);

        } else {

          alert(
            data.message || "Unable to get transactions"
          );

        }

      } catch (error) {

        console.log("Transaction error:", error);

        alert("Unable to connect to server");

      } 
      finally 
      {
        setLoading(false);
      }

    };

    fetchTransactions();

  }, []);


  return (

    <div className="transactions-page">

      <div className="transactions-container">

        <div className="transactions-header">

          <p>SECUREBANK</p>

          <h1>Transaction History</h1>

          <span>
            View your recent banking transactions.
          </span>

        </div>


        {loading ? (
         // Show this while data is being fetched
          <div className="transactions-message">
            Loading transactions...
          </div>

        ) : transactions.length === 0 ? (
            //Show this if loading finished but the transaction array is empty
          <div className="transactions-message">
            No transactions found.
          </div>

        ) : (
        // Show this when transactions are available
          <div className="transactions-list">
         // Map over the transactions array to render each item dynamically 
            {transactions.map((transaction, index) => (

              <div
                className="transaction-item"
                key={transaction._id || index} // Unique key for React reconciliation
              >

                <div className="transaction-icon">

                  {transaction.type === "deposit"
                    ? "💰"
                    : transaction.type === "withdraw"
                    ? "💸"
                    : "🔄"
                  }

                </div>


                <div className="transaction-info">

                  <h3>
                    {transaction.type === "deposit"
                      ? "Money Deposited"
                      : transaction.type === "withdraw"
                      ? "Money Withdrawn"
                      : "Money Transfer"
                    }
                  </h3>

                  <p>
                    {transaction.description}
                  </p>

                  {transaction.createdAt && (
                    <span>
                      {new Date(
                        transaction.createdAt
                      ).toLocaleString("en-IN")}
                    </span>
                  )}

                </div>


                <div
                  className={
                    transaction.type === "withdraw"
                      ? "transaction-amount withdraw-amount"
                      : "transaction-amount"
                  }
                >

                  {transaction.type === "withdraw"
                    ? "-"
                    : "+"
                  }

                  ₹
                  {Number(
                    transaction.amount
                  ).toLocaleString("en-IN")}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );
}

export default Transactions;