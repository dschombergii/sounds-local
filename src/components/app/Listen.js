import React, { useContext, useEffect } from 'react'
import { SongContext } from '../../context/SongContext'
import AudioPlayer from './AudioPlayer'

export const Listen = () => {
    const { tracks } = useContext(SongContext)

    return (
        <div>
            <AudioPlayer />
        </div>
    )
}
