import React from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router'
import { Button } from 'react-bootstrap'
import { isOwner, isAuthenticated } from '../../lib/auth'
import { getSingleOnlineEvent, getAllOnlineEvents, attendOnlineEvent, deleteOnlineEvent, getProfile } from '../../lib/api'
import Loading from '../common/Loading'

function OnlineEventShow() {
  const { onlineEventId } = useParams()
  const [onlineEvent, setOnlineEvent] = React.useState(null)
  const [onlineEvents, setOnlineEvents] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const history = useHistory()
  const isLoading = !onlineEvent && !isError
  const isAuth = isAuthenticated()
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

  const randomIndexOne = Math.floor(Math.random() * onlineEvent?.attendees.length)
  const randomIndexTwo = Math.floor(Math.random() * onlineEvent?.attendees.length)
  const randomIndexThree = Math.floor(Math.random() * onlineEvent?.attendees.length)

  return (
    <section className="event-show-section">
      {isError && <p>Oops!</p>}
      {isLoading && <Loading />}
      {onlineEvent &&
        <>
          <div className="event-show-header">
            <div className="event-header-left">
              <figure>
                <img src={onlineEvent.image} alt={onlineEvent.name}></img>
              </figure>
            </div>
            <div className="event-header-right">
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
          </div>

          <div className="show-main">
            <div className="details">
              <h2>Details</h2>
              <p>{onlineEvent.description}</p>
            </div>
            <div className="attendees">
              <h2>Attendees: {onlineEvent.attendees.length}</h2>
              <div className="attendee-cards-container">
                {onlineEvent.attendees.length === 0 &&
              <p>No attendees yet!</p>
                }
                {onlineEvent.attendees.length <= 2 ?
                  onlineEvent.attendees.map(attendee => {
                    return <div key={attendee._id} className="attendee-card">
                      <img src={attendee.avatar} alt={attendee.username}></img>
                      <p>{attendee.username}</p>
                    </div> 
                  })
                  :
                  <>
                    <div className="attendee-card">
                      {<img src={onlineEvent.attendees[randomIndexOne].avatar} alt={onlineEvent.attendees[randomIndexOne].username}></img>}
                      <p>{onlineEvent.attendees[randomIndexOne].username}</p>
                    </div>
                    <div className="attendee-card">
                      {<img src={onlineEvent.attendees[randomIndexTwo].avatar} alt={onlineEvent.attendees[randomIndexTwo].username}></img>}
                      <p>{onlineEvent.attendees[randomIndexTwo].username}</p>
                    </div>
                    <div className="attendee-card">
                      {<img src={onlineEvent.attendees[randomIndexThree].avatar} alt={onlineEvent.attendees[randomIndexThree].username}></img>}
                      <p>{onlineEvent.attendees[randomIndexThree].username}</p>
                    </div>
                    <div className="and-other-attendees">
                      <p>And {onlineEvent.attendees.length - 3} others</p>
                    </div>
                  </>
                }
              </div>
            </div>

            <div className="discussion">
              <h3>Discussion</h3>
              <div className="comments-container">
                {onlineEvent.comments.length === 0 ?
                  <p>No comments yet!</p>
                  :
                  onlineEvent.comments.map(comment=>(
                    <div key={comment._id} className="comment">
                      <div className="comment-left">
                        <img className="comment-image" src={comment.addedBy.avatar} alt={comment.addedBy.username}></img>
                        <p>{comment.addedBy.username}</p>
                      </div>
                      <div className="comment-right">
                        <p>{comment.text}</p>
                        <p>{comment.rating}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>

            <div className="add-a-comment">
              <h3>Want to take part in the discussion?</h3>
              {isAuth ? 
                <Button className="comment-button"><a className="comment-button" href={`/online-events/${onlineEventId}/create-comment`}>Create a comment</a></Button>
                :
                <Button className="comment-button"><a className="comment-button" href={'/login'}>Login to comment</a></Button>
              }
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
              {isAuth ? 
                <Button className="attend-button" onClick = {handleClick}>
                  {isAttending ? 'Can no longer attend' : 'I\'ll be there!'}
                </Button>
                :
                <Button className="attend-button"><a className="attend-button" href={'/login'}>Login to attend</a></Button>
              } 
            </div>
          </div>
        </>
      }
    </section>
  )
}

export default OnlineEventShow