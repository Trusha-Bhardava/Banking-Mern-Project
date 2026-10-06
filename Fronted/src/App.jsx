import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/auth/login";
import Register from "./pages/Register";
import Deposit from "./pages/customer/Deposit";
import Withdraw from "./pages/customer/Withdraw";
import Transfer from "./pages/customer/Transfer";
import Account from "./pages/customer/Account";
import Transactions from "./pages/customer/Transaction";
import Security from "./pages/customer/Security";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/services" element={<Services />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/deposit" element={<Deposit />} />

        <Route path="/withdraw" element={<Withdraw />} />

        <Route path="/transfer" element={<Transfer />} />

        <Route path="/account" element={<Account />} />

        <Route path="/transactions" element={<Transactions />} />

        <Route path="/security" element={<Security />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;