import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'

import { getAllOnlineEvents } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'
import OnlineEventCard from './OnlineEventCard'
import Loading from '../common/Loading'


function OnlineEventIndex() {
  useLocation

  const [onlineEvents, setOnlineEvents] = React.useState('')
  const [searchValue, setSearchValue] = React.useState('')
  const [isError, setIsError] = React.useState(false)
  const isLoading = !onlineEvents && !isError
  const isAuth = isAuthenticated()
  const history = useHistory()
  
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


  function compareOnlineEvents(a, b) {
    const bandA = a.date
    const bandB = b.date
    let comparison = 0
    if (bandA > bandB) {
      comparison = 1
    } else if (bandA < bandB) {
      comparison = -1
    }
    return comparison
  }

  const filteredOnlineEvents = () => {
    return onlineEvents.sort(compareOnlineEvents).filter(onlineEvent => {
      return (onlineEvent.name.toLowerCase().includes(searchValue.toLocaleLowerCase()))
    })
  }


  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  const handleAuthClick = () => {
    history.push('/online-events/new-online-event')
  }

  const handleUnAuthClick = () => {
    history.push('/login')
  }

  // const handleBtn = (e) => {
  //   setCategory(e.target.value)
  // }

  // function handleChange(e) {
  //   setCategory(e.target.value)
  // }


  return (
    <section className="event-index-section justify-content-center">
      <div className="online-event-index-hero-image">
        <h1>Meet with fellow Mugglemore members wherever you are through our online events</h1>
      </div>
      <div className="events-page-controls justify-content-center">
        <div className="search">
          <input className="input"
            placeholder="Search for online events"
            onChange = {handleSearch}
          />
        </div>
        {isAuth ? 
          <Button onClick={handleAuthClick}>Create New Online Event</Button>
          :
          <Button onClick={handleUnAuthClick}>Login to create an event</Button>
        }
      </div>
      {/* <div>
        <select className="category" defaultValue="All" onChange={handleChange}>
          <option>All</option>
          <option>Sports</option>
          <option>Books</option>
          <option>Movies</option>
          <option>Games</option>
          <option>Food</option>
          <option>Drinks</option>
          <option>Magic</option>
        </select> */}
      {/* /* <Button style={{ margin: '10px' 
          variant="primary"
          value="sports"
          onClick={handleBtn}>
          Sports
        </Button>
        <Button style={{ margin: '10px' }}
          variant="primary"
          value="books"
          onClick={handleBtn}>
          Books
        </Button>
        <Button style={{ margin: '10px' }}
          variant="primary"
          value="movies"
          onClick={handleBtn}>
          Movies
        </Button>
        <Button style={{ margin: '10px' }}
          variant="primary"
          value="games"
          onClick={handleBtn}>
          Games
        </Button>
        <Button style={{ margin: '10px' }}
          variant="primary"
          value="food"
          onClick={handleBtn}>
          Food
        </Button>
        <Button style={{ margin: '10px' }}
          variant="primary"
          value="drinks"
          onClick={handleBtn}>
          Drinks
        </Button>
        <Button style={{ margin: '10px' }}
          variant="primary"
          value="magic"
          onClick={handleBtn}>
          Magic
        </Button> */} 
      {/* </div> */}
      <div className="events-page-list">
        {isError && <p>Oops!</p>}
        {isLoading && <Loading />}
        {onlineEvents &&
          filteredOnlineEvents().map(onlineEvent => (
            <OnlineEventCard key={onlineEvent._id} {...onlineEvent} />
          )
          )}
      </div>
    </section>
  )
}
export default OnlineEventIndex