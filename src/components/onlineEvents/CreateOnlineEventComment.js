import React from 'react'
import OnlineEventCommentForm from '../comments/OnlineEventCommentForm'
import { getSingleOnlineEvent } from '../../lib/api'
import { useParams } from 'react-router'


function CreateOnlineEventComment() {
  const { onlineEventId } = useParams()
  const [onlineEvent, setOnlineEvent] = React.useState(null)

  React.useEffect(()=> {
    const getData = async () => {
      try {
        const response = await getSingleOnlineEvent(onlineEventId)
        setOnlineEvent(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  },[onlineEventId])
  
  return (
    <OnlineEventCommentForm 
      {...onlineEvent}
    />
  )
}

export default CreateOnlineEventComment