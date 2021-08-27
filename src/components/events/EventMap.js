import React from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'

function EventMap ({ event }) {
  
  const [viewport, setViewport] = React.useState({
    latitude: event.location.latitude,
    longitude: event.location.longitude,
    zoom: 15,
  })

  return (
    <div className="map-container">
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        height="100%"
        width="100%"
        mapStyle='mapbox://styles/mapbox/streets-v11'
        {...viewport}
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        <Marker
          key={event.id}
          latitude={event.location.latitude}
          longitude={event.location.longitude}
        >
          <span
            role="img"
            aria-label="map-marker"
            className="map-marker"
          >
          📍
          </span>
        </Marker>
      </ReactMapGL>
    </div>
  )

}

export default EventMap