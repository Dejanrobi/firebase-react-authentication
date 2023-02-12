import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react'
// importing the auth module
import { auth } from "../firebase";

// Creating a context
const AuthContext = React.createContext();

// A function enabling us to use the context
export function useAuth(){
    return useContext(AuthContext);
}

// we will take children inside the authprovider and render them inside
const AuthProvider = ({children}) => {
    // setting the currentUser
    const [currentUser, setCurrentUser] = useState();

    // Signing up the user usin the auth module
    
    function signup(email, password){ 
        const userResponse  = createUserWithEmailAndPassword(auth, email, password);
        return userResponse;                         
    }

    // checking whether we have a user
    useEffect(()=>{        
        // using the onAuthStateChanged to check whether we have a user
        const unsubscribe = onAuthStateChanged(auth, (user) =>{
            setCurrentUser(user)
            console.log(user);
        })
        
        return ()=>{
            unsubscribe();
        };

    }, [])

    

    // storing the currentUser in the value
    // using the signup, pass it as part of our authcontext
    const value = {
        currentUser,
        signup
    }

  return (
    // using the authContext inside the provider (and returning a value)
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
