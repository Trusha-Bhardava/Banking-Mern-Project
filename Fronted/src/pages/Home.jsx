import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {

  const token = localStorage.getItem("token");

  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchAccountDetails = async () => {

      try {

        const token = localStorage.getItem("token");

        if (!token) {
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

        console.log("ACCOUNT RESPONSE:", data);

        if (response.ok) {

          setAccount(data.account);

        } else {

          console.log("Account error:", data.message);

        }

      } catch (error) {

        console.log("Account details error:", error);

      } finally {

        setLoading(false);

      }

    };


    fetchAccountDetails();

  }, []);


  return (

    <div className="home-page">


      {/* ================= HERO SECTION ================= */}

      <section className="modern-hero">


        {/* LEFT SIDE */}

        <div className="hero-content">


          <p className="hero-small-title">
            SMART DIGITAL BANKING
          </p>


          <h1>

            Banking made simple

            <span>
              {" "}for your everyday life.
            </span>

          </h1>


          <p className="hero-description">

            Manage your money, transfer funds and
            keep track of your account with SecureBank.

          </p>


          {/* BUTTONS */}

          <div className="hero-buttons">


            {token && (

              <Link
                to="/deposit"
                className="home-button"
              >
                Deposit Money
              </Link>

            )}


            <Link
              to="/services"
              className="home-button secondary-button"
            >
              Explore Services
            </Link>


          </div>


          {/* BENEFITS */}

          <div className="hero-benefits">


            <div>
              <span>✓</span>
              Secure
            </div>


            <div>
              <span>✓</span>
              Fast
            </div>


            <div>
              <span>✓</span>
              Available 24/7
            </div>


          </div>


        </div>


        {/* ================= RIGHT SIDE ================= */}


        {!account ? (

          /* LOGGED OUT */

          <div className="hero-image">

            <img
              src="/images/hero-image.png"
              alt="SecureBank digital banking"
            />

          </div>

        ) : (

          /* LOGGED IN */

          <div className="hero-card-area">


            {/* BANKING PREVIEW */}

            <section className="banking-preview">


              <div className="preview-heading">


                <p>
                  YOUR FINANCES
                </p>


                <h2>
                  Your money. Your control.
                </h2>


                <span>
                  Manage your everyday banking with SecureBank.
                </span>


              </div>


              <div className="dashboard-preview">


                {/* BALANCE CARD */}

                <div className="balance-preview">


                  <p>
                    Total Balance
                  </p>


                  <h2>

                    {loading
                      ? "Loading..."
                      : `₹${Number(account.balance).toLocaleString("en-IN")}`
                    }

                  </h2>


                  <div className="balance-bottom">


                    <span>
                      Available Balance
                    </span>


                    <strong>
                      ₹{Number(account.balance).toLocaleString("en-IN")}
                    </strong>


                  </div>


                </div>


                {/* ACCOUNT INFORMATION */}

                <div className="transactions-preview">


                  <div className="transactions-heading">


                    <h3>
                      Account Information
                    </h3>


                    <span>
                      SecureBank
                    </span>


                  </div>


                  {/* ACCOUNT NUMBER */}

                  <div className="transaction">


                    <div>

                      <strong>
                        Account Number
                      </strong>

                      <p>
                        {account.accountNumber}
                      </p>

                    </div>


                    <span>
                      🏦
                    </span>


                  </div>


                  {/* ACCOUNT BALANCE */}

                  <div className="transaction">


                    <div>

                      <strong>
                        Account Balance
                      </strong>

                      <p>
                        Current balance
                      </p>

                    </div>


                    <span className="money-positive">

                      ₹{Number(account.balance).toLocaleString("en-IN")}

                    </span>


                  </div>


                  {/* ACCOUNT STATUS */}

                  <div className="transaction">


                    <div>

                      <strong>
                        Account Status
                      </strong>

                      <p>
                        SecureBank Account
                      </p>

                    </div>


                    <span>
                      ✓
                    </span>


                  </div>


                </div>


              </div>


            </section>


            {/* BANK CARD */}

            <div className="bank-card">


              <div className="bank-card-top">

                <span>
                  SecureBank
                </span>

                <span>
                  🏦
                </span>

              </div>


              <div className="card-balance">

                <p>
                  Available Balance
                </p>


                <h2>

                  ₹{Number(account.balance).toLocaleString("en-IN")}

                </h2>

              </div>


              <div className="card-number">

                {account.accountNumber}

              </div>


              <div className="card-bottom">

                <span>
                  SECURE ACCOUNT
                </span>

                <span>
                  2026
                </span>

              </div>


            </div>


            {/* FLOATING BALANCE */}

            <div className="floating-box">


              <span>
                💰
              </span>


              <div>

                <p>
                  Account Balance
                </p>


                <strong>

                  ₹{Number(account.balance).toLocaleString("en-IN")}

                </strong>

              </div>


            </div>


          </div>

        )}


      </section>


      {/* ================= WHY CHOOSE ================= */}


      <section className="modern-why">


        <div className="why-heading">


          <p>
            WHY SECUREBANK?
          </p>


          <h2>
            Banking designed around you.
          </h2>


          <span>
            Simple, secure and convenient banking for everyday life.
          </span>


        </div>


        <div className="why-grid">


          {/* SECURE */}

          <div className="why-card">


            <div className="why-icon">
              🔒
            </div>


            <h3>
              Secure Banking
            </h3>


            <p>
              Your account and personal information
              are protected with secure banking practices.
            </p>


          </div>


          {/* FAST */}

          <div className="why-card">


            <div className="why-icon">
              ⚡
            </div>


            <h3>
              Fast Transactions
            </h3>


            <p>
              Perform your everyday banking activities
              quickly and conveniently.
            </p>


          </div>


          {/* EASY */}

          <div className="why-card">


            <div className="why-icon">
              📱
            </div>


            <h3>
              Easy Experience
            </h3>


            <p>
              Enjoy a simple and user-friendly
              banking experience from anywhere.
            </p>


          </div>


        </div>


      </section>


      {/* ================= BANKING SERVICES ================= */}


      <section className="modern-services">


        <div className="services-heading">


          <p>
            OUR SERVICES
          </p>


          <h2>
            Everything you need for banking
          </h2>


          <span>
            Simple tools to manage your everyday money.
          </span>


        </div>


        <div className="modern-service-grid">


          {/* SAVINGS */}

          <div className="modern-service-card">


            <div className="service-icon">
              💰
            </div>


            <h3>
              Savings Account
            </h3>


            <p>
              Save your money and manage your
              savings easily from one place.
            </p>


            <Link to="/services">
              Learn More →
            </Link>


          </div>


          {/* MONEY TRANSFER */}

          <div className="modern-service-card">


            <div className="service-icon">
              💸
            </div>


            <h3>
              Money Transfer
            </h3>


            <p>
              Transfer money quickly and
              securely whenever you need it.
            </p>


            <Link to="/services">
              Learn More →
            </Link>


          </div>


          {/* ONLINE BANKING */}

          <div className="modern-service-card">


            <div className="service-icon">
              📱
            </div>


            <h3>
              Online Banking
            </h3>


            <p>
              Access your account and manage
              your banking anytime, anywhere.
            </p>


            <Link to="/services">
              Learn More →
            </Link>


          </div>


          {/* ACCOUNT OVERVIEW */}

          <div className="modern-service-card">


            <div className="service-icon">
              📊
            </div>


            <h3>
              Account Overview
            </h3>


            <p>
              Keep track of your balance and
              understand your everyday spending.
            </p>


            <Link to="/services">
              Learn More →
            </Link>


          </div>


        </div>


      </section>


      {/* ================= FINAL CTA ================= */}


      <section className="home-cta">


        <div className="cta-main">


          <h2>
            Ready to Start Banking?
          </h2>


          <p>
            Open your SecureBank account and enjoy
            simple, secure and convenient banking.
          </p>


          {!token && (

            <Link
              to="/register"
              className="home-button"
            >
              Open Your Account
            </Link>

          )}


        </div>


        <div className="cta-links">


          {/* BANKING */}

          <div className="cta-column">


            <h3>
              Banking
            </h3>


            <Link to="/services">
              Savings Account
            </Link>


            <Link to="/services">
              Money Transfer
            </Link>


            <Link to="/services">
              Online Banking
            </Link>


          </div>


          {/* ACCOUNT */}

          <div className="cta-column">


            <h3>
              Account
            </h3>


            <Link to="/register">
              Open Account
            </Link>


            <Link to="/login">
              Login
            </Link>


            <Link to="/contact">
              Account Support
            </Link>


          </div>


          {/* SUPPORT */}

          <div className="cta-column">


            <h3>
              Support
            </h3>


            <Link to="/contact">
              Contact Us
            </Link>


            <Link to="/contact">
              Help Center
            </Link>


            <Link to="/contact">
              FAQs
            </Link>


          </div>


          {/* SECURITY */}

          <div className="cta-column">


            <h3>
              Security
            </h3>


            <Link to="/about">
              Secure Banking
            </Link>


            <Link to="/about">
              Privacy
            </Link>


            <Link to="/about">
              Banking Safety
            </Link>


          </div>


        </div>


      </section>


    </div>

  );

}


export default Home;