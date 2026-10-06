import { useEffect, useState } from "react";
import "./Transaction.css";

function Transactions() {

  const [transactions, setTransactions] = useState([]);
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
              Authorization: `Bearer ${token}`
            }
          }
        );

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

      } finally {

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

          <div className="transactions-message">
            Loading transactions...
          </div>

        ) : transactions.length === 0 ? (

          <div className="transactions-message">
            No transactions found.
          </div>

        ) : (

          <div className="transactions-list">

            {transactions.map((transaction, index) => (

              <div
                className="transaction-item"
                key={transaction._id || index}
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