import React from 'react'
import { getAllOnlineEvents } from '../../lib/api'
import { Link } from 'react-router-dom'
import { Card, Container, Button } from 'react-bootstrap'

function Home() {

  const [onlineEvents, setOnlineEvents] = React.useState('')
  // const [events, setEvents] = React.useState('')
  // const [groups, setGroups] = React.useState('')
  const [isError, setIsError] = React.useState(false)
  const isLoading = !onlineEvents && !isError

  // const categories = (
  //   'Sports',
  //   'Books',
  //   'Movies',
  //   'Games',
  //   'Food',
  //   'Drinks',
  //   'Magic'
  // )
  
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

  // React.useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const res = await getAllEvents()
  //       setEvents(res.data)
  //     } catch (err) {
  //       setIsError(true)
  //     }
  //   }
  //   getData()
  // }, [])

  // React.useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const res = await getAllGroups()
  //       setGroups(res.data)
  //     } catch (err) {
  //       setIsError(true)
  //     }
  //   }
  //   getData()
  // }, [])


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
            <Card.Img src="https://www.maryjanevaughan.co.uk/wp-content/uploads/2016/04/middle-temple-2-2.jpg" width="150" height="200"/>
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
            <Card.Img src="https://www.kindpng.com/picc/m/197-1976732_harry-potter-large-set-of-sorcery-wizard-icons.png" width="150" height="200"/>
            <Card.Body>
              <Card.Title>
              Make new friends ➔
              </Card.Title>
            </Card.Body>
          </Link>
        </Card>
      </div>
      <hr />

      <div className="btn-toolbar justify-content-center">
        <Button className="info" value="sports">Sports</Button>
        <Button className="info" value="books">Books</Button>
        <Button className="info" value="movies">Movies</Button>
        <Button className="info" value="games">Games</Button>
        <Button className="info" value="food">Food</Button>
        <Button className="info" value="drinks">Drinks</Button>
        <Button className="info" value="magic">Magic</Button>
      </div>
      <hr />

      <div className="h3">Upcoming online events</div>
      <div className="container-row justify-content-center">
        {onlineEvents &&
        onlineEvents.sort((a, b) => b.date < a.date).splice(0, 4).map(onlineEvent => (          
          <>
            <Link to="/online-events">  
              <Card className="home-lower-filter-card">
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