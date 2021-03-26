import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { AppBar, Toolbar, Typography, TextField, Tooltip } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import SearchIcon from '@material-ui/icons/Search'
import MenuIcon from '@material-ui/icons/Menu'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'

import { SongContext } from '../../context/SongContext'
import FirebaseContext from '../../firebase/context'
import { theme } from './theme'

export const Navigation = () => {
    const {
        isPlaying,
        setModalOpen,
        fetchTracks,
        setAnchorEl,
        setDetails,
        setCity } = useContext(SongContext)

    const { firebase, user } = useContext(FirebaseContext)

    const [query, setQuery] = useState('')

    useEffect(() => {
        return user
    }, [])

    const handleOpen = () => {
        setModalOpen(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        let strippedQuery = query
        strippedQuery = strippedQuery.replace(/\s+/g, '-').toLowerCase()
        setAnchorEl({ x: 0, y: 0 })
        setDetails(query)
        setCity(query)
        fetchTracks(strippedQuery)
        setQuery('')
    }

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: "1", color: "white" }}>
                        <Link className="Link"
                            style={{ textDecoration: 'none', color: 'var(--active-color)', animation: `${isPlaying ? 'colorChange 30s alternate infinite' : 'null'}` }}>
                            Sounds Local</Link>
                    </Typography>
                    <Tooltip placement="left" arrow
                        title={`Can't find your city on the globe? Search it here! (hint: you can also search States, Countries, and Genres)`}  >
                        <InfoOutlinedIcon style={{
                            color: 'var(--active-color)', marginRight: "10px",
                            animation: `${isPlaying ? 'colorChange 30s alternate infinite' : 'null'}`
                        }} />
                    </Tooltip>
                    <div>
                        <form class="search" onSubmit={handleSubmit}
                            style={{ color: 'var(--active-color)', animation: `${isPlaying ? 'colorChange 30s alternate infinite' : 'null'}` }}>
                            <TextField value={query} onChange={event => setQuery(event.target.value)} />
                            <button type="submit"><SearchIcon /></button>
                        </form>
                    </div>
                    <div style={{
                        textDecoration: 'none', color: 'var(--active-color)', display: "flex", flexDirection: "row",
                        animation: `${isPlaying ? 'colorChange 30s alternate infinite' : 'null'}`
                    }}>
                        {user
                            ? <Typography>
                                <Link className="Link"
                                    onClick={handleOpen}
                                    style={{ textDecoration: 'none', color: 'var(--active-color)', animation: `${isPlaying ? 'colorChange 30s alternate infinite' : 'null'}` }}>
                                    {`Hello, ${user.displayName}`}
                                </Link>
                            </Typography>
                            : <Typography>
                                <Link className="Link"
                                    onClick={handleOpen}
                                    style={{ textDecoration: 'none', color: 'var(--active-color)', animation: `${isPlaying ? 'colorChange 30s alternate infinite' : 'null'}` }}>
                                    Log In
                            </Link>
                            </Typography>}
                        <MenuIcon style={{ marginLeft: "5px" }} onClick={handleOpen} />
                    </div>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
}
