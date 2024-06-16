import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth } from '../firebaseConfig';
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if(user){
                setIsAuthenticated(true);
                setUser(user);
            }else{
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return unsub;
    }, [])

    const login = async (email, password) => {
        try{

        }catch(e){

        }
    }

    const logout = async () => {
        try{

        }catch(e){
            
        }
    }

    const register = async (email, password, username, profileUrl) => {
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('response.user :', response?.user);

            //setUser(response?.user);
            //setIsAuthenticated(true);

            await setDoc(doc(db, "users", response?.user?.uid), {
                username,
                profileUrl,
                userId: response?.user?.uid
            });
            return {success: true, data: response?.user};
        }catch(e){
            return{success: false, msg: e.message };
        }
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext);

    if(!value){
        throw new Error('useAuth precisa estar dentro de AuthContextProvider')
    }
    return value;
}