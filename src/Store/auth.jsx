import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const authorizationToken = `Bearer ${token}`
    const API = import.meta.env.VITE_APP_URI_API
    



    //Store token in local storage
    const storeTokenInLocalStorage = (serverToken) => {
        localStorage.setItem('token', serverToken)
        setToken(serverToken)
    }

    // let isLoggodIn = !!token; // Convert token to boolean
    // console.log('isLoggodIn', isLoggodIn);


    //Logput functionality
    const logoutUser = () => {
        localStorage.removeItem('token'); // remove from local storage first
        setToken(''); // trigger re-render
        setUser(null); // reset user
    }

    //Jwt Athentication

    const userAuthentication = async () => {
        try {
            setIsLoading(true)
            const responce = await fetch('http://localhost:1000/api/auth/user', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (responce.ok) {
                const data = await responce.json()
                setUser(data.userData)
                console.log('User Data:', data.userData);
                setIsLoading(false)
            }
            else {
                console.log('Error fetching user data');

                setIsLoading(false)

            }

        } catch (error) {
            console.log('Jwt authentication Error:', error.message);

        }
    }


    useEffect(() => {
        if (token) {
            userAuthentication();
        } else {
            setUser(null);
            setIsLoading(false);
        }

    }, [token])

    return (
        <AuthContext.Provider value={{ isLoggodIn: !!token, storeTokenInLocalStorage, logoutUser, user, authorizationToken, isLoading, API }}>
            {children}
        </AuthContext.Provider>
    )
}

//Custom hook to use the AuthContext
export const useAuth = () => {
    const authContextValue = useContext(AuthContext)
    if (!authContextValue) {
        throw new Error("useTokenStorage must be used within an AuthProvider");
    }
    return authContextValue;
}