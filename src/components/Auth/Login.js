import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import useFormValidation from './useFormValidation'
import validateLogin from './validateLogin'
import firebase from '../../firebase'

import {
    TextField,
    Button,
    Container
} from '@material-ui/core'

const INITIAL_STATE = {
    name: '',
    email: '',
    password: ''
}

export default function Login(props) {
    const { handleChange,
        handleSubmit,
        handleBlur,
        values,
        errors,
        isSubmitting } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser)
    const [login, setLogin] = useState(true)
    const [firebaseError, setFirebaseError] = useState(null)

    async function authenticateUser() {
        const { name, email, password } = values
        try {
            login
                ? await firebase.login(email, password)
                : await firebase.register(name, email, password)
            props.history.push('/')
        } catch (err) {
            console.error('Authentication error', err)
            setFirebaseError(err.message)
        }
    }

    return (
        <div className="App">
            <Container maxWidth="sm">
                <h4>{login ? "Log In" : "Sign Up"}</h4>
                <form className="credentials-form" onSubmit={handleSubmit}>
                    {!login &&
                        <TextField
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            name="name"
                            type="text"
                            label="username"
                            autoComplete="off" />
                    }
                    <TextField
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        name="email"
                        type="email"
                        className={errors.email && "error-input"}
                        label="email"
                        autoComplete="off" />

                    {errors.email && <p className="error-text">{errors.email}</p>}

                    <TextField
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        name="password"
                        type="password"
                        label="password"
                        className={errors.password && "error-input"}
                        placeholder="Choose a secure password" />

                    {errors.password && <p className="error-text">{errors.password}</p>}
                    {firebaseError && <p className="error-text">{firebaseError}</p>}

                    <Button
                        type="submit"
                        className="login-button"
                        variant="contained"
                        disabled={isSubmitting}>
                        Submit
                    </Button>

                    <Button type="button" variant="contained" className="account-button" onClick={() => setLogin(prevLogin => !prevLogin)}>
                        {login ? "need an account?" : "already have an account?"}
                    </Button>

                </form>

                <div style={{ textAlign: "center" }}>
                    <Link to='/forgot-password' style={{ textDecoration: "underline" }}>Forgot Password?</Link>
                </div>

            </Container>
        </div>
    )
}
