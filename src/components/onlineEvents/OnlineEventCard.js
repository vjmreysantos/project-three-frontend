import { Link } from 'react-router-dom'

function OnlineEventCard({ onlineEvent }) {
  return (
    <div className="column is-one-quarter-desktop is-one-third-tablet">
      <Link to={`/online-events/${onlineEvent._id}`}>
        <div className="card">
          <div className="card-header">
            <div className="card-header-title title is-4">{onlineEvent.name}</div>
          </div>
          <div className="card-image is-fullwidth">
            <figure className="image image is-4by3">
              <img src={onlineEvent.image} alt={onlineEvent.name} />
            </figure>
          </div>
          <div className="card-content">
            <h1>{onlineEvent.description}</h1>
            <hr />
            <h3>{onlineEvent.category}</h3>
            <hr />
            <h4>{onlineEvent.date}</h4>
            <hr />
            <a href="/">{onlineEvent.meetingLink}</a>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default OnlineEventCard
