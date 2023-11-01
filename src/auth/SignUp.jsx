import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
// import Container from "../components/Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import CustomLink from "../components/CustomLink";
import { commonModalClasses } from "../utils/theme";
import FormContainer from "../form/FormContainer";
import { createUser } from "../api/auth";
import { useNotification, useAuth } from "../hooks";
import { isValidEmail } from "../utils/helper";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import AOS from 'aos';
import Selector from "../components/Selector";


const validateUserInfo = ({ name, email, password, type }) => {
 
  const isValidName = /^[a-z A-Z]+$/;

  if (!name.trim()) return { ok: false, error: "Name is missing!" };
  if (!isValidName.test(name)) return { ok: false, error: "Invalid name!" };

  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };
  if (!type.trim()) return { ok: false, error: "Type is missing!" };


  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};
export default function SignUp() {
  const [message, setMessage] = useState("");

  const { authInfo} = useAuth();
  const { isLoggedIn} = authInfo;
  const {notification} = useNotification();

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    type: "",
  });

  const typeOptions = [
    { title: "Student", value: "student" },
    { title: "Donor", value: "donor" },
    // { title: "Other", value: "other" },
  ];
  

  const navigate = useNavigate();

  const {updateNotification} = useNotification()

  const handleChange = ({target}) => {
    const {name, value} = target;
    setUserInfo({...userInfo, [name]: value});
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const {ok, error}  = validateUserInfo(userInfo);

    if(!ok) return updateNotification('error', error, );

    const response = await createUser(userInfo);
    if(response.error) return updateNotification(response.error);
    navigate("/auth/verification", {
      state: {user: response.user}, 
      replace: true
    });

  }
  const { name, email, password, type } = userInfo;

  useEffect(() => {
    if(isLoggedIn) navigate('/');
  }, [isLoggedIn, navigate])

  useEffect(() => {
    AOS.init({duration: 2000, once: true});
  }
  , [])
  useEffect(() => {
    setMessage(notification)
  } , [notification])

  return (
    <>
    <section className="vh-80">
    <main id="main">
      <Container  className="py-5 h-100 " data-aos="fade-up">
        <Row className="d-flex align-items-center justify-content-center h-100">
          <Col md={8} lg={7} xl={6}>
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Phone image"
            />
          </Col>
          <Col md={7} lg={5} xl={5} className="offset-xl-1">
            <FormContainer>
              <Container>
                <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
                  <Title >Sign Up</Title>
                  <FormInput value={name} onChange={handleChange} label="Name" name="name"  placeholder="Your Name" />
                  <FormInput value={email} onChange={handleChange} label="Email" name="email"  placeholder="your@email.com" />
                  {/* <FormInput value={type} onChange={handleChange} label="Type" name="type"  placeholder="student" /> */}
                  <div className="mb-3 mx-2">
                  <Selector
                    options={typeOptions}
                    value={type}
                    label="Type of Account"
                    onChange={handleChange}
                    name="type" 
                    className=" "
                  />
                  </div>
                  <FormInput value={password} onChange={handleChange} type='password' label="Password" name="password"  placeholder="********" />
                  <div className="text-danger text-center">{message}</div>
                  <Submit value="Sign Up"></Submit>
                  <div className="d-flex justify-content-around align-items-center pb-2">
                    <CustomLink to="/auth/forget-password">Forgot Password</CustomLink>
                    <CustomLink to="/auth/SignIn">Sign In</CustomLink>
                  </div>
                </form>
              </Container>
            </FormContainer>
         </Col>
        </Row>
      </Container>
     </main>
    </section>
    </>
  );
}