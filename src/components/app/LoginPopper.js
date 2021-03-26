import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import Draggable from 'react-draggable'

import { SongContext } from '../../context/SongContext'
import FirebaseContext from '../../firebase/context'
import { theme } from './theme'

import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Typography, Popper } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { ThemeProvider } from '@material-ui/styles'

import { Login } from '../auth/Login'
import { PlaylistAccordion } from './PlaylistAccordion'

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
}));

export const LoginPopper = () => {
    const {
        modalOpen,
        setModalOpen,
        isPlaying } = useContext(SongContext)

    const { firebase, user } = useContext(FirebaseContext)

    const id = 'simple-popper'
    const classes = useStyles();

    const handleClose = () => {
        setModalOpen(false)
    }

    return (
        <Draggable
            defaultPosition={{ x: 1075, y: 80 }}>
            <Popper id={id} open={modalOpen}>
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
                    {user
                        ? <div className='audio-player' style={{ textAlign: "right", width: "350px", animation: `${isPlaying ? 'colorChange 30s alternate infinite' : 'null'}` }}>
                            <Typography>
                                <Link className="Link"
                                    onClick={() => firebase.logout()}
                                    style={{ textDecoration: 'none', color: 'white' }}>
                                    Logout
                            </Link>
                            </Typography>
                            <PlaylistAccordion />
                        </div>
                        : <div className='audio-player' style={{ textAlign: "center", width: "350px" }}>
                            <Login />
                        </div>}

                </div>
            </Popper>
        </Draggable>
    )
}