import { Routes, Route } from "react-router-dom";
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Footer from "./components/Footer";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import EmailVerification from "./auth/EmailVerification.jsx";
import NotFound from "./pages/NotFound";
import ForgetPassword from "./auth/ForgetPassword";
import ConfirmPassword from "./auth/ConfirmPassword";
// import Collegesnuniversities from "./pages/Collegesnuniversities";
// import Investors from "./pages/Investors";
import About from "./pages/About";
// import Donor from "./pages/Donor";
// import Student from "./pages/Student";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import DonorSpotLight from "./pages/DonorSpotLight";
import Winner from "./pages/Winner";
import AdminDonorInfo from "./pages/AdminDonorInfo";
import AdminWinnerInfo from "./pages/AdminWinnerInfo";
import CheckoutForm from "./components/CheckoutForm";
import CheckoutFormDonor from "./components/CheckoutFormDonor";
import Return from "./components/Return";
import Frame from "./pages/Frame.jsx";


function App() {
 

  return (<>
     <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/auth/SignUp' element={<SignUp/>} />
        <Route path='/auth/SignIn' element={<SignIn/>} />
        <Route path='/auth/verification' element={<EmailVerification/>} />
        <Route path='*' element={<NotFound/>} />
        <Route path='/auth/forget-Password' element={<ForgetPassword/>} />
        <Route path='/auth/reset-password' element={<ConfirmPassword/>} />
        {/* <Route path='/Collegesnuniversities' element={<Collegesnuniversities/>} />
        <Route path='/Investors' element={<Investors/>} /> */}
        <Route path='/About' element={<About />} />
        {/* <Route path='/Donor' element={<Donor/>} /> */}
        {/* <Route path='/Student' element={<Student/>} /> */}
        <Route path='/Contact' element={<Contact/>} />
        <Route path='/Dashboard/:userId' element={<Dashboard/>} />
        <Route path='/DonorSpotLight' element={<DonorSpotLight/>} />
        <Route path='/Winner' element={<Winner />} />
        <Route path='/AdminDonorInfo/:userId' element={<AdminDonorInfo />} />
        <Route path="/AdminWinnerInfo/:userId" element={<AdminWinnerInfo />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/checkoutDonor" element={<CheckoutFormDonor />} />
          <Route path="/return" element={<Return />} />
          <Route path="/frame" element={<Frame />} />
      </Routes>
    <Footer />
   
        
  </>)
}

export default App
