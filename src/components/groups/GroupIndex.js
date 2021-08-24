import React from 'react'

import GroupCard from './GroupCard'
import { getAllGroups } from '../../lib/api'

function GroupIndex() {
  const [groups, setGroups] = React.useState(null)
  const [searchValue, setSearchValue] = React.useState('')
  const [isError, setIsError] = React.useState(false)
  const isLoading = !groups && !isError
  
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
    // &&
    // (artist.classifications.includes(filterValue)
    // || filterValue === 'All')
    })
  }


  return (
    <section className="event-index-section">
      <div className="events-page-controls">
        <div className="search">
          <input 
            className="input"
            placeholder="Search groups by name"
            onChange={handleSearch}
          />  
        </div>
      </div>
      <div className="events-page-list">
        {isError && <p>Sorry, used the wrong spell.</p>}
        {isLoading && <p>...loading groups</p>}
        {groups && filteredGroups().map(group => {
          return <GroupCard key={group._id} group={group} />          
        })
        }
      </div>
    </section>
    
  )
}
export default GroupIndex