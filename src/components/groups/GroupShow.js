import React from 'react'
import { useParams, useHistory } from 'react-router'
import { getSingleGroup, joinGroup, getProfile, deleteGroup } from '../../lib/api'
import { Button } from 'react-bootstrap'
import { isAuthenticated, isOwner } from '../../lib/auth'
import Loading from '../common/Loading'

function GroupShow() {
  const { groupId } = useParams()
  const [group, setGroup] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const history = useHistory()
  const isAuth = isAuthenticated()
  const isLoading = !group
  
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
      if (!isAuthenticated) {
        // window.alert.("You need to login first!")
      }
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

  const handleSubmit = async () => {
    try {
      const response = await deleteGroup(groupId)
      window.alert('You have successfully deleted this group')
      console.log(response)
      history.push('/groups')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <section className="event-show-section">
      {isError && <p>Sorry, must have used the wrong spell.</p>}
      {isLoading && <Loading />}
      {group && 
      <>
        <div className="event-show-header">
          <div className="event-header-left">
            <figure className="image">
              <img src={group.image} alt={group.name} width="300px" />
            </figure>
          </div>
          <div className="event-header-right">
            <h1>{group.name}</h1>
            <p>Location: {group.location}</p>
            <p>Members: {group.members.length}</p>
            {isOwner(group.addedBy._id) ?
              <div className="hosted-by">
                <img className="hosted-by-image" src={group.addedBy.avatar} alt={group.addedBy.username}></img>
                <p>You are the admin for this group</p>
                <Button variant="danger"
                  onClick={handleSubmit}>
                      Delete group
                </Button>
              </div>
              :
              <div className="hosted-by">
                <img className="hosted-by-image" src={group.addedBy.avatar} alt={group.addedBy.username}></img>
                <p>Hosted by <span>{group.addedBy.username}</span></p>
              </div>
            }
          </div>
        </div>

        <div className="show-main">
    
          <div className="details">
            <h2 id="about">About Group</h2>
            <p>{group.description}</p>
          </div>

          <div className="attendees">
            <h3 id="#members">Members</h3>
            <div className="attendee-cards-container">
              {group.members.map(member => {
                return <div key={member._id} className="attendee-card">
                  <img src={member.avatar} alt={member.username}></img>
                  <p>{member.username}</p>
                </div>
              })}
            </div>
          </div>

          <div className="discussion">
            <h3 id="discussion">Discussion</h3> 
            <div className="comments-container">
              {group.comments.length === 0 ?
                <p>No comments yet!</p>
                :
                group.comments.map(comment=>(
                  <div key={group._id} className="comment">
                    <div className="comment-left">
                      <img className="comment-image" src={group.addedBy.avatar} alt={group.addedBy.username}></img>
                      <p>{group.addedBy.username}</p>
                    </div>
                    <div className="comment-right">
                      <p>{comment.text}</p>
                      <p>{comment.rating}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className="add-a-comment">
            <h3>Want to take part in the discussion?</h3>
            {isAuth ? 
              <Button className="comment-button"><a className="comment-button" href={`/groups/${groupId}/create-comment`}>Create a comment</a></Button>
              :
              <Button className="comment-button"><a className="comment-button" href={'/login'}>Login to comment</a></Button>
            }
          </div>
        </div>

        <div className="event-show-attend-footer">
          <div className="attend-footer-left">
            <h4>{group.name}</h4>
            <p>{group.location}</p>
          </div>
          <div className="attend-footer-right">
            {isAuth ? 
              <Button className="attend-button" onClick = {handleClick}>
                {isMember ? 'Leave group' : 'Sign me up!'}
              </Button>
              :
              <Button className="attend-button"><a className="attend-button" href={'/login'}>Login to join</a></Button>
            } 
          </div>
        </div>
      </>
      }
    </section>
  )
}

export default GroupShow