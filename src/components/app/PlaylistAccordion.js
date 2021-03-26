import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core/'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

export const PlaylistAccordion = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Accordion style={{ background: "transparent", marginTop: "20px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
          aria-controls="playlist-content"
          id="playlist-header"
        >
          <PlaylistPlayIcon style={{ color: "white" }} />
          <Typography className={classes.heading} style={{ color: "white" }}>
            Playlists</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ textAlign: "center" }}>
          <Typography style={{ color: "white" }}>
            Feature coming soon...
            </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}