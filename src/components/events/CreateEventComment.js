import React from 'react'
import EventCommentForm from '../comments/CommentForm'
import { getSingleEvent } from '../../lib/api'
import { useParams } from 'react-router'


function CreateEventComment() {
  const { eventId } = useParams()
  const [event, setEvent] = React.useState(null)

  React.useEffect(()=> {
    const getData = async () => {
      try {
        const response = await getSingleEvent(eventId)
        setEvent(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  },[eventId])
  
  return (
    <EventCommentForm 
      {...event}
    />
  )
}

export default CreateEventComment