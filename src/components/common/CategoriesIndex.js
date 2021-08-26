import React from 'react'
import { getAllOnlineEvents, getAllEvents, getAllGroups } from '../../lib/api'
import { Container } from 'react-bootstrap'

function FilteredCategories() {

  const [onlineEvents, setOnlineEvents] = React.useState('')
  const [events, setEvents] = React.useState('')
  const [groups, setGroups] = React.useState('')
  const [isError, setIsError] = React.useState(false)
  const isLoading = !onlineEvents && !events && !groups && !isError

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllOnlineEvents()
        setOnlineEvents(response.data)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [])

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllEvents()
        setEvents(response.data)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [])

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllGroups()
        setGroups(response.data)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [])


  return (
    <Container>
      {isError && <p>Oops!</p>}
      {isLoading && <p>...loading</p>}
      <h1>filtered by category index</h1>
    </Container>

  )
}

export default FilteredCategories