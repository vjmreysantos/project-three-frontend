import React from 'react'
import { useHistory } from 'react-router-dom'
import { loginUser } from '../../lib/api'
import { setToken } from '../../lib/auth'
import {  FormLabel, FormControl, Button } from 'react-bootstrap'

function Login() {
  const history = useHistory()
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  })
  const [isError, setIsError] = React.useState(false)

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await loginUser(formData)
      setToken(data.token)
      history.push('/profile')
    } catch (err) {
      setIsError(true)
    }
  }

  return (
    <section className="login-form">
      <div className="login-form-container">
        <div className="columns">
          <form
            onSubmit={handleSubmit}
          >
            <FormLabel className="label">Email</FormLabel>
            <FormControl
              className="input"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />

            <FormLabel className="label">Password</FormLabel>
            <FormControl
              type="password"
              className="input"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {isError && (
              <p className="form-error">
                Either email or password were incorrect
              </p>
            )}
            <Button className="button" type="submit">
              Alohomora!
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login
