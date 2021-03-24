import React, { useContext } from 'react'
import { SongContext } from '../../context/SongContext'

import Globe from './Globe'
import LoginPopper from './LoginPopper'

export const Home = () => {
    const { fetchTracks, setQuery, loading, tracks, query } = useContext(SongContext)

    return (
        <div>
            {/* {!loading ?
                <div>
                    <input onChange={event => setQuery(event.target.value)} />
                    <button onClick={fetchTracks}>Search</button>
                </div>
                : <div>Tuning in to your city...</div>} */}
            <LoginPopper />
            <Globe />
        </div >
    )
}
