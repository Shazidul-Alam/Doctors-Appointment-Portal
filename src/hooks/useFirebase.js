import initializeFirebase from "../Pages/Login/Login/Firebase/Firebase.init";
import { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,updateProfile,getIdToken } from "firebase/auth";

initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [authError, setAuthError] = useState('')
    const [admin,setAdmin]=useState(false)
    const [token,setToken]=useState('')
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const registerUser = (email, password,name,history) => {
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('')
                const newUser={email, displayName: name}
                setUser(newUser)
                saveUser(email,name,'POST')
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
                console.log(user);
                saveUser(user.email,user.displayName,'PUT')
                setAuthError('')
                const destination = location?.state?.from || '/'
                history.replace(destination)
            }).catch((error) => {
                setAuthError(error.message)
            }).finally(() => setIsLoading(false));;

    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                getIdToken(user)
                .then(idToken=>{
                    setToken(idToken);
                })
            } else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unSubscribe;
    }, [])

    useEffect(() => {
        fetch(`http://localhost:5500/users/${user.email}`)
        .then(res=>res.json())
        .then(data=>setAdmin(data.admin))
    },[user.email])

    const logOut = () => {
        setIsLoading(true)
        signOut(auth).then(() => {
        }).catch((error) => {
        })
            .finally(() => setIsLoading(false))

    }
    const saveUser=(email,displayName,method)=>{
        const user={email,displayName}
        fetch('http://localhost:5500/users',{
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then()
    }


    return {
        user,
        isLoading,
        authError,
        admin,
        token,
        login,
        signInWithGoogle,
        registerUser,
        logOut,
    }

}
export default useFirebase;