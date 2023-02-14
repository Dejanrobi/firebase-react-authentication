import { updateEmail } from 'firebase/auth';
import React, {useRef, useState} from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../Context/AuthContext';

const UpdateProfile = () => {

    // Creating the reafs
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, passwordUpdate, emailUpdate } = useAuth();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Navigate Hook
    const navigate = useNavigate();

    // console.log(curentUser?)

    // handleSubmit function
    function handleSubmit(e){
        // preventing form from refreshing 
        e.preventDefault()

        // Doing validation checks
        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            setLoading(false)
            return setError('Passwords do not match');
        }

        // checking if the email not equal to currentUser email
        const promises = []
        setLoading(true)
        setError("")

        if (emailRef.current.value && emailRef.current.value !== currentUser.email){
            promises.push(emailUpdate(emailRef.current.value))
        }else if (emailRef.current.value == currentUser.email){
            setLoading(false)
            return setError("Please Add a New Email")
        }
    
        
        // checking if there is a password

        if (passwordRef.current.value){
            promises.push(passwordUpdate(passwordRef.current.value))
        }

        // running the promises
        Promise.all(promises).then(()=>{
            // if they are all successfull, redirect back to the homepage
            navigate("/");
        }).catch((error)=>{
            setError(error.message)
        }).finally(()=>{
            setLoading(false)
        })
              
    }

    // console.log(curentUser)

  return (
    <>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Update Profile</h2>
                
                {error &&   <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} defaultValue={currentUser.email}/>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef}  placeholder='Leave blank to keep the same'/>
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type='password' ref={passwordConfirmRef}  placeholder='Leave blank to keep the same'/>
                    </Form.Group>

                    <Button disabled={loading} className='w-100 mt-4' type='submit'>Update</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            <Link to="/">Cancel</Link>
        </div>
      
    </>
  )
}

export default UpdateProfile
