import React from 'react'
import { getProfile } from '../../lib/api'

function Profile() {
  const [isError, setIsError] = React.useState(false)
  const [user, setUser] = React.useState(null)
  const isLoading = !user && !isError


  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getProfile()
        setUser(response.data)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
    // setTimeout(getData, 3000)
  },[])

  return (
    
    <section className="profile-section">
      {isLoading && <p>...loading</p>}
      {user &&
      <div className="profile-container">
        <div className="profile-header">
          <figure>
            <img className="user-avatar" src={user.avatar}></img>
          </figure>
          <h3>Hello <span>{user.username}</span></h3>
        </div>
        <div className="profile-main">
          <h3>Groups you are an admin for</h3>
          <div className="groups-created-container">
            {user.createdGroup.length === 0 ?
              <p>You are not an admin for any groups yet!</p>
              :
              user.createdGroup.map(group => (
                <div className="created-group" key={group._id}>
                  <h5>{group.name}</h5>
                  <figure className="created-group-image">
                    <img src={group.image} alt={group.name}></img>
                  </figure>
                </div>
              ))
            }
          </div>
          <h2>Groups you are a member of</h2>
          <div className="joined-groups-container">
            {user.joinedGroup.length === 0 ?
              <p>You have not joined any groups yet!</p>
              :
              user.joinedGroup.map(group => (
                <div className="joined-groups" key={group._id}>
                  <p>{group.name}</p>
                  <figure className="joined-group-image">
                    <img src={group.image} alt={group.name}></img>
                  </figure>
                </div>
              ))
            }
          </div>
          <h2>Your events</h2>
          <div className="joined-events-container">
            {user.joinedEvent.length === 0 ?
              <p>You have not joined any events yet!</p>
              :
              user.joinedEvent.map(event => (
                <div className="attended-events" key={event._id}>
                  <p>{event.date}</p>
                  <p>{event.name}</p>
                  <figure className="attended-event-image">
                    <img src={event.image} alt={event.name}></img>
                  </figure>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      }
    </section>
    
  )
}

export default Profile