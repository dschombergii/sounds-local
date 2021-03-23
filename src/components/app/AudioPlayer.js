import React, { useState, useEffect, useRef, useContext } from 'react'
import Link from '@material-ui/core/Link'
import { SongContext } from '../../context/SongContext'

import AudioControls from './AudioControls'
import { Genres } from './Genres'

const AudioPlayer = () => {
  // Context
  const { tracks, isPlaying, setIsPlaying, trackIndex, setTrackIndex, setBackdropColor } = useContext(SongContext)

  // State
  const [trackProgress, setTrackProgress] = useState(0)

  const { title, artist, artistURL, image, audioSrc, color } = tracks[trackIndex]

  const [showGenres, toggleShowGenres] = useState(false)
  const [showArtistInfo, toggleShowArtistInfo] = useState(false)

  // Refs
  const audioRef = useRef(new Audio(audioSrc))
  const intervalRef = useRef()
  const isReady = useRef(false)

  const { duration } = audioRef.current

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play()
      startTimer()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause()
      clearInterval(intervalRef.current)
    }
  }, [])

  useEffect(() => {
    if (audioRef.current.getAttribute('src') !== audioSrc) {
      audioRef.current.pause()

      audioRef.current = new Audio(audioSrc)
      setTrackProgress(audioRef.current.currentTime)

    }

    isReady.current = true

    if (isReady.current) {
      audioRef.current.play()
      setIsPlaying(true)
      startTimer()
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true
    }

  }, [tracks, trackIndex])

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack()
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000])
  }

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1)
      setBackdropColor(color)
    } else {
      setTrackIndex(trackIndex - 1)
      setBackdropColor(color)
    }
  }

  const toNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1)
      setBackdropColor(color)
    } else {
      setTrackIndex(0)
      setBackdropColor(color)
    }
  }

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current)
    audioRef.current.currentTime = value
    setTrackProgress(audioRef.current.currentTime)
  }

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true)
    }
    startTimer()
  }

  const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : '0%'
  const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #555))`

  return (
    <div className="audio-player" style={{ animation: `${isPlaying ? 'colorChange 30s alternate infinite' : 'null'}` }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {showGenres && <Genres className="genres" />}
        {/* {showGenres && <div className="genres">Genres</div>} */}
        <div style={{ width: "300px" }}>
          <div className="track-info">
            <img
              className="artwork"
              src={image}
              alt={`track artwork for ${title} by ${artist}`}
            />
            <h2>{title}</h2>
            <h3>{artist}</h3>
            <AudioControls
              isPlaying={isPlaying}
              onPrevClick={toPrevTrack}
              onNextClick={toNextTrack}
              onPlayPauseClick={setIsPlaying}
            />
            <input
              type="range"
              value={trackProgress}
              step="1"
              min="0"
              max={duration ? duration : `${duration}`}
              className="progress"
              onChange={(e) => onScrub(e.target.value)}
              onMouseUp={onScrubEnd}
              onKeyUp={onScrubEnd}
              style={{ background: trackStyling, color: "black" }}
            />
            <div className="info-toggle">
              <button onClick={() => toggleShowGenres(!showGenres)}>
                {"< Genres"}
              </button>
              <button onClick={() => toggleShowArtistInfo(!showArtistInfo)}>
                {"Artist >"}
              </button>
            </div>
          </div>
        </div>
        {showArtistInfo && <div className="artist-info">Artist Info</div>}
      </div>
    </div>
  )
}

export default AudioPlayer
