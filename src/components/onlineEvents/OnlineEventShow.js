import React from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router'
import { Button } from 'react-bootstrap'

import { getSingleOnlineEvent, getAllOnlineEvents, attendOnlineEvent, deleteOnlineEvent, getProfile } from '../../lib/api'
import Loading from '../common/Loading'
import { isOwner } from '../../lib/auth'

function OnlineEventShow() {
  const { onlineEventId } = useParams()
  const [onlineEvent, setOnlineEvent] = React.useState(null)
  const [onlineEvents, setOnlineEvents] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const history = useHistory()
  const isLoading = !onlineEvent && !isError
  // const [attendingToggle, setAttendingToggle] = React.useState(false)

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

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getProfile()
        setCurrentUser(res.data)
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  const isAttending = onlineEvent?.attendees.some(attendee => {
    return attendee._id === currentUser?._id
  })

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

  const handleSubmit = async () => {
    try {
      const response = await deleteOnlineEvent(onlineEventId)
      window.alert('you have successfully deleted this event')
      console.log(response)
      history.push('/online-events')
    } catch (err) {
      console.log(err)
    }
  }

  const handleClick = async () => {
    try { 
      await attendOnlineEvent(onlineEventId)
      const response = await getSingleOnlineEvent(onlineEventId)
      setOnlineEvent(response.data)
    } catch (err) {
      console.log(err)
      window.alert('You need to login to attend this event')
    }
  } 

  return (
    <section className="event-show-section">
      {isError && <p>Oops!</p>}
      {isLoading && <Loading />}
      {onlineEvent &&
        <>
          <div className="event-show-header">
            <p>{onlineEvent.date}, {onlineEvent.time}</p>
            <h1>{onlineEvent.name}</h1>
            {isOwner(onlineEvent.addedBy._id) ?
              <div className="hosted-by">
                <img className="hosted-by-image" src={onlineEvent.addedBy.avatar} alt={onlineEvent.addedBy.username}></img>
                <p>You are hosting this event</p>
                <Button variant="danger"
                  onClick={handleSubmit}>
                Delete event
                </Button>
              </div>
              :
              <div className="hosted-by">
                <img className="hosted-by-image" src={onlineEvent.addedBy.avatar} alt={onlineEvent.addedBy.username}></img>
                <p>Hosted by <span>{onlineEvent.addedBy.username}</span></p>
              </div>
            }
          </div>

          <div className="event-show-main">

            <h2>Details</h2>
            <p>{onlineEvent.description}</p>
            <h2>Attendees {onlineEvent.attendees.length}</h2>
            {onlineEvent.attendees.length === 0 ?
              <p>No attendees yet!</p>
              :
              onlineEvent.attendees.map(attendee => {
                return <div key={attendee._id} className="attendee-card">
                  <img src={attendee.avatar} alt={attendee.username}></img>
                  <p>{attendee.username}</p>
                </div> 
              })
            }

            <h2>Comments</h2>
            <div className="comments-container">
              {onlineEvent.comments.length === 0 ?
                <p>No comments yet!</p>
                :
                onlineEvent.comments.map(comment=>(
                  <div key={comment._id} className="comment">
                    <div className="comment-left">
                      <img src={comment.addedBy.avatar} alt={comment.addedBy.username}></img>
                      <p>{comment.addedBy.username}</p>
                    </div>
                    <div className="comment-right">
                      <p>{comment.text}</p>
                      <p>{comment.rating}</p>
                    </div>
                  </div>
                ))
              }
              <h3>Want to add a comment?</h3>
              <button><a href={`/online-events/${onlineEventId}/create-comment`}>Add your comment here</a></button>
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
                {isAttending ? 'Can no longer attend' : 'I will be there!'}
              </Button>
            </div>
          </div>
        </>
      }
    </section>
  )
}

export default OnlineEventShow