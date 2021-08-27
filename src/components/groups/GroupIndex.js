import React from 'react'
import { useHistory } from 'react-router'
import { Button } from 'react-bootstrap'

import GroupCard from './GroupCard'
import { getAllGroups } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'
import Loading from '../common/Loading'



function GroupIndex() {
  const [groups, setGroups] = React.useState(null)
  const [searchValue, setSearchValue] = React.useState('')
  const [isError, setIsError] = React.useState(false)
  const isLoading = !groups && !isError
  const history = useHistory()
  const isAuth = isAuthenticated()
  
  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllGroups()
        setGroups(res.data)
      } catch (err) {
        console.log(err)
        setIsError(true)
      }
    }
    getData()    
  }, [])

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

  const filteredGroups = () => {
    return groups.sort(compareEvents).filter(group => {
      return (group.name.toLowerCase().includes(searchValue.toLocaleLowerCase())) 
    })
  }

  const handleClick = () => {
    history.push('/groups/new-group')
  }

  return (
    <section className="event-index-section">
      <div className="group-index-hero-image">
        <h1>On Mugglemore there are groups for all kinds of Potterheads, from book lovers to bikers, Quidditch stars to potion masters. </h1>
      </div>
      <div className="events-page-controls justify-content-center">
        <div className="search">
          <input 
            className="input"
            placeholder="Search groups by name"
            onChange={handleSearch}
          />  
        </div>
        {isAuth && <Button onClick={handleClick}>Create New Group</Button>}
      </div>
      <div className="events-page-list justify-content-center">
        {isError && <p>Sorry, used the wrong spell.</p>}
        {isLoading && <Loading />}
        {groups && filteredGroups().map(group => {
          return <GroupCard key={group._id} group={group} />          
        })
        }
      </div>
    </section>
    
  )
}
export default GroupIndex