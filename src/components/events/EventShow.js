import React from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router'
import { getSingleEvent, getAllEvents, attendEvent, deleteEvent } from '../../lib/api'
import EventMap from './EventMap'
import { Button } from 'react-bootstrap'
import { isOwner } from '../../lib/auth'
// import CommentForm from '../comments/CommentForm'

function EventShow() {
  const { eventId } = useParams()
  const [events, setEvents] = React.useState(null)
  const [event, setEvent] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const history = useHistory()
  const isLoading = !event && !isError
  // const isAuth = isAuthenticated()
  

  React.useEffect(()=> {
    const getData = async () => {
      try {
        const response = await getSingleEvent(eventId)
        setEvent(response.data)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  },[eventId])

  React.useEffect(()=> {
    const getData = async () => {
      try {
        const response = await getAllEvents()
        setEvents(response.data)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  },[])

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
      item.name !== event.name)
    return uniqueMatchingEvents.map(element => 
      similarEvents.push(element)
    )
  }

  const handleSubmit = async () => {
    try {
      const response = await deleteEvent(eventId)
      window.alert('you have successfully deleted this event')
      console.log(response)
      history.push('/events')
    } catch (err) {
      console.log(err)
    }
  }

  const handleClick = async () => {
    try { 
      await attendEvent(eventId)
      location.reload()
      console.log(event.attendees)
    } catch (err) {
      console.log(err)
      window.alert('You need to login to attend this event')
    }
  } 

  return (
    <section className="event-show-section">
      {isError && <p>Oops!</p>}
      {isLoading && <p>...loading</p>}
      {event &&
      <>
        <div className="event-show-header">
          <p>{new Date(event.date).toString().split('GMT')[0]}</p>
          <h1>{event.name}</h1>
          {isOwner(event.addedBy._id) ?
            <div className="hosted-by">
              <img className="hosted-by-image" src={event.addedBy.avatar} alt={event.addedBy.username}></img>
              <p>You are hosting this event</p>
              <Button variant="danger"
                onClick={handleSubmit}>
                Delete event
              </Button>
            </div>
            :
            <div className="hosted-by">
              <img className="hosted-by-image" src={event.addedBy.avatar} alt={event.addedBy.username}></img>
              <p>Hosted by <span>{event.addedBy.username}</span></p>
            </div>
          }
        </div>
        <div className="event-show-main">
          <div className="event-show-left">
            <h2>Details</h2>
            <p>{event.description}</p>
            <h2>Attendees {event.attendees.length}</h2>
            <div className="attendee-card">
              {event.attendees.length === 0 ?
                <p>No attendees yet!</p>
                :
                event.attendees.map(attendee => {
                  return <li key={attendee._id}>{attendee.username}</li>
                })}
            </div>
            <h2>Comments</h2>
            <div className="comments-container">
              {event.comments.length === 0 ?
                <p>No comments yet!</p>
                :
                event.comments.map(comment=>(
                  <div key={comment._id} className="comment">
                    <div className="comment-left">
                      <img src={comment.addedBy.avatar} alt={comment.addedBy.username}></img>
                      <p>{comment.addedBy.username}</p>
                    </div>
                    <div className="comment-right">
                      <p>{comment.text}</p>
                    </div>
                  </div>
                ))
              }
              <h3>Want to add a comment?</h3>
              <button><a href={`/events/${eventId}/create-comment`}>Add your comment here</a></button>
            </div>
            {/* <CommentForm 
              {...event}
            /> */}

          </div>
          <div className="event-show-right">
            <p><span>⏰</span>{new Date(event.date).toString().split('GMT')[0]}</p>
            <p><span>📍</span>{event.location.placeName}  {event.location.streetNumber}  {event.location.streetName}, {event.location.postcode}</p>
            <div className="map-container">
              <EventMap event={event} />
            </div>
          </div>
        </div>
        <div className="event-show-lower">
          <h3>Similar events on Mugglemore</h3>
          <div className="similar-events-container">


            {/* <Carousel>
              {categoriesMatchCheck(events, event.category) ?
                similarEvents.map(event => (
                  <Carousel.Item key={event.name}>
                    <img
                      className="d-block w-100"
                      src={event.image}
                      alt={event.name}
                    />
                    <Carousel.Caption>
                      <p>{new Date(event.date).toString().split('GMT')[0]}</p>
                      <h5>{event.name}</h5>
                      <p><span>📍</span>{event.location.placeName}</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))
                :
                ''
              }
            </Carousel> */}

            {categoriesMatchCheck(events, event.category) ?
              <>
                {similarEvents.map(event => (
                  <>
                    <a href={`/events/${event._id}`}>
                      <div className="similar-event">
                        <p>{new Date(event.date).toString().split('GMT')[0]}</p>
                        <h5>{event.name}</h5>
                        <p><span>📍</span>{event.location.placeName}</p>
                        <figure>
                          <img className="similar-event-image" src={event.image} alt={event.name}></img>
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
            <p>{new Date(event.date).toString().split('GMT')[0]}</p>
            <h4>{event.name}</h4>
          </div>
          <div className="attend-footer-right">
            <Button variant="primary" onClick = {handleClick}>Attend</Button>
          </div>
        </div>
      </>
      }
    </section>
  )
}

export default EventShow