

function EventCard({ _id, name, image, date, time, location, attendees, category }) {

  return (
    <div className="event-cards-container">
      <a href={`/events/${_id}`}>
        <div className="event-card">
          <div className="event-card-left">
            <figure>
              <img className="event-card-image" src={image} alt={name}></img>
            </figure>
          </div>
          <div className="event-card-right">
            <h2>{date}, {time}</h2>
            <h3>{name}</h3>
            <p>{category}</p>
            <p>{location.placeName}, {location.streetName}</p>
            <p><span>{attendees.length}</span> attendees</p>
          </div>
        </div>
      </a>
    </div>
  )
}

export default EventCard
