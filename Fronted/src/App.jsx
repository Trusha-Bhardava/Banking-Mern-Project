import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Authorizing/login";
import Register from "./pages/Authorizing/Register";
import Deposit from "./pages/Services_Nav/Deposit";
import Withdraw from "./pages/Services_Nav/Withdraw";
import Transfer from "./pages/Services_Nav/Transfer";
import Account from "./pages/Services_Nav/Account";
import Transactions from "./pages/Services_Nav/Transaction";
import Security from "./pages/Services_Nav/Security";


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