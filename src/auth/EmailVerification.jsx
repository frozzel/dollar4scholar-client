import  { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyUserEmail } from "../api/auth";
import { commonModalClasses } from "../utils/theme";
import FormContainer from "../form/FormContainer";
import { useAuth, useNotification } from "../hooks";
import { resendEmailVerificationToken } from "../api/auth";
import { Container, Row, Col, Button } from 'react-bootstrap';
import AOS from 'aos';
// import CustomLink from "../components/CustomLink";

const OTP_LENGTH = 6;
let currentOTPIndex;

const isValidOTP = (otp) => {
  let valid = false;

  for (let val of otp) {
    valid = !isNaN(parseInt(val));
    if (!valid) break;
  }

  return valid;
};

export default function EmailVerification() {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const [message, setMessage] = useState("");



  const {isAuth, authInfo}=useAuth();
  const {isLoggedIn, profile} = authInfo;
  const isVerified = profile?.isVerified;
  const inputRef = useRef();
  const {updateNotification} = useNotification()
  const {notification} = useNotification()

  const { state } = useLocation();
  const user = state?.user;
  

  const navigate = useNavigate();

  const focusNextInputField = (index) => {
    setActiveOtpIndex(index + 1);
  };

  const focusPrevInputField = (index) => {
    let nextIndex;
    const diff = index - 1;
    nextIndex = diff !== 0 ? diff : 0;
    setActiveOtpIndex(nextIndex);
  };

  const handleOtpChange = ({ target }) => {
    const { value } = target;
    const newOtp = [...otp];
    newOtp[currentOTPIndex] = value.substring(value.length - 1, value.length);

    if (!value) focusPrevInputField(currentOTPIndex);
    else focusNextInputField(currentOTPIndex);
    setOtp([...newOtp]);
  };

  const handleOTPResend = async () => {
    const {error, message} = await resendEmailVerificationToken(user.id);
    if(error) return updateNotification('error', error);
    updateNotification('success', message);
  }



  const handleKeyDown = ({ key }, index) => {
    currentOTPIndex = index;
    if (key === "Backspace") {
      focusPrevInputField(currentOTPIndex);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidOTP(otp)) {
      return updateNotification("error", "invalid OTP");
    }

    // submit otp
    const { error, message, user: userResponse} = await verifyUserEmail({
      OTP: otp.join(""),
      userId: user.id,
    });
    if (error) return updateNotification('error', error);

    updateNotification('success', message);
    localStorage.setItem('auth-token', userResponse.token);
    isAuth();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  useEffect(() => {
    if (!user) navigate("/not-found");
    if (isLoggedIn && isVerified)navigate(`/Dashboard/${user.id}`);
  }, [user, isLoggedIn, isVerified, navigate]);

  useEffect(() => {
    AOS.init({duration: 2000, once: true});
  } 
  , [])
  useEffect(() => {
    setMessage(notification)
  } , [notification])

  // if(!user) return null

  return (
    
    <section className=" vh-80">
    <main id="main">
    <Container  className="py-5 h-100" data-aos="fade-up">
        <Row className="d-flex align-items-center justify-content-center h-100">
          <Col md={8} lg={7} xl={6}>
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Phone image"
            />
          </Col>
          <Col md={7} lg={5} xl={5} className="offset-xl-1 ">

    <FormContainer className="container">
      {/* <form onSubmit={handleSubmit} className={commonModalClasses } variant="outline-*"> */}
      <form onSubmit={handleSubmit} className={commonModalClasses } >

        <div className="text-center  pt-4">
          <h5>Please enter the Code to verify your account</h5>
          <p className="text-light-subtle">
            The Code was sent to your email
          </p>
        </div>
  
        <div className="d-flex justify-content-center align-items-center space-4">
          {otp.map((_, index) => {
            return (
              <input
                ref={activeOtpIndex === index ? inputRef : null}
                key={index}
                type="number"
                value={otp[index] || ""}
                onChange={handleOtpChange}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="form-control2 border border-light-subtle focus-border-primary rounded bg-transparent text-center text-primary font-weight-bold text-xl spin-button-none"
              />
            );
          })}
        </div>
        {/* <div className="d-flex justify-content-around align-items-center">
            <CustomLink type="submit" >Verify Account</CustomLink>
            <CustomLink to="/auth/SignUp">Sign Up</CustomLink>
            
          </div> */}
  
        <div className="d-flex justify-content-around align-items-center pb-4">
          <Button type="submit" className="getstarted3" style={{ textDecoration: 'none', outline: "none" }} variant="outline-*">
            Verify Account
          </Button>
          <button onClick={handleOTPResend} type="button" className="btn btn-link text-primary font-weight-bold">
            I don`t have a code
          </button>
        </div>
        <div className="text-danger text-center">{message}</div>
      </form>
    </FormContainer>

    </Col>
    </Row>
    </Container>
    </main>
  </section>
  
  );
}
