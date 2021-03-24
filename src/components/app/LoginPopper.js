import React, { useContext, useEffect } from 'react';
import { SongContext } from '../../context/SongContext'
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import { AppBar, Typography, Button } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import Draggable from 'react-draggable'
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './theme'

import FirebaseContext from '../../firebase/context'

import Login from '../Auth/Login'

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

export default function LoginPopper() {
    const classes = useStyles();
    const { modalOpen, setModalOpen } = useContext(SongContext)
    const { firebase, user } = React.useContext(FirebaseContext)

    const id = 'simple-popper'

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
                        ? <div className='audio-player' style={{ textAlign: "center", width: "350px" }}>
                            <Button type="button" variant="contained" className="account-button" onClick={() => firebase.logout()}>
                                Logout
                            </Button>
                        </div>
                        : <div className='audio-player' style={{ textAlign: "center", width: "350px" }}>
                            <Login />
                        </div>}

                </div>
            </Popper>
        </Draggable>
    );
}