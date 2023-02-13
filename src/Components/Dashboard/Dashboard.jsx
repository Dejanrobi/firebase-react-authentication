import React, { useState } from 'react'
import {Alert, Button, Card} from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const Dashboard = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // current user
    const { currentUser, logout } = useAuth();

    // Navigate hook
    const navigate = useNavigate();

    // logging out function
    async function handleLogout(){
        setError('')
        setLoading(true)

        try {
            await logout();
            // Navigate to login
            setError("Logout Sucess!!")

            setTimeout(() => {
                setError('')
                navigate("/login")
                
            }, 1000);
            
            
        } catch (error) {
            setError("Failed to Log Out")            
        }
        setLoading(false);

    }
  return (
    <>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Profile</h2>
                {error &&   <Alert variant='danger'>{error}</Alert>}
                <strong>Email: </strong>{currentUser && currentUser.email}
                <Link to="/update-profile" className='btn btn-primary w-100 mt-3'> Update Profile</Link>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            <Button disabled={loading} onClick={handleLogout}>Log Out</Button>
        </div>
    </>
  )
}

export default Dashboard
