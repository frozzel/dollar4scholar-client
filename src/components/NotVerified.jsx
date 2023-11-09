import React from 'react';
import { useAuth } from '../hooks';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import { Button } from 'react-bootstrap';

export default function NotVerified() {
    const {authInfo} = useAuth()
    const {isLoggedIn} = authInfo;
    const isVerified = authInfo.profile?.isVerified;
    
    const  navigate = useNavigate();

    const navigateToVerification = () => {
        navigate('/auth/verification', {state: {user: authInfo.profile}});
      }
  return (
    <Container className='bg-warning notV'>
      {isLoggedIn && !isVerified ? 
      <p className='text-lg text-center  p-2 mt-5'>It looks like you haven't verified your account, Or need to log back in {""} 
      <Button onClick={navigateToVerification} className='text-blue-500 font-semibold hover:underline getstarted3' variant="outline-*">Click here to verify your Account</Button>
      </p> : null}
    </Container>
  )
}
