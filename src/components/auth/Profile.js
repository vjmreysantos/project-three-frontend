import React from 'react'

import { getProfile } from '../../lib/api'
import Loading from '../common/Loading'

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

  console.log(user)

  return (
    
    <section className="profile-section">
      {isLoading && <Loading />}
      {user &&
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-header-top">
            <figure>
              <img className="user-avatar" src={user.avatar}></img>
            </figure>
            <h3>Hello <span>{user.username}</span></h3>
          </div>
          <div className="profile-header-house">
            {user.house === 'gryffindor' &&
              <p>You are a member of Gryffindor House, where dwell the brave at heart. Their daring, nerve and chilvalry set Gryffindors apart.</p>    
            }
            {user.house === 'slytherin' &&
              <p>You are a member of Slytherin House. Did you know Merlin himself was a Slytherin, or that according to legend, the ribbon of a First Class Order of Merlin is green to reflect his Hogwarts house?</p>    
            }
            {user.house === 'ravenclaw' &&
              <p>You are a member of Ravenclaw House, where those of wit and learning will always find their kind.</p>    
            }
            {user.house === 'hufflepuff' &&
              <p>You are a member of Hufflepuff House, where they are just and loyal. Those patient Hufflepuffs are true and unafraid of toil.</p>    
            }
          </div>
        </div>
        <div className="profile-main">
          <h3>Groups you are an admin for:</h3>
          <div className="groups-created-container">
            {user.createdGroup.length === 0 ?
              <p>You are not an admin for any groups yet!</p>
              :
              user.createdGroup.map(group => (
                <a className="created-group" key={group.name}href={`/groups/${group._id}`}>
                  <h5>{group.name}</h5>
                  <figure className="created-group-image">
                    <img src={group.image} alt={group.name}></img>
                  </figure>
                </a>
              ))
            }
          </div>
          <h2>Groups you are a member of:</h2>
          <div className="joined-groups-container">
            {user.joinedGroup.length === 0 ?
              <p>You have not joined any groups yet!</p>
              :
              user.joinedGroup.map(group => (
                <a className="joined-groups" key={group.name}href={`/groups/${group._id}`}>
                  <p>{group.name}</p>
                  <figure className="joined-group-image">
                    <img src={group.image} alt={group.name}></img>
                  </figure>
                </a>
              ))
            }
          </div>
          <h2>Your in-person events:</h2>
          <div className="joined-events-container">
            {user.joinedEvent.length === 0 ?
              <p>You have not joined any events yet!</p>
              :
              user.joinedEvent.map(event => (
                <a className="joined-events" key={event.name}href={`/events/${event._id}`}>
                  <p>{event.date}</p>
                  <p>{event.name}</p>
                  <figure className="attended-event-image">
                    <img src={event.image} alt={event.name}></img>
                  </figure>
                </a>
              ))
            }
          </div>
          <h2>Your online events:</h2>
          <div className="joined-online-events-container">  
            {user.joinedOnlineEvent.length === 0 ? 
              <p>You have not signed up for any online events yet!</p>
              :
              user.joinedOnlineEvent.map(onlineEvent => {
                return <a className="joined-online-events" key={onlineEvent.name}href={`/online-events/${onlineEvent._id}`}>
                  <p>{onlineEvent.date}</p>
                  <p>{onlineEvent.name}</p>
                  <figure className="attended-event-image">
                    <img src={onlineEvent.image} alt={onlineEvent.name} />
                  </figure>
                </a>
              })}
          </div>
        </div>
      </div>
      }
    </section>
    
  )
}

export default Profile