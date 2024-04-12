import { getCurrentUser } from '@/lib/appwrite/api'
import { User, contextType} from '@/types'
import {createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

export const INITIAL_USER = {
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: ''
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: ()=> {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean,
};


const AuthContext = createContext <contextType> (INITIAL_STATE);

const AuthProvider = ({children}: {children: ReactNode}) => {
    const navigate = useNavigate ();
    const [user, setUser] = useState <User> (INITIAL_USER)
    const [isLoading, setIsLoading] = useState (false);
    const [isAuthenticated, setIsAuthenticated] = useState (false);

    useEffect (()=>{        
        if (localStorage.getItem ('cookieFallback')==='[]' || localStorage.getItem('cookieFallback') === null ){
            navigate ('/sign-in')
        }
        checkAuthUser();
    },[])

    const checkAuthUser = async () =>{
        setIsLoading (true)
        try{
            const currentAccount = await getCurrentUser();
            if (currentAccount){
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageUrl: currentAccount.imageUrl,
                    bio: currentAccount.bio,
                })

                setIsAuthenticated(true);
                return true;
            }
            return false;
        }
        catch (e){
            console.log (e);
            return false;
        }
        finally{
            setIsLoading (false);   
        }
    }

    const value = {
        user,
        isLoading,
        isAuthenticated,
        setUser,
        setIsAuthenticated,
        checkAuthUser
    }
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useUserContext = () => useContext (AuthContext);