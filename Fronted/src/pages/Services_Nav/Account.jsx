// Import useEffect for side effects (fetching data) and useState for managing component state.
import { useEffect, useState } from "react";
import "./Account.css";

function Account() {

  const [account, setAccount] = useState(null);
  // loading tracks whether the API request is still in progress.It starts as 'true' to show a loading screen immediately.
  const [loading, setLoading] = useState(true);

  // Runs automatically when the component loads on the screen.
  useEffect(() => {
      
    const fetchAccountDetails = async () => {

      try {
        //  Retrieve the saved JWT token from localStorage to verify who the user is.
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
              // Attach the JWT bearer token in the headers for server authentication.
              Authorization: `Bearer ${token}`
            }
          }
        );
      
         // Parse the response from the server back into a usable JavaScript object.
        const data = await response.json();

        console.log("ACCOUNT DETAILS:", data);
 
         // If the request was approved by the server, update the 'account' state.
        if (response.ok) {

          setAccount(data.account);

        } else {

          alert(data.message || "Unable to get account details");

        }

      } catch (error) {

        console.log("Account error:", error);

        alert("Unable to connect to server");

      } 
       // This block runs no matter what (success or failure) to turn off the loading layout.
      finally 
      {
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

// If loading finished but no 'account' object was saved, show an error panel.
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