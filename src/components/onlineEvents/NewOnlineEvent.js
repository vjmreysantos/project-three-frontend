
import React from 'react'
import { useHistory } from 'react-router-dom'
import Select from 'react-select'

import { createOnlineEvent } from '../../lib/api'

function NewOnlineEvent() {
  const history = useHistory()
  
  const initialState = {
    name: '',
    image: '',
    description: '',
    date: '',
    time: '',
    category: [],
    meetingLink: '',
  }

  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)
  
  const categoryOptions = [
    { value: 'sports', label: 'Sports' },
    { value: 'food', label: 'Food' },
    { value: 'drinks', label: 'Drinks' },
    { value: 'books', label: 'Books' },
    { value: 'movies', label: 'Movies' },
    { value: 'magic', label: 'Magic' }
  ]
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleMultiSelectChange = (selected, name) => {
    const selectedItems = selected ? selected.map(item=> item.value) : []
    setFormData({ ...formData, [name]: selectedItems })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await createOnlineEvent(formData)
      history.push(`/online-events/${data._id}`)
    } catch (err) {
      setFormErrors(err.response.data.errors)
      alert('Sorry, you are not allowed to do that. Please, login.')
    }
  }
  
  return (
    <section>
      <div className="form-section">
        <div className="create-form-container">
          <h1>Summon a new online event!</h1>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Event Name</label>
              <div className="form-group">
                <input 
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />  
              </div>
            </div>
            <div className="field">
              <label className="label">Event Date</label>
              <div className="form-group">
                <input
                  className="form-control"
                  type="date"
                  name="date"
                  onChange={handleChange}
                />  
              </div>
            </div>
            <div className="field">
              <label className="label">Event Time</label>
              <div className="form-group">
                <input
                  className="form-control"
                  type="time"
                  name="time"
                  onChange={handleChange}
                />  
              </div>
            </div>
            <div className="field">
              <label className="label">Meeting Link</label>
              <div className="form-group">
                <input 
                  className="form-control"
                  name="meetingLink"
                  value={formData.meetingLink}
                  onChange={handleChange}
                />  
              </div>
            </div>
            <div className="field">
              <label className="label">Upload Event Image</label>
              <div className="form-group">
                <input 
                  className="form-control"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                />  
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="form-group">
                <textarea 
                  className="textarea form-control"
                  name="description"
                  placeholder="Tell us about your event!"
                  value={formData.description}
                  onChange={handleChange}
                />  
              </div>
            </div>
            <div className="field">
              <label className="label">Select Event Category</label>
              <p>Choose as many as apply!</p>
              <div className="form-group">
                <Select 
                  className="multiselect"
                  options={categoryOptions}
                  isMulti
                  onChange={selected =>
                    handleMultiSelectChange(selected, 'category')
                  }
                  value={formData.category.map(item => ({ label: item[0].toUpperCase() + item.substring(1), value: item }))}
                />  
              </div>
            </div>
            <div className="field">
              <button className="btn btn-primary btn-lg" type="submit">
              Accio event!
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    
  )
}

export default NewOnlineEvent