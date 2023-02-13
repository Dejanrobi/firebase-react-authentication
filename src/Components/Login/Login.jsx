import React, {useRef, useState} from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../Context/AuthContext';

const Login = () => {
  // Creating the reafs
  const emailRef = useRef();
  const passwordRef = useRef();
  
  const { load, login } = useAuth();

//   console.log(load)
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  //Navigate Hook
  //Navigate to Dashboard after login
  const navigate = useNavigate();    

  // console.log(curentUser?)

  // handleSubmit function
  async function handleSubmit(e){
    // preventing form from refreshing 
    e.preventDefault()

    // Doing validation checks
    try {
        setError('')
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value);            
          
        navigate("/")
        
    } catch (error) {
        setError("Failed to sign In")
        
    }
    setLoading(false);

  }
  

return (
  <>
      <Card>
          <Card.Body>
              <h2 className='text-center mb-4'>Log In</h2>
              
              {error &&   <Alert variant='danger'>{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                  <Form.Group id="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type='email' ref={emailRef} required/>
                  </Form.Group>
                  <Form.Group id="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type='password' ref={passwordRef} required/>
                  </Form.Group>
                  

                  <Button disabled={loading} className='w-100 mt-4' type='submit'>Log In</Button>
              </Form>
          </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
          Do not have an account? <Link to="/signup">Sign Up</Link>
      </div>
    
  </>
)
}

export default Login
