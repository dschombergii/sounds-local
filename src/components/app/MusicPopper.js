import React, { useContext, useEffect } from 'react'
import Draggable from 'react-draggable'

import { makeStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { AppBar, Typography, Popper, CircularProgress } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import { SongContext } from '../../context/SongContext'
import { theme } from './theme'

import { AudioPlayer } from './AudioPlayer'

const useStyles = makeStyles((theme) => ({
    paper: {
        width: "auto",
        height: "auto",
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "row"
    },
    menu: {
        background: "transparent",
        boxShadow: "none",
    },
    closeButton: {
        paddingLeft: "10px",
        paddingTop: "8px",
        color: "white"
    }
}))

export const MusicPopper = () => {
    const {
        anchorEl,
        setAnchorEl,
        tracks,
        city,
        setIsPlaying } = useContext(SongContext)

    const open = Boolean(anchorEl);
    const id = 'simple-popper'
    const classes = useStyles()

    useEffect(() => {
        tracks > 1 && setAnchorEl(null)
    }, [tracks])

    const handleClose = () => {
        setAnchorEl(null)
        setIsPlaying(false)
    }

    return (
        <Draggable
            defaultPosition={{ x: 200, y: 140 }}>
            <Popper id={id} open={open}>
                <ThemeProvider theme={theme}>
                    <AppBar className={classes.menu}>
                        <Typography >
                            <button className={classes.closeButton} onClick={handleClose} >
                                <CloseIcon />
                            </button>
                        </Typography>
                    </AppBar>
                </ThemeProvider>
                <div className={classes.paper}>
                    {tracks.length > 1 ?
                        <AudioPlayer />
                        :
                        <div className='audio-player' style={{ textAlign: "center", width: "350px" }}>
                            <h3>tuning in to {city}...</h3>
                            <CircularProgress disableShrink />
                        </div>}
                </div>
            </Popper>
        </Draggable>
    )
}