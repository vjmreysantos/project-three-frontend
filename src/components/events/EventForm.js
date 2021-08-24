import React from 'react'
import axios from 'axios'
import Select from 'react-select'
import { useHistory } from 'react-router'
import { getHeaders } from '../../lib/api'
import { useParams } from 'react-router-dom'
import { Form, FormLabel, FormControl, Button } from 'react-bootstrap'

function EventForm () {

  const { eventId } = useParams()
  const history = useHistory()

  const selectOptions = [
    { value: 'sport', label: 'Sport' },
    { value: 'magic', label: 'Magic' },
    { value: 'books', label: 'Books' },
    { value: 'movies', label: 'Movies' },
    { value: 'food', label: 'Food' },
    { value: 'drinks', label: 'Drinks' }
  ]

  const [formData, setFormData] = React.useState(
    {
      name: '',
      image: '',
      description: '',
      category: [],
      date: '',
      location: {
        placeName: '',
        streetNumber: '',
        streetName: '',
        postcode: '',
        latitude: '',
        longitude: '',
      },
    }
  )

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/events/new-event', formData, getHeaders())
      history.push(`/events/${eventId}`)
      location.reload()
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleMultiSelectChange = (selected, name) => {
    const selectedItems = selected ? selected.map(item => item.value) : []
    setFormData({ ...formData, [name]: selectedItems })
  }

  return (
    <div className="create-event-form-container">
      <h2>New event</h2>
      <Form
        className="mb-3"
        onSubmit={handleSubmit}
      >
        <FormLabel className="label">Event name</FormLabel>
        <FormControl
          className="input"
          placeholder="Event name"
          name="name"
          onChange={handleChange}
        >
        </FormControl>
        <FormLabel className="label">Event image</FormLabel>
        <FormControl
          className="input"
          placeholder="Link to your event image here"
          name="image"
          onChange={handleChange}
        >
        </FormControl>
        <FormLabel className="label">Categories</FormLabel>
        <Select
          className="multiselect"
          options={selectOptions}
          isMulti
          onChange={selected =>
            handleMultiSelectChange(selected, 'category')
          }
          value={formData.category.map(item => ({ label: item[0].toUpperCase() + item.substring(1), value: item }))}
        />
        <FormLabel className="label">Date</FormLabel>
        <FormControl
          type="date"
          className="input"
          name="date"
          onChange={handleChange}
        >
        </FormControl>
        <FormLabel className="label">Event location</FormLabel>
        <FormControl
          className="input"
          placeholder="Place name"
          name="location.placeName"
          onChange={handleChange}
        >
        </FormControl>
        <FormControl
          className="input"
          placeholder="Street number"
          name="location.streetNumber"
          onChange={handleChange}
        >
        </FormControl>
        <FormControl
          className="input"
          placeholder="Street name"
          name="location.streetName"
          onChange={handleChange}
        >
        </FormControl>
        <FormControl
          className="input"
          placeholder="Post code"
          name="location.postcode"
          onChange={handleChange}
        >
        </FormControl>
        <FormControl
          className="input"
          placeholder="Longitude"
          name="location.longitude"
          onChange={handleChange}
        >
        </FormControl>
        <FormControl
          className="input"
          placeholder="Latitude"
          name="location.latitude"
          onChange={handleChange}
        >
        </FormControl>
        <Button className="create-event-button" variant="primary">Create event</Button>
      </Form>
    </div>
  )
}

export default EventForm