import React from 'react'
import { registerUser } from '../../lib/api'
import { useHistory } from 'react-router-dom'

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  avatar: '',
}

function Register() {
  const history = useHistory()
  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await registerUser(formData)
      history.push('/login')
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <form
            className="column"
            onSubmit={handleSubmit}
          >
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Username"
                  onChange={handleChange}
                  name="username"
                  value={formData.username}
                />
              </div>
              {formErrors.username && (
                <p className="form-errors">{formErrors.username}</p>
              )}
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Email"
                  onChange={handleChange}
                  name="email"
                  value={formData.email}
                />
              </div>
              {formErrors.email && (
                <p className="form-errors">{formErrors.email}</p>
              )}
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  onChange={handleChange}
                  name="password"
                  value={formData.password}
                />
              </div>
              {formErrors.password && (
                <p className="form-errors">{formErrors.password}</p>
              )}
            </div>
            <div className="field">
              <label className="label">Password Confirmation</label>
              <div className="control">
                <input
                  type="password"
                  className="input"
                  placeholder="Password Confirmation"
                  onChange={handleChange}
                  name="passwordConfirmation"
                  value={formData.passwordConfirmation}
                />
              </div>
              {formErrors.passwordConfirmation && (
                <p className="form-errors">
                  {formErrors.passwordConfirmation}
                </p>
              )}
            </div>
            <div className="field">
              <label className="label">House</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="House"
                  onChange={handleChange}
                  name="house"
                  value={formData.house}
                />
              </div>
              {formErrors.house && (
                <p className="form-errors">
                  {formErrors.house}
                </p>
              )}
            </div>
            <div className="field">
              <label className="label">Avatar</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Avatar"
                  onChange={handleChange}
                  name="avatar"
                  value={formData.avatar}
                />
              </div>
              {formErrors.avatar && (
                <p className="form-errors">
                  {formErrors.avatar}
                </p>
              )}
            </div>
            <div className="field">
              <button type="submit" className="Button">
                Sign Me Up!
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Register