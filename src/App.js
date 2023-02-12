
import './App.css';
import Signup from './Components/Signup/Signup';
import { Container } from 'react-bootstrap';
import AuthProvider from './Context/AuthContext';

function App() {
  return (
    // Everything wrapped inside the authProvider to have access to the context
    <AuthProvider>
      <Container className='d-flex align-items-center justify-content-center' 
      style={{minHeight: "100vh"}}
      >
        <div className='w-100' style={{maxWidth: '400px'}}>
          <Signup/>
        </div>      
      </Container>
    </AuthProvider>
    
    
  );
}

export default App;
