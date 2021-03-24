import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

import { SongContext } from '../../context/SongContext'

export const ArtistInfo = () => {
    const { artistInfo, artistLoading } = useContext(SongContext)

    useEffect(() => {
    }, [artistInfo])

    return (
        <div className="artist-info">
            {!artistLoading ?
                <div style={{ width: "300px" }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
                        <a target="_blank" rel="noopener" href={artistInfo.artistLink}>
                            <img
                                className="artist-image"
                                src={artistInfo.artistImage}
                            />
                        </a>
                        <Typography className="artist-link" variant="h6" style={{ color: "white" }}>
                            <a target="_blank" rel="noopener" title="Visit artist page"
                                href={artistInfo.artistLink}>{artistInfo.artistName}</a>
                        </Typography>
                        <p>{artistInfo.artistDescription}</p>
                    </div>
                    <div>

                    </div>
                </div>
                :
                <div style={{ textAlign: "center", width: "350px" }}>
                    <h3>Loading artist info...</h3>
                    <CircularProgress disableShrink />
                </div>
            }
        </div >
    )
}
