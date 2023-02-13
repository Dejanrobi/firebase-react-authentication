import React from 'react'
import { Route, redirect } from 'react-router-dom'
import { useAuth } from './Context/AuthContext'

// creating a wrapper around our current route
const PrivateRoute = ({element: Element, ...rest}) => {
  
    const { currentUser } = useAuth()
  
    return (
    <Route
        {...rest}
        render={props =>{
            return currentUser ? <Element {...props}/>: redirect("/login")

        }}
    >
        
    </Route>
  )
}

export default PrivateRoute
