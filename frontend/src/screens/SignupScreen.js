import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';

export default function SignupScreen() {

// useNavigate
  const navigate = useNavigate();
// useLocation
  const { search } = useLocation();

// Redirect
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

// useState acount
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // save store and local storage
  const { state, dispatch: ctxDispatch} = useContext(Store)
  const { userInfo } = state;

// Submit handler
  const submitHandler = async (e) =>{
    e.preventDefault();
    if(password !== confirmPassword) {
      toast.error('Password do not match!')
      return;
    }
    try{
      const {data} = await Axios.post('/api/users/signup', { 
        name,
        email, 
        password
      })
      ctxDispatch({type: 'USER_SIGNIN', payload: data})

      localStorage.setItem('userInfo', JSON.stringify(data))

      navigate(redirect || '/')     
    } catch (err) {
      toast.error(getError(err))
    }
  }

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  return (

//Sign in

    <Container className="small-container">

{/* title */}

      <Helmet>
        <title>Sign Up</title>
      </Helmet>



      <h1 className="my-3">Sign Up</h1>
      <Form onSubmit={submitHandler}>

{/* name */}
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="name" required onChange={(e) => setName(e.target.value)}/>
        </Form.Group>

{/* email */}        
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>

{/* password */}

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

{/* password */}

        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" required onChange={(e) => 
            setConfirmPassword(e.target.value)} />
        </Form.Group>

{/* Submit button */}

        <div className="my-3">
          <Button type="submit">Sign Up</Button>
        </div>
        <div className="my-3">
         Already have an account?{' '}
          <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
        </div>
      </Form>
      
    </Container>
  );
}
