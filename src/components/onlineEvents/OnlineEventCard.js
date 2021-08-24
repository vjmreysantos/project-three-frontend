
function OnlineEventCard({ _id, name, image, date, location, attendees }) {
  return (
    <div className="event-cards-container">
      <a href={`/online-events/${_id}`}>
        <div className="event-card">
          <div className="event-card-left">
            <figure>
              <img className="event-card-image" src={image} alt={name}></img>
            </figure>
          </div>
          <div className="event-card-right">
            <h2>{date}</h2>
            <h3>{name}</h3>
            <p><span>{console.log(location)}</span></p>
            <p><span>{attendees.length}</span> attendees</p>
          </div>
        </div>
      </a>
    </div>
  )
}

export default OnlineEventCard
