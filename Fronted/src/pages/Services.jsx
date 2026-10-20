import { Link } from "react-router-dom";

function Services() {

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  return (
    <div className="services-page">

      <div className="services-header">

        <h1>Our Banking Services</h1>

        <p>
          We provide simple and secure banking services.
        </p>

      </div>

      <div className="services-intro">

  <div className="services-intro-image">
    <img
      src="/images/service.png-"
      alt="SecureBank digital banking services"
    />
  </div>

  <div className="services-intro-content">
    <p>SMART BANKING</p>

    <h2>Everything you need for everyday banking.</h2>

    <span>
      Manage your money, make secure transactions and
      access your banking services easily with SecureBank.
    </span>
  </div>

</div>


      <div className="services-container">


        {/* 1. Savings Account */}

        <div className="service-card">

          <h2>Savings Account</h2>

          <p>
            Save and manage your money securely.
          </p>

          {isLoggedIn && (
            <Link
              to="/account"
              className="service-button"
            >
              View Account
            </Link>
          )}

        </div>


        {/* 2. Deposit Money */}

        <div className="service-card">

          <h2>Deposit Money</h2>

          <p>
            Add money to your SecureBank account
            easily and securely.
          </p>

          {isLoggedIn && (
            <Link
              to="/deposit"
              className="service-button"
            >
              Deposit Money
            </Link>
          )}

        </div>


        {/* 3. Withdraw Money */}

        <div className="service-card">

          <h2>Withdraw Money</h2>

          <p>
            Withdraw money from your SecureBank
            account safely.
          </p>

          {isLoggedIn && (
            <Link
              to="/withdraw"
              className="service-button"
            >
              Withdraw Money
            </Link>
          )}

        </div>


        {/* 4. Money Transfer */}

        <div className="service-card">

          <h2>Money Transfer</h2>

          <p>
            Transfer money easily and securely
            to another account.
          </p>

          {isLoggedIn && (
            <Link
              to="/transfer"
              className="service-button"
            >
              Transfer Money
            </Link>
          )}

        </div>


        {/* 5. Transaction History */}

        <div className="service-card">

          <h2>Transaction History</h2>

          <p>
            View your deposits, withdrawals and
            money transfer history in one place.
          </p>

          {isLoggedIn && (
            <Link
              to="/transactions"
              className="service-button"
            >
              View Transactions
            </Link>
          )}

        </div>


        {/* 6. Account Security */}

        <div className="service-card">

          <h2>Account Security</h2>

          <p>
            Manage your password and keep your
            SecureBank account protected.
          </p>

          {isLoggedIn && (
            <Link
              to="/security"
              className="service-button"
            >
              Manage Security
            </Link>
          )}

        </div>


      </div>

    </div>
  );
}

export default Services;