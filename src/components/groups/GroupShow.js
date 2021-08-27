import React from 'react'
import { useParams } from 'react-router'

import { getSingleGroup, joinGroup, getProfile } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'
import Loading from '../common/Loading'

function GroupShow() {
  const { groupId } = useParams()
  const [group, setGroup] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
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

  return (
    <section>
      <div>
        {isError && <p>Sorry, must have used the wrong spell.</p>}
        {isLoading && <Loading />}
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
              <a href="#members">Members</a>
              <a href="#discussion">Discussion</a>
            </div>
            <div className="container-row">
              <div className="container-column">
                <h3>Organizer</h3>
                <p>{group.addedBy.username}</p>
                <h3 id="#members">Members</h3>
                {group.members.map(member => {
                  return <li key={member._id}>{member.username}</li>
                })}
              </div>
            </div>
            <h3 id="discussion">Discussion</h3> 
            <div className="comments-container">
              {group.comments.length === 0 ?
                <p>No comments yet!</p>
                :
                group.comments.map(comment=>(
                  <div key={comment._id} className="comment">
                    <div className="comment-left">
                      <img src={comment.addedBy.avatar} alt={comment.addedBy.username}></img>
                      <p>{comment.addedBy.username}</p>
                    </div>
                    <div className="comment-right">
                      <p>{comment.text}</p>
                    </div>
                    {/* {isOwner(comment.addedBy._id) ?
                      <div className="field">
                        <button type="button"
                          className="comment-delete-button"
                          onClick={() => deleteGroupComment(comment._id)}>
                            Delete comment
                        </button>
                      </div>
                      :
                      ''  
                    } */}
                  </div>
                ))
              }
              <h3>Want to add a comment?</h3>
              <button><a href={`/groups/${groupId}/create-comment`}>Add your comment here</a></button>
            </div>  
          </div> 
        }
      </div>
    </section>
  )
}

export default GroupShow