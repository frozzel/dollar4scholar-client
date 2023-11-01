import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ImSpinner3 } from "react-icons/im";
import { commonModalClasses } from "../utils/theme";
// import Container from "../components/Container";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import { verifyPasswordResetToken, resetPassword } from "../api/auth";
import { useNotification } from "../hooks";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import AOS from 'aos';
import forgot from '../assets/img/forgot.jpg';

 

export default function ConfirmPassword() {
  const [password, setPassword] = useState({
    one: "",
    two: "",
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");
  const [message, setMessage] = useState("");

  const { updateNotification } = useNotification();
  const { notification } = useNotification(); 
  const navigate = useNavigate();

  // isValid, !isValid
  useEffect(() => {
    isValidToken();
  }, []);

  useEffect(() => {
    AOS.init({duration: 2000, once: true});
  }
  , [])

  useEffect(() => {
    setMessage(notification)
  } , [notification])


  const isValidToken = async () => {
    const { error, valid } = await verifyPasswordResetToken(token, id);
    setIsVerifying(false);
    if (error) {
      navigate("/auth/reset-password", { replace: true });
      return updateNotification("error", error);
    }

    if (!valid) {
      setIsValid(false);
      return navigate("/auth/reset-password", { replace: true });
    }

    setIsValid(true);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPassword({ ...password, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.one.trim())
      return updateNotification("error", "Password is missing!");

    if (password.one.trim().length < 8)
      return updateNotification("error", "Password must be 8 characters long!");

    if (password.one !== password.two)
      return updateNotification("error", "Password do not match!");

    const {error, message} = await resetPassword({newPassword: password.one, userId: id, token})
    if(error) return updateNotification("error", error)
    updateNotification("success", message)
    navigate("/auth/signIn", { replace: true });
  };

  if (isVerifying)
    return (
      <section className="vh-80">
      <main id="main">
        <Container  className="py-5 h-100 " data-aos="fade-up">
          <Row className="d-flex align-items-center justify-content-center h-100">          
          <Col md={8} lg={7} xl={6}>
            <img
              src={forgot}
              className="img-fluid"
              alt="Phone image"
            />
          </Col>
          <Col md={7} lg={5} xl={5} className="offset-xl-1">
      <FormContainer>
        <Container>
          <div className="flex space-x-2 items-center">
            <h1 className="text-4xl font-semibold dark:text-white text-primary">
              Please wait we are verifying your token!
            </h1>
            <ImSpinner3 className="animate-spin text-4xl dark:text-white text-primary" />
          </div>
        </Container>
      </FormContainer>
      </Col>
    </Row>
      </Container>
     </main>
    </section>
    );

  if (!isValid)
    return (
      <section className="vh-80">
      <main id="main">
        <Container  className="py-5 h-100 " data-aos="fade-up">
          <Row className="d-flex align-items-center justify-content-center h-100">          
          <Col md={8} lg={7} xl={6}>
            <img
              src={forgot}
              className="img-fluid"
              alt="Phone image"
            />
          </Col>
          <Col md={7} lg={5} xl={5} className="offset-xl-1">
      <FormContainer>
        <Container>
          <h1 className="text-4xl font-semibold dark:text-white text-primary">
            Sorry the token is invalid!
          </h1>
        </Container>
      </FormContainer>
      </Col>
    </Row>
      </Container>
     </main>
    </section>
    );

  return (
    <section className="vh-80">
      <main id="main">
        <Container  className="py-5 h-100 " data-aos="fade-up">
          <Row className="d-flex align-items-center justify-content-center h-100">          
          <Col md={8} lg={7} xl={6}>
            <img
              src={forgot}
              className="img-fluid"
              alt="Phone image"
            />
          </Col>
          <Col md={7} lg={5} xl={5} className="offset-xl-1">
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-96"}>
          <Title>Enter New Password</Title>
          <FormInput
            value={password.one}
            onChange={handleChange}
            label="New Password"
            placeholder="********"
            name="one"
            type="password"
          />
          <FormInput
            value={password.two}
            onChange={handleChange}
            label="Confirm Password"
            placeholder="********"
            name="two"
            type="password"
          />
                    <div className="text-danger text-center">{message}</div>

          <Submit value="Confirm Password" />
        </form>
      </Container>
    </FormContainer>
 
</Col>
    </Row>
      </Container>
     </main>
    </section>
  );
}
