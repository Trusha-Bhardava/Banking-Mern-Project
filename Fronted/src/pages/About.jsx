function About() {
  return (
    <div className="about-page">

      <h1>About SecureBank</h1>

      <p className="about-text">
        SecureBank is a modern banking platform that provides
        simple, secure and convenient banking services.
      </p>

<div className="about-image">
  <img
    src="/images/about1.jpg"
    alt="SecureBank digital banking"
  />
  <img
    src="/images/about2.jpg"
    alt="SecureBank digital banking"
  />
  <img
    src="/images/about3.png"
    alt="SecureBank digital banking"
  />
</div>
      <div className="about-cards">

        <div className="about-card">
          <h2>10K+</h2>
          <p>Happy Customers</p>
        </div>

        <div className="about-card">
          <h2>24/7</h2>
          <p>Customer Support</p>
        </div>

        <div className="about-card">
          <h2>100%</h2>
          <p>Secure Banking</p>
        </div>

      </div>


      <div className="about-content">

        <h2>Our Mission</h2>

        <p>
          Our mission is to make banking simple and accessible
          through secure digital services and an easy-to-use
          banking platform.
        </p>

      </div>

    </div>
  );
}

export default About;