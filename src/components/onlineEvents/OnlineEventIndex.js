import React from 'react'
import { Button } from 'react-bootstrap'

import { getAllOnlineEvents } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'
import OnlineEventCard from './OnlineEventCard'
import Loading from '../common/Loading'


function OnlineEventIndex() {
  
  const [onlineEvents, setOnlineEvents] = React.useState('')
  const [searchValue, setSearchValue] = React.useState('')
  const [isError, setIsError] = React.useState(false)
  const isLoading = !onlineEvents && !isError
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



  return (
    <section className="event-index-section justify-content-center">
      <div className="online-event-index-hero-image">
        <h1>Meet with fellow Mugglemore members wherever you are through our online events</h1>
      </div>
      <div className="events-page-controls justify-content-center">
        <div className="search">
          <input className="input"
            placeholder="Search for keywords"
            onChange = {handleSearch}
          />
        </div>
        {isAuth ? 
          <Button variant="primary"><a href={'/online-events/new-online-event'}>Create an event</a></Button>
          :
          <Button variant="primary"><a href={'/login'}>Login to create an event</a></Button>
        }
      </div>

      {isError && <p>Oops!</p>}
      {isLoading && <Loading />}
      {onlineEvents &&
        <div className="events-page-list">
          {filteredOnlineEvents().map(onlineEvent => (
            <OnlineEventCard key={onlineEvent._id} {...onlineEvent} />
          )
          )}
        </div>
      } 
    </section>
  )
}
export default OnlineEventIndex