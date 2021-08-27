import React from 'react'
import { getAllOnlineEvents } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'
import OnlineEventCard from './OnlineEventCard'
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'

function OnlineEventIndex() {
  
  const [onlineEvents, setOnlineEvents] = React.useState('')
  const [searchValue, setSearchValue] = React.useState('')
  const [isError, setIsError] = React.useState(false)
  const isLoading = !onlineEvents && !isError
  const history = useHistory()
  const isAuth = isAuthenticated()

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

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

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

  const handleClick = () => {
    history.push('/online-events/new-online-event')
  }

  return (
    <section className="event-index-section">
      <div className="online-event-index-hero-image">
        <h1>Meet with fellow Mugglemore members wherever you are through our online events</h1>
      </div>
      <div className="events-page-controls">
        <div className="search">
          <input className="input"
            placeholder="Search for keywords"
            onChange = {handleSearch}
          />
        </div>
        {isAuth && <Button onClick={handleClick}>Create New Online Event</Button>}
      </div>
      <div className="events-page-list">
        {isError && <p>Oops!</p>}
        {isLoading && <p>...loading</p>}
        {onlineEvents &&
          filteredOnlineEvents().map(onlineEvent => (
            <OnlineEventCard key={onlineEvent._id} {...onlineEvent} />
          ))}
      </div>
    </section>
  ) 
}
export default OnlineEventIndex