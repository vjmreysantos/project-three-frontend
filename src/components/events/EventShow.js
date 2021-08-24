import React from 'react'
import { useParams } from 'react-router-dom'
import { getSingleEvent } from '../../lib/api'

function EventShow() {
  const { eventId } = useParams()
  const [event, setEvent] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const isLoading = !event && !isError

  React.useEffect(()=> {
    const getData = async () => {
      try {
        const response = await getSingleEvent(eventId)
        setEvent(response.data)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  },[eventId])

  return (
    <section className="event-show-section">
      {isError && <p>Oops!</p>}
      {isLoading && <p>...loading</p>}
      {event &&
        <h1>This is the event show page</h1>
      }
    </section>
  )
}

export default EventShow