import React from 'react'
import { useParams } from 'react-router'
import { getSingleGroup, joinGroup, getProfile } from '../../lib/api'
import GroupComments from '../comments/GroupComments'



function GroupShow() {
  const { groupId } = useParams()
  const [group, setGroup] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const isLoading = !group
  // const [joinedToggle, setJoinedToggle] = React.useState(false)
  
  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getSingleGroup(groupId)
        setGroup(res.data)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [groupId])

  const handleClick = async () => {
    try { 
      await joinGroup(groupId)
      const res = await getSingleGroup(groupId)
      setGroup(res.data)
    } catch (err) {
      console.log(err)
    }
  } 

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getProfile()
        setCurrentUser(res.data)
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  const isMember = group?.members.some(member => {
    return member._id === currentUser?._id
  })

  return (
    <section>
      <div>
        {isError && <p>Sorry, must have used the wrong spell.</p>}
        {isLoading && <p>...loading</p>}
        {group && 
          <div className="show-container">
            <hr />
            <div className="container-row">
              <figure className="image">
                <img src={group.image} alt={group.name} width="300px" />
              </figure>
              <div className="container-column">
                <h1>{group.name}</h1>
                <p>Location: {group.location}</p>
                <p>Members: {group.members.length}</p>
                {/* <p>{group.addedBy}</p> */}
                <button className="button btn btn-primary" onClick={handleClick}>
                  {isMember ? 'Leave Group' : 'Join Group'}
                </button>
              </div>
            </div>
            <hr />
            <div className="container-row">
              <a href="#about">About</a>
              <a href="#events">Events</a>
              <a href="#members">Members</a>
              <a href="#discussion">Discussion</a>
            </div>
            <div className="container-row">
              <div className="container-column">
                <h3 id="about">About {group.name}</h3>
                <p>{group.description}</p>
                <h3 id="events">Upcoming Events</h3>
                <p>upcoming events go here</p>
              </div>
              <div className="container-column">
                <h3>Organizer</h3>
                <p>{group.addedBy.username}</p>
                <h3 id="#members">Members</h3>
                {group.members.map(member => {
                  return <li key={member._id}>{member.username}</li>
                })}
              </div>
            </div> 
            <div className="container-column">
              <h3 id="#discussion">Discussion</h3>
              <GroupComments />
              {group.comments.map(comment => {
                return <li key={comment._id}>{comment.text}</li>
              })}
            </div>  
          </div>}  
      </div>
    </section>
    
  )
}

export default GroupShow