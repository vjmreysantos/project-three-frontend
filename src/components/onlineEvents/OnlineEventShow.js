import React from 'react'
import { useParams } from 'react-router-dom'
import { getSingleOnlineEvent, getAllOnlineEvents, attendOnlineEvent } from '../../lib/api'
import Button from 'react-bootstrap/Button'

function OnlineEventShow() {
  const { onlineEventId } = useParams()
  const [onlineEvent, setOnlineEvent] = React.useState(null)
  const [onlineEvents, setOnlineEvents] = React.useState(null)
  // const [isAttending, setIsAttending] = React.useState(false)
  const [isError, setIsError] = React.useState(false)
  const isLoading = !onlineEvent && !isError
  const [attendingToggle, setAttendingToggle] = React.useState(false)

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

  React.useEffect(()=> {
    const getData = async () => {
      try {
        const response = await getAllOnlineEvents()
        setOnlineEvents(response.data)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  },[])

  const handleClick = async () => {
    try { 
      await attendOnlineEvent(onlineEventId)
      location.reload()
    } catch (err) {
      console.log(err)
    }
  } 

  const similarEvents = []

  const categoriesMatchCheck = (arr1, arr2) => {
    const matchingEvents = []
    const filteredArray = arr1.filter(item => 
      item.category.includes(arr2[0]) || item.category.includes(arr2[1]) || item.category.includes(arr2[2])
    )
    filteredArray.map(element =>
      matchingEvents.push(element)
    )
    const uniqueMatchingEvents = matchingEvents.filter(item =>
      item.name !== onlineEvent.name)
    return uniqueMatchingEvents.map(element => 
      similarEvents.push(element)
    )
  }

  return (
    <section className="events-show-section">
      {isError && <p>Oops!</p>}
      {isLoading && <p>...loading</p>}
      {onlineEvent &&
        <>
          <div className="event-show-header">
            <p>{onlineEvent.date}</p>
            <h1>{onlineEvent.name}</h1>
            <div className="hosted-by">
              <img className="hosted-by-image" src={onlineEvent.addedBy.avatar} alt={onlineEvent.addedBy.username}></img>
              <p>Hosted by <span>{onlineEvent.addedBy.username}</span></p>
            </div>
          </div>
          <div className="event-show-main">
            <div className="event-show-left">
              <h2>Details</h2>
              <p>{onlineEvent.description}</p>
              <h2>Attendees - <span>{onlineEvent.attendees.length}</span></h2>
              <div className="attendee-card">
                {onlineEvent.attendees.length === 0 ?
                  <p>No attendees yet!</p>
                  :
                  onlineEvent.attendees.map(attendee => {
                    return <div key={attendee._id}>
                      <img src={attendee.avatar} alt={attendee.username}></img>
                      <p>{attendee.username}</p>
                    </div> 
                  })
                }
              </div>
              <h2>Comments</h2>
              {onlineEvent.comments.length === 0 ?
                <p>No comments yet!</p>
                :
                onlineEvent.comments.map(comment=>(
                  <>
                    <img src={comment.addedBy.avatar} alt={comment.addedBy.username}></img>
                    <p>{comment.addedBy.username}</p>
                    <p>{comment.text}</p>
                    <p>{comment.rating}</p>
                  </>
                ))
              }
            </div>
            <div className="event-show-right">
              <p><span>⏰</span>{onlineEvent.date}</p>
            </div>
          </div>
          <div className="event-show-lower">
            <h3>Similar events on Mugglemore</h3>
            <div className="similar-events-container">
              {categoriesMatchCheck(onlineEvents, onlineEvent.category) ?
                <>
                  {similarEvents.map(onlineEvent => (
                    <>
                      <a href={`/online-events/${onlineEvent._id}`}>
                        <div className="similar-event">
                          <p>{onlineEvent.date}</p>
                          <h5>{onlineEvent.name}</h5>
                          <figure>
                            <img className="similar-event-image" src={onlineEvent.image} alt={onlineEvent.name}></img>
                          </figure>
                        </div>
                      </a>
                    </>
                  ))} 
                </>
                :
                ''
              }
            </div>
          </div>
          <div className="event-show-attend-footer">
            <div className="attend-footer-left">
              <p>{onlineEvent.date}</p>
              <h4>{onlineEvent.name}</h4>
            </div>
            <div className="attend-footer-right">
              <Button variant="danger" onClick={handleClick}>
                {attendingToggle === true ? 'Cancel' : 'I\'ll be there'}
              </Button>
            </div>
          </div>
        </>
      }
    </section>
  )
}

export default OnlineEventShow