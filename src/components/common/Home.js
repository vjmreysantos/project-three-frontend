import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, Container } from 'react-bootstrap'

function Home() {

  return (
    <Container>
      <div className="container-row">
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
      <div className="input-group">
        <input type="search" className="form-control rounded" placeholder="Keyword" label="Search"></input>
        <input type="search" className="form-control rounded" placeholder="Location" label="Search"></input>
        <Button variant="danger">Search</Button>
      </div>
      <hr />
      <p className="h3">Upcoming events</p>
      <div className="container-row justify-content-center">
        <Card>
          <p>Upcoming events</p>
        </Card>
        <Card>
          <p>Upcoming events</p>
        </Card>
        <Card>
          <p>Upcoming events</p>
        </Card>
        <Card>
          <p>Upcoming events</p>
        </Card>
      </div>
      <hr />
      <footer>
        <p>footer</p>
      </footer>
    </Container>
  )
}

export default Home