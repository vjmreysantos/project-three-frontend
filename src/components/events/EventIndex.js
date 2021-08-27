import React from 'react'
import { Button } from 'react-bootstrap'

import { getAllEvents } from '../../lib/api'
import EventCard from './EventCard'
import Loading from '../common/Loading'
import { isAuthenticated } from '../../lib/auth'
import { useLocation } from 'react-router'

function EventIndex() {
  useLocation

  const [events, setEvents] = React.useState(null)
  const [searchValue, setSearchValue] = React.useState('')
  const [isError, setIsError] = React.useState(false)
  const isLoading = !events && !isError
  const isAuth = isAuthenticated()

  React.useEffect(() => {
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

  // function copied from Google to sort an array of objects (events) in order
  function compareEvents(a, b) {
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

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  const filteredEvents = () => {
    return events.sort(compareEvents).filter(event => {
      return (event.name.toLowerCase().includes(searchValue.toLocaleLowerCase())) 
    })
  }

  return (
    <section className="event-index-section">
      <div className="event-index-hero-image">
        <h1>Explore some of the magical events for Muggles on Mugglemore below</h1>
      </div>
      <div className="events-page-controls justify-content-center">
        <div className="search">
          <input className="input"
            placeholder="Search for events"
            onChange = {handleSearch}
          />
        </div>
        {isAuth ? 
          <Button variant="primary"><a href={'/events/new-event'}>Create an event</a></Button>
          :
          <Button variant="primary"><a href={'/login'}>Login to create an event</a></Button>
        }
      </div>
      {isError && <p>Oops!</p>}
      {isLoading && <Loading />}
      {events &&
          <div className="events-page-list">
            {filteredEvents().map(event => (
              <EventCard key={event._id} {...event}/>
            )
            )}
          </div>
      }
      <hr />
    </section>
  )
  
}
export default EventIndex