import { Link } from 'react-router-dom'

function OnlineEventCard({ onlineEvent }) {
  return (
    <div className="column is-one-quarter-desktop is-one-third-tablet">
      <Link to={`/online-events/${onlineEvent._id}`}>
        <div className="card">
          <div className="card-header">
            <div className="card-header-title">{onlineEvent.name}</div>
          </div>
          <div className="card-image">
            <figure className="image image-is-1by1">
              <img src={onlineEvent.image} alt={onlineEvent.name} />
            </figure>
          </div>
          <div className="card-content">
            <h2>{onlineEvent.date}<h2></h2>{onlineEvent.meetingLink}</h2>
            <h3>{onlineEvent.description}</h3>
            <h5>{onlineEvent.category}</h5>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default OnlineEventCard
