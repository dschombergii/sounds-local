import React, { useContext } from 'react'
import ReactGlobe from 'react-globe'

import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'

import { SongContext } from '../../context/SongContext'

import { MusicPopper } from './MusicPopper'
import bwEarth from '../../assets/bwEarth.jpg'

const markerTooltipRenderer = (marker) => {
    return marker.city
}
let options = {
    markerTooltipRenderer,
    enableCameraAutoRotate: false,
    cameraAutoRotateSpeed: 0
}

export const Globe = () => {
    const {
        fetchTracks,
        setQuery,
        setCity,
        markers,
        setEvent,
        details,
        setDetails,
        setAnchorEl } = useContext(SongContext)

    function onClickMarker(marker, markerObject, event) {
        setDetails(markerTooltipRenderer(marker))
        setAnchorEl({ x: event.clientX, y: event.clientY })
        setQuery(marker.cityQuery)
        setCity(marker.city)
        setEvent({
            type: "CLICK",
            marker,
            markerObjectID: markerObject.uuid,
            pointerEventPosition: { x: event.clientX, y: event.clientY }
        });
        fetchTracks(marker.cityQuery)
    }
    function onDefocus(previousFocus) {
        setEvent({
            type: "DEFOCUS",
            previousFocus
        })
    }

    return (
        <div>
            {details && (
                <MusicPopper />
            )}

            <ReactGlobe
                position="absolute"
                height="93vh"
                markers={markers}
                options={options}
                globeTexture={bwEarth}
                globeBackgroundTexture=""
                width="100vw"
                onClickMarker={onClickMarker}
                onDefocus={onDefocus}
            />
        </div>
    )
}

