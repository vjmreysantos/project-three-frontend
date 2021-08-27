import { Link } from 'react-router-dom'

function GroupCard({ group }) {
  return (
    <div className="event-cards-container">
      <Link to={`/groups/${group._id}`}>
        <div className="event-card">
          <div className="event-card-left">
            <figure>
              <img className="event-card-image" src={group.image} alt={group.name} />
            </figure>
          </div>
          <div className="event-card-right">
            <h2>{group.name}</h2>
            {group.category.map(item => {
              return <span key={item}>{item} </span>
            })}
            <p>Location: {group.location}</p>
            <p>Members: {group.members.length}</p>
          </div>
        </div>
      </Link>  
    </div>
  )
}
export default GroupCard