import React from 'react'
import Select from 'react-select'
import { useHistory } from 'react-router'
import { createEvent } from '../../lib/api'
import { FormLabel, FormControl, Button } from 'react-bootstrap'

function EventForm () {
  const history = useHistory()

  const selectOptions = [
    { value: 'sport', label: 'Sport' },
    { value: 'magic', label: 'Magic' },
    { value: 'books', label: 'Books' },
    { value: 'movies', label: 'Movies' },
    { value: 'food', label: 'Food' },
    { value: 'drinks', label: 'Drinks' }
  ]

  const initialState =
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
  
  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await createEvent(formData)
      history.push(`/events/${data._id}`)
    } catch (err) {
      setFormErrors(err.response.data.errors)
      alert('Sorry, you are not allowed to do that. Please, login.')
    }
  }

  const handleMultiSelectChange = (selected, name) => {
    const selectedItems = selected ? selected.map(item => item.value) : []
    setFormData({ ...formData, [name]: selectedItems })
  }

  return (
    <div className="create-event-form-container">
      <h2>New event</h2>
      <form
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
        <FormLabel className="label">Description</FormLabel>
        <FormControl
          className="input"
          type="text-input"
          placeholder="Describe your group here"
          name="description"
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
          placeholder="Latitude"
          name="location.latitude"
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
        <Button className="create-event-button" variant="primary" type="submit">Create event</Button>
      </form>
    </div>
  )
}

export default EventForm