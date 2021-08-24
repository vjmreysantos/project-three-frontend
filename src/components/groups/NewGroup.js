
import React from 'react'
import { useHistory } from 'react-router-dom'
import { createGroup } from '../../lib/api'
import Select from 'react-select'

function NewGroup() {
  
  const initialState = {
    name: '',
    image: '',
    description: '',
    location: '',
    category: [],
  }

  const history = useHistory()
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
      const { data } = await createGroup(formData)
      history.push(`/groups/${data._id}`)
    } catch (err) {
      setFormErrors(err.response.data.errors)
      alert('Sorry, you are not allowed to do that. Please, login.')
    }
  }
  
  return (
    <section>
      <div className="container-column">
        <h1>Create a new group!</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Group Name</label>
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
            <label className="label">Location</label>
            <div className="form-group">
              <input 
                className="form-control"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />  
            </div>
          </div>
          <div className="field">
            <label className="label">Upload Group Image</label>
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
                placeholder="Tell us what your group is all about!"
                value={formData.description}
                onChange={handleChange}
              />  
            </div>
          </div>
          <div className="field">
            <label className="label">Select Group Category</label>
            <p>Choose as many as apply!</p>
            <div className="form-group">
              <Select 
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
              Create Group!
            </button>
          </div>
        </form>
      </div>
    </section>
    
  )
}

export default NewGroup