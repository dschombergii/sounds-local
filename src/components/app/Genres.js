import React, { useContext, useState, useEffect } from 'react'
import { SongContext } from '../../context/SongContext'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export const Genres = () => {
    const { selectedGenres, setSelectedGenres, genres } = useContext(SongContext)

    const handleClick = (e) => {
        console.log(e.currentTarget.value)
        e.currentTarget.disabled = true
    };

    const handleGenres = (event, newGenres) => {
        setSelectedGenres(newGenres);
        console.log(newGenres)
    };

    return (
        <div className="genres-list">
            <ToggleButtonGroup orientation="vertical" style={{ marginRight: "20px", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly" }} value={selectedGenres} onChange={handleGenres}>
                {genres.map(genre => (
                    <ToggleButton style={{ padding: "15px", borderRadius: "15px", height: "20px", marginBottom: "10px", color: "white" }} value={genre} key={genre} onClick={(e) => handleClick(e)}>{genre}</ToggleButton>
                ))}
            </ToggleButtonGroup>
        </div >
    )
}
