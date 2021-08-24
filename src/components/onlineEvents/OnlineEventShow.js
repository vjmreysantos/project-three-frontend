import React from 'react'
import { useParams } from 'react-router-dom'
import { getSingleOnlineEvent } from '../../lib/api'

function OnlineEventShow() {
  const { onlineEventId } = useParams()
  const [onlineEvent, setOnlineEvent] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const isLoading = !onlineEvent && !isError

  React.useEffect(()=> {
    const getData = async () => {
      try {
        const response = await getSingleOnlineEvent(onlineEventId)
        setOnlineEvent(response.data)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  },[onlineEventId])


  return (
    <section className="events-show-section">
      <div className="events-show-container">
        {isError && <p>Oops!</p>}
        {isLoading && <p>...loading</p>}
        {onlineEvent && (
          <div>
            <h1 className="show-title">{onlineEvent.name}</h1>
            <hr />
            <div className="show-columns">
              <div className="column">
                <figure className="event-card-image">
                  <img src={onlineEvent.image} alt={onlineEvent.name} />
                </figure>
              </div>
              <hr />
              <div className="show-columns">
                <p>{onlineEvent.description}</p>
                <hr />
                <h2>{onlineEvent.category}</h2>
                <hr />
                <h3>{onlineEvent.date}</h3>
                <p>{onlineEvent.attendees.length} Attendees</p>
                <a href="/">{onlineEvent.meetingLink}</a>
                {/* <hr />
                <h3>{onlineEvent.addedBy}</h3>
                <hr />
                <h3>{onlineEvent.attendees}</h3>
                <hr />
                <p>{onlineEvent.comments}</p>*/}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default OnlineEventShow