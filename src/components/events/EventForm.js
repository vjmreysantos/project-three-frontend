import React from 'react'
import Select from 'react-select'
import { useHistory } from 'react-router'
import { createEvent } from '../../lib/api'
import {  Row, FormGroup, Col, FormLabel, FormControl, FormText, Button } from 'react-bootstrap'

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
      time: '',
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
    <div className="form-section">
      <div className="create-form-container">
        <h2>Summon a new event</h2>
        <form
          onSubmit={handleSubmit}
        >
          {/* <FormLabel className="label">Event name</FormLabel> */}
      
          <FormControl
            className="input"
            placeholder="Event name"
            name="name"
            onChange={handleChange}
          />
       
          <FormLabel className="label">Event image</FormLabel>
          <FormControl
            className="input"
            placeholder="Link to your event image here"
            name="image"
            onChange={handleChange}
          />
          <FormLabel className="label">Description</FormLabel>
          <FormControl
            className="input"
            as="textarea"
            placeholder="Describe your group here"
            name="description"
            onChange={handleChange}
          />
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
          <Row className="mb-3">
            <FormGroup as={Col} controlId="formGridDate">
              <FormLabel className="label">Date</FormLabel>
              <FormControl
                type="date"
                className="input"
                name="date"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup as={Col} controlId="formGridTime">
              <FormLabel className="label">Time</FormLabel>
              <FormControl
                type="time"
                className="input"
                name="time"
                onChange={handleChange}
              />
            </FormGroup>
          </Row>
          <FormLabel className="label">Event location</FormLabel>
          <FormControl
            className="input"
            placeholder="Place name"
            name="location.placeName"
            onChange={handleChange}
          />
          <FormControl
            className="input"
            placeholder="Street number"
            name="location.streetNumber"
            onChange={handleChange}
          />
          <FormControl
            className="input"
            placeholder="Street name"
            name="location.streetName"
            onChange={handleChange}
          />
          <FormControl
            className="input"
            placeholder="Post code"
            name="location.postcode"
            onChange={handleChange}
          />
          <FormControl
            className="input"
            placeholder="Latitude"
            name="location.latitude"
            onChange={handleChange}
          />
          <FormControl
            className="input"
            placeholder="Longitude"
            name="location.longitude"
            onChange={handleChange}
          />
          <FormText muted>Need a little help? You can find latitudes and longitudes  <a href='https://www.latlong.net/' target='_blank' rel='noreferrer'>here.</a>
          </FormText>
          <br></br>
          <Button className="create-event-button" variant="primary" type="submit">Accio event!</Button>
        </form>
      </div>
    </div>
  )
}

export default EventForm