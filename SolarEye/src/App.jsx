import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./Home/HomeMain";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import ContactUs from "./Pages/ContactUs";
import OurStory from "./Pages/OurStory";
import FAQPage from "./Pages/FAQ.JSX";
import FeaturePage from "./Pages/FeaturePage";
import OurServices from "./Pages/OurServices";
import ProfilePage from "./Pages/UserProfile";
import CheckoutPage from "./Pages/Checkout/CheckoutPage";
import PayPalComponent from "./components/PayPalComponent";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <Router>
      {/* Navbar */}
      {/* <Navbar /> */}
      <Chatbot />
      {/* Routes */}
        <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/login" element={<LoginPage />} />
           <Route path="/signup" element={<SignupPage />} />
           <Route path="/signup" element={<SignupPage />} />
           <Route path="/our-services" element={<OurServices />} />
           <Route path="/user-profile" element={<ProfilePage />} />
           <Route path="/checkout" element={<CheckoutPage />} />
           {/* <Route path="/StripePayment" element={<StripePayment />} />
        <Route path="/PayPalComponent" element={<PayPalComponent />} /> */}
  
           <Route path="/our-story" element={<OurStory />} />
           <Route path="/contactus" element={<ContactUs />} />
           <Route path="/faq" element={<FAQPage />} />
           <Route path="/features" element={<FeaturePage />} />
        </Routes>
    </Router>
  );
}

export default App;
