import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../Store/auth'


const Logout = () => {
    const { logoutUser, isLoggodIn } = useAuth()

    useEffect(() => {
        logoutUser()
    }, [logoutUser, isLoggodIn])

    return (
        <Navigate to='/login' />
    )
}

export default Logout
