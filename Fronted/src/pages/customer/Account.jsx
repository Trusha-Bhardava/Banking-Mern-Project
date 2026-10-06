import { useEffect, useState } from "react";
import "./Account.css";

function Account() {

  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchAccountDetails = async () => {

      try {

        const token = localStorage.getItem("token");

        if (!token) {
          alert("Please login first");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "http://localhost:8000/api/accounts/details",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        console.log("ACCOUNT DETAILS:", data);

        if (response.ok) {

          setAccount(data.account);

        } else {

          alert(data.message || "Unable to get account details");

        }

      } catch (error) {

        console.log("Account error:", error);

        alert("Unable to connect to server");

      } finally {

        setLoading(false);

      }

    };

    fetchAccountDetails();

  }, []);


  if (loading) {
    return (
      <div className="account-page">
        <h2>Loading account details...</h2>
      </div>
    );
  }


  if (!account) {
    return (
      <div className="account-page">
        <h2>Account details not available</h2>
      </div>
    );
  }


  return (

    <div className="account-page">

      <div className="account-container">

        <div className="account-header">

          <p>SECUREBANK</p>

          <h1>Account Overview</h1>

          <span>
            View your banking account information.
          </span>

        </div>


        <div className="account-card">

          <div className="account-card-header">

            <h2>Account Details</h2>

            <span>✓ Active</span>

          </div>


          <div className="account-details">


            <div className="account-detail">

              <p>Account Number</p>

              <strong>
                {account.accountNumber}
              </strong>

            </div>


            <div className="account-detail">

              <p>Current Balance</p>

              <strong>
                ₹{Number(account.balance).toLocaleString("en-IN")}
              </strong>

            </div>


            <div className="account-detail">

              <p>Account Created</p>

              <strong>
                {new Date(account.createdAt).toLocaleDateString("en-IN")}
              </strong>

            </div>


            <div className="account-detail">

              <p>Total Transactions</p>

              <strong>
                {account.transactionCount}
              </strong>

            </div>

          </div>

        </div>


        <div className="account-status">

          <span>🔒</span>

          <div>

            <h3>Your account is secure</h3>

            <p>
              Your SecureBank account is active and
              protected by secure banking practices.
            </p>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Account;