import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import { AppBar, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';

import { SongContext } from '../../context/SongContext'

const useStyles = makeStyles({
    list: {
        width: 300,
    },
    fullList: {
        width: 'auto',
    }
});

export const TemporaryDrawer = () => {
    const { isPlaying } = useContext(SongContext)
    const classes = useStyles();
    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div style={{ color: "white" }}
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}>
            <List>
                <Typography >
                    <button style={{ color: "white" }} onClick={toggleDrawer(anchor, false)} >
                        <CloseIcon />
                    </button>
                </Typography>
                {/* <Accordion style={{ background: "transparent" }}>
                    <AccordionSummary
                        style={{ color: "white" }}
                        expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                        aria-controls="settings-content"
                        id="settings-header">
                        <SettingsIcon style={{ marginRight: '30px' }} />
                        <Typography style={{ color: "white" }}>{logOrSign ? "Log In" : "Sign Up"}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {logOrSign ? <Login /> : <Signup />}
                    </AccordionDetails>
                </Accordion> */}

                <Accordion style={{ background: "transparent" }}>
                    <AccordionSummary
                        style={{ color: "white" }}
                        expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                        aria-controls="settings-content"
                        id="settings-header">
                        <SettingsIcon style={{ marginRight: '30px' }} />
                        <Typography style={{ color: "white" }}>Settings</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            <ListItem button>
                                <ListItemText style={{ color: "white" }} primary="Change Email" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText style={{ color: "white" }} primary="Reset Password" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText style={{ color: "white" }} primary="Change Avatar" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText style={{ color: "white" }} primary="Logout" />
                            </ListItem>
                        </List>
                    </AccordionDetails>
                </Accordion>

                <Accordion style={{ background: "transparent" }}>
                    <AccordionSummary
                        style={{ color: "white" }}
                        expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                        aria-controls="playlists-content"
                        id="playlists-header">
                        <QueueMusicIcon style={{ marginRight: '30px' }} />
                        <Typography style={{ color: "white" }}>Playlists</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            <ListItem button>
                                <ListItemText style={{ color: "white" }} primary="Change Email" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText style={{ color: "white" }} primary="Reset Password" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText style={{ color: "white" }} primary="Change Avatar" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText style={{ color: "white" }} primary="Logout" />
                            </ListItem>
                        </List>
                    </AccordionDetails>
                </Accordion>

            </List>
        </div>
    );

    return (
        <div>
            <Button onClick={toggleDrawer("right", true)}>right</Button>
            <Drawer BackdropProps={{ invisible: true }} anchor={"right"} open={state.right} onClose={toggleDrawer("right", false)}
                style={{ animation: `${isPlaying ? 'colorChange 30s alternate infinite' : 'null'}` }}>
                {list("right")}
            </Drawer>
        </div >
    );
}