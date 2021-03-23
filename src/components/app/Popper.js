import React, { useContext, useEffect } from 'react';
import { SongContext } from '../../context/SongContext'
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import { AppBar, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import Draggable from 'react-draggable'
import { ThemeProvider } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress'
import { theme } from './theme'

import AudioPlayer from './AudioPlayer'

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

export default function SimplePopper() {
    const classes = useStyles();
    const { anchorEl, tracks, query, setIsPlaying, setAnchorEl } = useContext(SongContext)

    const open = Boolean(anchorEl);
    const id = 'simple-popper'

    useEffect(() => {
        tracks > 1 && setAnchorEl(null)
    }, [tracks])

    const handleClose = () => {
        setAnchorEl(null)
        setIsPlaying(false)
    }

    return (
        <Draggable
            defaultPosition={{ x: 200, y: 200 }}>
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
                            <h3>tuning in to {query}...</h3>
                            <CircularProgress disableShrink />
                        </div>}
                </div>
            </Popper>
        </Draggable>
    );
}