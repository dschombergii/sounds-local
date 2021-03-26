import React, { useState, createContext, useEffect } from 'react'
import { prominent } from 'color.js'
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

    const fetchTracks = async (query) => {
        setTracks([])
        const tagUrl = `https://bandcamp.com/tag/${query}`
        setLoading(true)
        let data = []
        let genreList = []
        for (let i = 1; i < 16; i++) {
            const params = {
                page: i
            }
            await bcfetch.getReleasesByTag(tagUrl, params)
                .then(results => {
                    console.log(results.items)
                    for (let song of results.items) {
                        let rgb = []
                        prominent(song.imageUrl, { amount: 1 }).then(color => {
                            rgb = color
                        })
                        data.push({
                            genre: song.genre,
                            artist: song.artist.name,
                            artistURL: song.artist.url,
                            title: song.featuredTrack.name,
                            audioSrc: song.featuredTrack.streamUrl,
                            image: song.imageUrl,
                            albumName: song.name,
                            color: rgb,
                            albumURL: song.url
                        })
                    }
                }).then(() => {
                    params.page = i
                })
        }
        setLoading(false)
        shuffleTracks(data)
        setTracks(data)
        setTracksCopy(data)
        genreList = genresArray(data)
        setGenres(genreList)
        setSelectedGenres(genreList)
        console.log(genres)
        setQuery('')
        console.log(tracks)
    }

    const fetchArtist = async (album) => {
        setArtistInfo({})
        setArtistLoading(true)
        let data = {}
        const albumUrl = album;

        const options = {
            albumImageFormat: 'art_app_large',
            artistImageFormat: 'bio_featured',
            includeRawData: false
        }

        await bcfetch.getAlbumInfo(albumUrl, options).then(results => {
            console.log(results)
            data = {
                artistName: results.artist.name,
                artistDescription: results.artist.description,
                artistLink: results.artist.url,
                artistImage: results.artist.imageUrl
            }
        }).then(() => {
            console.log(data)
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