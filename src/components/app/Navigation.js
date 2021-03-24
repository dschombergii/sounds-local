import React, { useState, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles';

import { SongContext } from '../../context/SongContext'
import FirebaseContext from '../../firebase/context'
import { theme } from './theme'

export default function Navigation() {
    const [error, setError] = useState('')
    const { setTracks, setQuery, isPlaying, setModalOpen } = useContext(SongContext)
    const { firebase, user } = useContext(FirebaseContext)
    const history = useHistory()

    const handleOpen = () => {
        setModalOpen(true);
    };

    const handleHome = () => {
        setTracks([])
        setQuery('')
    }

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: "1", color: "white" }}>
                        <Link className="Link" to="/" onClick={handleHome}
                            style={{ textDecoration: 'none', color: 'var(--active-color)', animation: `${isPlaying ? 'colorChange 30s alternate infinite' : 'null'}` }}>
                            Sounds Local</Link>
                    </Typography>
                    {user
                        ? <Typography style={{ color: "white" }}>
                            <Link className="Link"
                                onClick={handleOpen}
                                style={{ textDecoration: 'none', color: 'var(--active-color)', animation: `${isPlaying ? 'colorChange 30s alternate infinite' : 'null'}` }}>
                                {`Hello, ${user.displayName}!`}
                            </Link>
                        </Typography>
                        : <Typography variant="h8" style={{ color: "white" }}>
                            <Link className="Link"
                                onClick={handleOpen}
                                style={{ textDecoration: 'none', color: 'var(--active-color)', animation: `${isPlaying ? 'colorChange 30s alternate infinite' : 'null'}` }}>
                                Log In
                            </Link>
                        </Typography>}
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
}
