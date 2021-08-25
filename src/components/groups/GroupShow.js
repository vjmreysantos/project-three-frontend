import React from 'react'
import { useParams } from 'react-router'
import { getSingleGroup, joinGroup } from '../../lib/api'
import GroupComments from '../comments/GroupComments'


function GroupShow() {
  const { groupId } = useParams()
  const [group, setGroup] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const isLoading = !group
  const [joinedToggle, setJoinedToggle] = React.useState(false)
  
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

  // const handleClick = () => {
  //   history.push(`/groups/${groupId}/join`)
  // } 

  const handleClick = async () => {
    try { 
      await joinGroup(groupId)
      setJoinedToggle(!joinedToggle)
      location.reload()
    } catch (err) {
      console.log(err)
    }
  } 


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
                  {joinedToggle === true ? 'Leave Group' : 'Join Group'}
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