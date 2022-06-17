import initializeFirebase from "../Pages/Login/Login/Firebase/Firebase.init";
import { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,updateProfile } from "firebase/auth";

initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [authError, setAuthError] = useState('')
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const registerUser = (email, password,name,history) => {
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('')
                const newUser={email, displayName: name}
                setUser(newUser)
                updateProfile(auth.currentUser, {
                    displayName: name
                  }).then(() => {
                  }).catch((error) => {
                    setAuthError(error.message)
                  });
                history.replace('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                setAuthError(error.message)
                
            })
            .finally(() => setIsLoading(false));
    }
    const login = (email, password, location, history) => {
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/'
                history.replace(destination)
                setAuthError('')
            })
            .catch((error) => {
                const errorCode = error.code;
                setAuthError(error.message)
            })
            .finally(() => setIsLoading(false));
    }
    const signInWithGoogle = (location, history) => {
        setIsLoading(true)
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                setAuthError('')
            }).catch((error) => {
                setAuthError(error.message)
            }).finally(() => setIsLoading(false));;

    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unSubscribe;
    }, [])

    const logOut = () => {
        setIsLoading(true)
        signOut(auth).then(() => {
        }).catch((error) => {
        })
            .finally(() => setIsLoading(false))

    }


    return {
        user,
        isLoading,
        authError,
        login,
        signInWithGoogle,
        registerUser,
        logOut,
    }

}
export default useFirebase;