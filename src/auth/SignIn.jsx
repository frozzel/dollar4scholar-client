import React, { useEffect, useState} from "react";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import CustomLink from "../components/CustomLink";
import { commonModalClasses } from "../utils/theme";
import { useNotification, useAuth } from "../hooks";
import { isValidEmail } from "../utils/helper";
import { Container, Row, Col, Form } from 'react-bootstrap';
import AOS from 'aos';


const validateUserInfo = ({ email, password }) => {
 
  
  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};



export default function SignIn() {
  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const {updateNotification} = useNotification()
  const {handleLogin, authInfo} = useAuth();
  const {isPending} = authInfo;
  const {notification} = useNotification();


  const handleChange = ({target}) => {
    const {name, value} = target;
   
    setUserInfo({...userInfo, [name]: value});
  }

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    const {ok, error}  = validateUserInfo(userInfo);
    if(!ok) return updateNotification("error", error)
    handleLogin(userInfo.email, userInfo.password);


  }
  useEffect(() => {
    setMessage(notification)
  } , [notification])


  useEffect(() => {
    AOS.init({duration: 2000, once: true});
  }
  , [])


  return (

  <section className="vh-80">
    <main id="main">
      <Container  className="py-5 h-100 " data-aos="fade-up">
        <Row className="d-flex align-items-center justify-content-center h-100">
          <Col md={8} lg={7} xl={6}>
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </Col>
          <Col md={7} lg={5} xl={5} className="offset-xl-1">
 
            {/* <Form> */}
            <Form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
          <Title >Sign In</Title>
          <FormInput  value={userInfo.email} onChange={handleChange} label="Email" name="email"  placeholder="your@email.com" />
          <FormInput value={userInfo.password} onChange={handleChange}  label="Password" name="password" type="password"  placeholder="********" />
          <div className="text-danger text-center">{message}</div>
          <Submit value="Sign In" busy={isPending} ></Submit>
          <div className="d-flex justify-content-around align-items-center pb-2">
            <CustomLink to="/auth/forget-password">Forgot Password</CustomLink>
            <CustomLink to="/auth/SignUp">Sign Up</CustomLink>
            
          </div>
        
        </Form>
        {/* </Form> */}
          </Col>
        </Row>
      </Container>
     </main>
    </section>


  );
}