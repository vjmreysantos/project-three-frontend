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

  const [category, setCategory] = React.useState('All')

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
      return (onlineEvent.name.toLowerCase().includes(searchValue.toLocaleLowerCase())) &&
      (onlineEvent.category === category || category === 'All')
    })
  }

  const handleChange = (selected, category) => {
    const selectedCategory = selected ? selected.map(item => item.value) : []
    setOnlineEvents({ ...onlineEvents, [category]: selectedCategory })
  }

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  const handleClick = () => {
    history.push('/online-events/new-online-event')
  }

  // const handleBtn = (e) => {
  //   setCategory(e.target.value)
  // }

  // function handleChange(e) {
  //   setCategory(e.target.value)
  // }


  return (
    <section className="event-index-section">
      <div className="events-page-controls justify-content-center">
        <div className="search">
          <input className="input"
            placeholder="Search for keywords"
            onChange = {handleSearch}
          />
        </div>
        {isAuth && <Button onClick={handleClick}>Create New Online Event</Button>}
      </div>
      <div>
        <select name="category" value={onlineEvents.category} onChange={handleChange}>
          <option>All</option>
          <option>Sports</option>
          <option>Books</option>
          <option>Movies</option>
          <option>Games</option>
          <option>Food</option>
          <option>Drinks</option>
          <option>Magic</option>
        </select>
        {/* <Button style={{ margin: '10px' }}
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