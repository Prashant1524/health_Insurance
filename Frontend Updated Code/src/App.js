import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestimonialApprovalPage from "./Component/TestimonialApproval";
import ArrangeLandingPage from "./Component/ArrangeLandingPage";
import AdminRegistrationPage from "./Component/AdminRegistrationPage";
import Navbar from "./Component/Header";
import Login from "./Component/Login";
import UserRegistration from "./Component/UserRegistration";
import HomePage from "./Component/HomePage";
import Footer from "./Component/Footer";
import InsurancePolicyPage from "./Component/InsurancePolicyPage";
import ProfilePage from "./Component/ProfilePage";
import UserPolicy from "./Component/UserPolicy";
import AddPolicy from "./Component/AddPolicy";
import AddAnnouncement from "./Component/AddAnnouncement";
import Review from "./Component/Review";
import ForgotPassword from "./Component/ForgotPassword";
import ResetPassword from "./Component/ResetPassword";
import UserList from "./Component/UserList";
import ContactUs from "./Component/ContactUs";
import AdminLogin from "./Component/AdminLogin";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/approve" element={<TestimonialApprovalPage />} />
          <Route path="/arrange" element={<ArrangeLandingPage />} />
          <Route path="/add" element={<AdminRegistrationPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<UserRegistration />} />
          <Route path="/policies" element={<InsurancePolicyPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/userplans" element={<UserPolicy />} />
          <Route path="/addplans" element={<AddPolicy />} />
          <Route path="/announcements" element={<AddAnnouncement />} />
          <Route path="/review" element={<Review />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
