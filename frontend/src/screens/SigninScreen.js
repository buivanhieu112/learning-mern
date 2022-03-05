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

export default function SigninScreen() {

// useNavigate
  const navigate = useNavigate();
// useLocation
  const { search } = useLocation();

// Redirect
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

// useState acount
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // save store and local storage
  const { state, dispatch: ctxDispatch} = useContext(Store)
  const { userInfo } = state;
// Submit handler
  const submitHandler = async (e) =>{
    e.preventDefault()
    try{
      const {data} = await Axios.post('/api/users/signin', { 
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
        <title>Sign In</title>
      </Helmet>

{/* email */}

      <h1 className="my-3">Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>

{/* password */}

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

{/* Submit button */}

        <div className="my-3">
          <Button type="submit">Sign In</Button>
        </div>
        <div className="my-3">
          New customer?{' '}
          <Link to={`signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
      
    </Container>
  );
}
