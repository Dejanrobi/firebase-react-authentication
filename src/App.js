
import './App.css';
import Signup from './Components/Signup/Signup';
import { Container } from 'react-bootstrap';
import AuthProvider, { useAuth } from './Context/AuthContext';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import PrivateRoute from './PrivateRoute.';
import Loading from './Components/Loading Page/Loading';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile';

function App() {
  const { load, currentUser } = useAuth();
  // console.log(load)
  return (
    // Everything wrapped inside the authProvider to have access to the context
    // Switch determines which router we are currently on
      <Container className='d-flex align-items-center justify-content-center' 
      style={{minHeight: "100vh"}}
      >
        <div className='w-100' style={{maxWidth: '400px'}}>
          {/* <Loading/> */}

          {
            load ?(
              <Loading/>
            ):
            (

              <>
              {
                !currentUser?(
                  <Routes>
                    <Route exact path='/' element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="forgot-password" element={<ForgotPassword/>}/>
                  </Routes>

                ):(
                  <Routes>
                    <Route exact path='/' element={<Dashboard/>}/>
                    <Route path="/signup" element={<Navigate to="/"/>} />
                    <Route path="/login" element={<Navigate to="/"/>} />
                    <Route path="/update-profile" element={<UpdateProfile/>} />
                  </Routes>

                )
              }
              </>

              
            )
          }

          
        
        </div>      
      </Container>
    

  );
}

export default App;
