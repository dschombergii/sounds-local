import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import ReactGlobe from "react-globe";
import { SongContext } from '../../context/SongContext'

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

import SimplePopper from './Popper'

import bwEarth from '../../assets/bwEarth.jpg'

function markerTooltipRenderer(marker) {
    return marker.city
}

let options = {
    markerTooltipRenderer,
    enableCameraAutoRotate: false,
    cameraAutoRotateSpeed: 0
};

export default function Globe() {

    const {
        fetchTracks,
        setQuery,
        markers,
        setEvent,
        details,
        setDetails,
        setAnchorEl } = useContext(SongContext)

    function onClickMarker(marker, markerObject, event) {
        setDetails(markerTooltipRenderer(marker))
        setAnchorEl({ x: event.clientX, y: event.clientY });
        setQuery(marker.city)
        console.log(marker.city)
        setEvent({
            type: "CLICK",
            marker,
            markerObjectID: markerObject.uuid,
            pointerEventPosition: { x: event.clientX, y: event.clientY }
        });
        fetchTracks(marker.city)
    }
    function onDefocus(previousFocus) {
        setEvent({
            type: "DEFOCUS",
            previousFocus
        });
    }

    return (
        <div>
            {details && (
                <SimplePopper />
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
    );
}

