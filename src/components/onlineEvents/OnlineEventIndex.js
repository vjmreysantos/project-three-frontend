import React from 'react'
import { useHistory } from 'react-router'

import { getAllOnlineEvents } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'
import OnlineEventCard from './OnlineEventCard'

function OnlineEventIndex() {
  
  const [onlineEvents, setOnlineEvents] = React.useState('')
  const [searchValue, setSearchValue] = React.useState('')
  const [isError, setIsError] = React.useState(false)
  const isLoading = !onlineEvents && !isError
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
      <div className="events-page-controls">
        <div className="search">
          <input className="input"
            placeholder="Search for keywords or location"
            onChange = {handleSearch}
          />
        </div>
      </div>
      <div>
        {isAuthenticated && <button onClick={handleClick}>Create New Online Event</button>}
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