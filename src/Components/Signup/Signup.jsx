import React, {useRef, useState} from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';

import { useAuth } from '../../Context/AuthContext';

const Signup = () => {

    // Creating the reafs
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, signup} = useAuth();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // console.log(curentUser?)

    // handleSubmit function
    async function handleSubmit(e){
        // preventing form from refreshing 
        e.preventDefault()

        // Doing validation checks
        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match');
        }

         // calling our signup function and passing in the email and password
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value);            
        } catch (error) {
            setError("Failed to create an account")
            
        }

        setLoading(false)

        
       
        
    }

    // console.log(curentUser)

  return (
    <>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Sign Up</h2>
                {JSON.stringify(currentUser)}
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
                    <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type='password' ref={passwordConfirmRef} required/>
                    </Form.Group>

                    <Button disabled={loading} className='w-100 mt-4' type='submit'>Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Already have an account? Log In
        </div>
      
    </>
  )
}

export default Signup
