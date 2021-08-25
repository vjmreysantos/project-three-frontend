import React from 'react'
import { getAllEvents } from '../../lib/api'
import EventCard from './EventCard'

function EventIndex() {
  const [events, setEvents] = React.useState(null)
  const [searchValue, setSearchValue] = React.useState('')
  const [isError, setIsError] = React.useState(false)
  const isLoading = !events && !isError

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
      // &&
      // (artist.classifications.includes(filterValue)
      // || filterValue === 'All')
    })
  }

  return (
    <section className="event-index-section">
      <div className="events-page-controls">
        <div className="search">
          <input className="input"
            placeholder="Search for keywords"
            onChange = {handleSearch}
          />
        </div>
      </div>
      <div className="events-page-list">
        {isError && <p>Oops!</p>}
        {isLoading && <p>...loading</p>}
        {events &&
          filteredEvents().map(event => (
            <EventCard key={event._id} {...event}/>
          )
          )}
      </div>
    </section>
  )
  
}
export default EventIndex