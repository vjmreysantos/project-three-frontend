import React from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'

function EventMap ({ event }) {
  
  const [viewport, setViewport] = React.useState({
    latitude: event.location.latitude,
    longitude: event.location.longitude,
    zoom: 15,
  })

  // const [popup, setPopup] = React.useState(null)

  return (
    <div className="map-container">
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        height="100%"
        width="100%"
        mapStyle='mapbox://styles/mapbox/streets-v11'
        {...viewport}
        // onClick={() => setPopup(null)}
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
            // onClick={() => setPopup(event)}
          >
              📍
          </span>
        </Marker>
        ))
        {/* {popup &&
        <Link to={`/women-artists/${popup.id}`}>
          <Popup
            closeOnClick={true}
            onClose={() => setPopup(null)}
            latitude={popup.latitude}
            longitude={popup.longitude}
          >
            <div className="artist-popup">
              <p>{popup.name}</p>
              <figure>
                <img src={popup.bioImage} alt={popup.name}></img>
              </figure>
            </div>
          </Popup>
        </Link>
        }  */}
      </ReactMapGL>
    </div>
  )

}

export default EventMap