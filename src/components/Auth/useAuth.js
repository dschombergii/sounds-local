import React, { useState } from "react";
import firebase from '../../firebase'

export const useAuth = () => {
    const [authUser, setAuthUser] = useState(null)

    React.useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged(user => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null)
            }
        })

        return () => unsubscribe()
    }, [])

    return authUser
}

