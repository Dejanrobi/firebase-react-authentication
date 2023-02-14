import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail, updateEmail, updatePassword } from 'firebase/auth';
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
    const [load, setLoad] = useState(true);

    // Signing up the user using the auth module  
    function signup(email, password){ 
        const userResponse  = createUserWithEmailAndPassword(auth, email, password);
        return userResponse;                         
    }

    //Login User with email and password.
     function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Logout function

    function logout(){
        // calling the signout function
        return signOut(auth);
    }

    // Reset password function
    function resetPassword(email){
        return sendPasswordResetEmail(auth, email)
    }

    // Update Email
    function emailUpdate(email){
        return updateEmail(auth.currentUser, email)
    }

    // Update Password
    function passwordUpdate(password){
        return updatePassword(auth.currentUser, password)
    }




    // checking whether we have a user
    useEffect(()=>{        
        // using the onAuthStateChanged to check whether we have a user
        const unsubscribe = onAuthStateChanged(auth, (user) =>{
               
            setCurrentUser(user)
            // initial Loading (sets loading to false because the onAuthState changed was carried out and the user was found then set )
            setLoad(false);
            // console.log(user);
        })
        
        return ()=>{
            unsubscribe();
        };

    }, [])

    

    // storing the currentUser in the value
    // using the signup, pass it as part of our authcontext
    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        emailUpdate,
        passwordUpdate,
        load
    }

  return (
    // using the authContext inside the provider (and returning a value)
    // if we are not loading, we render out the children but if we are, we do not render out the children
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
