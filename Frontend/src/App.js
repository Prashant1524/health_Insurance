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
import AdminAddPolicy from "./Component/AdminAddPolicy";
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
          <Route path="/addpolicy" element={<AdminAddPolicy/>}/>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
