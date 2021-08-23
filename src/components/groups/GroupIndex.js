import React from 'react'
import axios from 'axios'

import GroupCard from './GroupCard'

function GroupIndex() {
  const [groups, setGroups] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const isLoading = !groups && !isError
  
  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('/api/groups')
        setGroups(res.data)
        console.log(groups)
      } catch (err) {
        console.log(err)
        setIsError(true)
      }
    }
    getData()    
  }, [])

  return (
    <section>
      <h1>Groups</h1>
      <div>
        {isError && <p>Sorry, used the wrong spell.</p>}
        {isLoading && <p>...loading groups</p>}
        {groups && groups.map(group => {
          return <GroupCard key={group._id} group={group} />          
        })
        }
      </div>
    </section>
    
  )
}
export default GroupIndex