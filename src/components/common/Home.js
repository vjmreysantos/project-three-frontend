import React from 'react'

import { Link } from 'react-router-dom'
import { Card, Container } from 'react-bootstrap'

import { getAllOnlineEvents, getAllEvents } from '../../lib/api'
// import Loading from '../common/Loading'


function Home() {

  const [onlineEvents, setOnlineEvents] = React.useState('')
  const [events, setEvents] = React.useState('')
  const [isError, setIsError] = React.useState(false)
  const isLoading = !onlineEvents && !events && !isError

  
  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllOnlineEvents()
        setOnlineEvents(res.data)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [])

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllEvents()
        setEvents(res.data)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [])


  return (
    <Container>
      <div className="container-row">
        {isError && <p>Oops!</p>}
        {isLoading && <p>...loading</p>}
        
        <div className="home-index-hero-image">
          <h1 className="display-4">Welcome to the world of Muggles</h1>
          <p>Join a group to meet fellow Muggles and make new friends! Explore your interests in the Wizarding World of Harry Potter. New events are happening both online and in person!</p>
        </div>
       
      </div>
      <div className="home-leader-filter">
        <div className="home-leader-filter-cta">
          <h3>Discover what is being conjured up on Mugglemore</h3>
        </div>
      </div>
      <hr />
      <div className="container-row justify-content-center">
        <Card className="home-leader-filter-card">
          <Link to="/events">
            <Card.Img src="https://www.maryjanevaughan.co.uk/wp-content/uploads/2016/04/middle-temple-2-2.jpg" width="200" height="300"/>
            <Card.Body>
              <Card.Title>
              Explore events ➔
              </Card.Title>
            </Card.Body>
          </Link>
        </Card>
        <Card className="home-leader-filter-card">
          <Link to="/online-events" id="#events">
            <Card.Img src="https://i.ytimg.com/vi/2FDjMige9dI/maxresdefault.jpg" width="150" height="200"/>
            <Card.Body>
              <Card.Title>
              Connect over tech ➔
              </Card.Title>
            </Card.Body>
          </Link>
        </Card>
        <Card className="home-leader-filter-card">
          <Link to="/groups">
            <Card.Img src="https://static0.srcdn.com/wordpress/wp-content/uploads/2019/11/feature-image-every-MBTI-sorted-into-their-hogwarts-house.jpg" width="200" height="300"/>
            <Card.Body>
              <Card.Title>
              Join a group ➔
              </Card.Title>
            </Card.Body>
          </Link>
        </Card>
      </div>
      <hr />

      <div className="h3">
          Upcoming Events
      </div>
      <div className="container-row justify-content-center">
        {events &&
        events.sort((a, b) => b.date < a.date).splice(0, 4).map(event => (          
          <>
            <Link to={`/events/${event._id}`}>  
              <Card style={{ margin: '15px' }}>
                <Card.Img src={event.image} alt={event.name} width="100" height="150"/>
                <Card.Body>
                  <Card.Title>{event.name}</Card.Title>
                  <Card.Text>
                    {event.date}
                    <p><span>{event.attendees.length}</span> Attendees</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </>
        ))}
      </div>
      <hr />


      <div className="h3">
          Upcoming Online Events
      </div>
      <div className="container-row justify-content-center">
        {onlineEvents &&
        onlineEvents.sort((a, b) => a.date > b.date).splice(0, 4).map(onlineEvent => (          
          <>
            <Link to={`/online-events/${onlineEvent._id}`}>  
              <Card style={{ margin: '15px' }}>
                <Card.Img src={onlineEvent.image} alt={onlineEvent.name} width="100" height="150"/>
                <Card.Body>
                  <Card.Title>{onlineEvent.name}</Card.Title>
                  <Card.Text>
                    {onlineEvent.date}
                    <p><span>{onlineEvent.attendees.length}</span> Attendees</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </>
        ))}
      </div>
      <hr />

      <footer>
        <div className="container-row justify-content-center">
          <div className="container-row justify-content-start">
            <a href="#">Maggie Ward</a>
            <p>&nbsp;|&nbsp;</p>
            <a href="#">Vanessa Swanson</a>
            <p>&nbsp;|&nbsp;</p>
            <a href="#">Victor Reysantos</a>
          </div>
          <div className="container-row justify-content-end">
            <p>&nbsp;Copyright &copy; 2021 All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </Container>
  )
}

export default Home