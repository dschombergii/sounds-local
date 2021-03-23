import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import netlifyIdentity from "netlify-identity-widget"

import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles';

import { SongContext } from '../../context/SongContext'
import { theme } from './theme'

import { TemporaryDrawer } from './Drawer'

netlifyIdentity.init()

export default function Navigation() {
    const [error, setError] = useState('')
    const { setTracks, setQuery, isPlaying } = useContext(SongContext)
    const history = useHistory()

    const handleHome = () => {
        setTracks([])
        setQuery('')
    }

    const handleClick = () => {
        netlifyIdentity.open()
        netlifyIdentity.on("login", user => {
            console.log(user)
            console.log("email: ", user.email)
            console.log("name: ", user.user_metadata.full_name)
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: "1", color: "white" }}>
                        <Link className="Link" to="/" onClick={handleHome} style={{ textDecoration: 'none', color: 'var(--active-color)', animation: `${isPlaying ? 'colorChange 30s alternate infinite' : 'null'}` }}>Sounds Local</Link>
                    </Typography>
                    <button onClick={handleClick}>Log In</button>
                    <TemporaryDrawer />
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
}
