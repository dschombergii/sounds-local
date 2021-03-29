import React, { useState, createContext, useEffect } from 'react'
import { prominent } from 'color.js'
import axios from 'axios'
import cities from "./cities";
const bcfetch = require('bandcamp-fetch')

export const SongContext = createContext()

export function SongProvider({ children }) {
    const [query, setQuery] = useState('')
    const [city, setCity] = useState('')
    const [loading, setLoading] = useState(false)
    const [artistLoading, setArtistLoading] = useState(true)
    const [tracks, setTracks] = useState([])
    const [artistInfo, setArtistInfo] = useState({})
    const [tracksCopy, setTracksCopy] = useState([])
    const [genres, setGenres] = useState([])
    const [selectedGenres, setSelectedGenres] = useState(() => genres)
    const [markers, setMarkers] = useState(cities);
    const [event, setEvent] = useState(null);
    const [details, setDetails] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false)
    const [trackIndex, setTrackIndex] = useState(0)
    const [modalOpen, setModalOpen] = useState(false);

    const shuffleTracks = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const genresArray = (data) => {
        let genres = data.map(track => track.genre)
        let uniqueGenres = [...new Set(genres.filter(genre => genre != ""))]
        return uniqueGenres
    }

    useEffect(() => {
        let filteredTracks =
            tracksCopy.filter(track => {
                for (let genre of selectedGenres) {
                    if (track.genre === genre) {
                        return track
                    }
                }
            })
        setTracks(filteredTracks)
    }, [selectedGenres])

    const fetchTracks = async (city) => {
        setTracks([])
        setLoading(true)
        let data = []
        let genreList = []
        await axios.get(`https://sounds-local-server.herokuapp.com/tracks/${city}`).then(res => {
            data = res.data.data
            console.log(data)
            genreList = res.data.genreList
            console.log(genreList)
        }).then(() => {
            setTracks(data)
            setTracksCopy(data)
            setGenres(genreList)
            setSelectedGenres(genreList)
            setLoading(false)
            setQuery('')
        })
    }

    const fetchArtist = async (album) => {
        setArtistInfo({})
        setArtistLoading(true)
        let data = {}
        let body = { albumUrl: album }
        await axios.post(`https://sounds-local-server.herokuapp.com/artistInfo`, body).then(res => {
            data = res.data.data
            console.log(data)
        }).then(() => {
            setArtistInfo(data)
            setArtistLoading(false)
        })
    }

    const value = {
        fetchTracks,
        setQuery,
        loading,
        setLoading,
        setTracks,
        tracks,
        query,
        city,
        setCity,
        markers,
        setMarkers,
        event,
        setEvent,
        details,
        setDetails,
        anchorEl,
        setAnchorEl,
        isPlaying,
        setIsPlaying,
        trackIndex,
        setTrackIndex,
        genres,
        selectedGenres,
        setSelectedGenres,
        modalOpen,
        setModalOpen,
        fetchArtist,
        artistInfo,
        artistLoading
    }

    return (
        <SongContext.Provider value={value}>
            {children}
        </SongContext.Provider>
    )
}