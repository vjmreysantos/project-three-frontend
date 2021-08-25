import React from 'react'
import { getAllOnlineEvents } from '../../lib/api'
import { Link } from 'react-router-dom'
import { Card, Button, Container } from 'react-bootstrap'

function Home() {

  const [onlineEvents, setOnlineEvents] = React.useState('')
  const [isError, setIsError] = React.useState(false)
  const isLoading = !onlineEvents && !isError
  
  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllOnlineEvents()
        setOnlineEvents(response.data)
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
        <div className="container-column">
          <h1 className="display-4">Welcome to the world of Muggles</h1>
          <p>Join a group to meet fellow Muggles and make new friends! Explore your interests in the Wizarding World of Harry Potter. New events are happening both online and in person!</p>
        </div>
        <figure className="image">
          <img src="https://www.meetup.com/_next/image/?url=%2Fimages%2Fshared%2Fonline_events.svg&w=640&q=75" alt="Meetup" width="300" height="400" /> 
        </figure>
      </div>
      <hr />
      <div className="container-row justify-content-center">
        <Card>
          <Link to="/events">
            <Card.Img src="https://www.maryjanevaughan.co.uk/wp-content/uploads/2016/04/middle-temple-2-2.jpg" width="100" height="200"/>
            <Card.Body>
              <Card.Title>
                Explore events ➔
              </Card.Title>
            </Card.Body>
          </Link>
        </Card>
        <Card>
          <Link to="/online-events">
            <Card.Img src="https://i.ytimg.com/vi/2FDjMige9dI/maxresdefault.jpg" width="100" height="200"/>
            <Card.Body>
              <Card.Title>
                Connect over tech ➔
              </Card.Title>
            </Card.Body>
          </Link>
        </Card>
        <Card>
          <Link to="/groups">
            <Card.Img src="https://www.kindpng.com/picc/m/197-1976732_harry-potter-large-set-of-sorcery-wizard-icons.png" width="100" height="200"/>
            <Card.Body>
              <Card.Title>
                Make new friends ➔
              </Card.Title>
            </Card.Body>
          </Link>
        </Card>
      </div>
      <hr />
      <div className="container-row justify-content-center">
        <Button variant="info">Sports</Button>
        <Button variant="info">Books</Button>
        <Button variant="info">Movies</Button>
        <Button variant="info">Games</Button>
        <Button variant="info">Food</Button>
        <Button variant="info">Drinks</Button>
        <Button variant="info">Magic</Button>
      </div>
      <hr />

      <p className="h3">Upcoming online events</p>
      <div className="container-row justify-content-center">
        {onlineEvents &&
          onlineEvents.sort((a, b) => b.date < a.date).splice(0, 4).map(onlineEvent => (          
            <>
              <Link to="/online-events">  
                <Card>
                  <Card.Img src={onlineEvent.image} alt={onlineEvent.name} width="100" height="200"/>
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
        <div className="footer-content">
          <div className="footer-links">
            <a href="">Contact Us</a>
            <br />
            <a href="">View Our Cookie Policy</a>
            <br />
            <a href="">Our Privacy Policy</a>
          </div>
          <div className="bottom-footer">
            <p>Copyright &copy; 2021 All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </Container>
  )
}

export default Home