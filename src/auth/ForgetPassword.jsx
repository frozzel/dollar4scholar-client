import React, { useEffect, useState } from "react";
import { forgetPassword } from "../api/auth";
import { useNotification } from "../hooks";
import { isValidEmail } from "../utils/helper";
import { commonModalClasses } from "../utils/theme";
// import Container from "../components/Container";
import CustomLink from "../components/CustomLink";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import {  Container, Row, Col, Form, Button } from 'react-bootstrap';
import AOS from 'aos';
import forgot from '../assets/img/forgot.jpg';

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { updateNotification } = useNotification();
  const { notification } = useNotification();

  const handleChange = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email))
      return updateNotification("error", "Invalid email!");

    const { error, message } = await forgetPassword(email);
    if (error) return updateNotification("error", error);

    updateNotification("error", message);
  };

  useEffect(() => {
    AOS.init({duration: 2000, once: true});
  }
  , [])
  useEffect(() => {
    setMessage(notification)
  }
  , [notification])

  return (
    
      <section className="">
  
    <main id="main">
      <Container  className="py-5 h-80 " data-aos="fade-up">
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
          <Title>Please Enter Your Email</Title>
          <FormInput
            onChange={handleChange}
            value={email}
            label="Email"
            placeholder="john@email.com"
            name="email"
          />
          <div className="text-danger text-center">{message}</div>

          <Submit value="Send Link" />

          <div className="d-flex justify-content-around align-items-center pb-2">
            <CustomLink to="/auth/signIn">Sign in</CustomLink>
            <CustomLink to="/auth/signUp">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
    


    </Col>
        </Row>
        <Row className="d-flex align-items-center justify-content-center h-100">
        <div className="text-center"><small><a href="https://www.freepik.com/free-vector/forgot-password-concept-illustration_7070628.htm#query=forgot%20password&position=0&from_view=keyword&track=ais">Image by storyset</a> on Freepik</small></div>
        </Row>
      </Container>
     </main>
    </section>
  );
}
