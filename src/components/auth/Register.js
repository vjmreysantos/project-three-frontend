import React from 'react'
import { registerUser } from '../../lib/api'
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  avatar: '',
  house: '',
  details: {
    wand: '',
    favoriteSweet: '',
    pet: '',
  },
}

function Register() {
  const history = useHistory()
  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)

  const handleChange = event => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setFormData({ ...formData, [event.target.name]: value })
    // setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [event.target.name]: '' })
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
    <section className="form-section">
      <div className="create-form-container">
        <div className="form-header">
          <h1>Register and get sorted into your house</h1>
        </div>
        <form
          className="registration-form-container"
          onSubmit={handleSubmit}
        >
          <div className="form-main">
            <div className="form-left">
              <h3 className="label">User Details</h3>
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
            </div>
            <div className="form-right">
              {/* SORTING QUESTIONS */}
              <div>
                <h3 className="feature-title">Get Sorted!</h3>
                {/* Quidditch Position Question */}
                <label className="label">
                  Which quidditch position would you like to play?
                </label>
                <div className="form-group">
                  <div className="form-check form-check-inline">
                    <label className="radio">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="inlineCheckbox1"
                        name="position"
                        value="gryffindor"
                        // onChange={handleChange}
                        // checked={formData.position === 'gryffindor'}
                      />
                      Chaser
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <label className="radio">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="inlineCheckbox2"
                        name="position"
                        value="slytherin"
                        // onChange={handleChange}
                        // checked={formData.position === 'slytherin'}
                      />
                      Seeker
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <label className="radio">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="inlineCheckbox3"
                        name="position"
                        value="ravenclaw"
                        // onChange={handleChange}
                        // checked={formData.position === 'ravenclaw'}
                      />
                      Beater
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <label className="radio">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="inlineCheckbox4"
                        name="position"
                        value="hufflepuff"
                        // onChange={handleChange}
                        // checked={formData.position === 'hufflepuff'}
                      />
                      Keeper
                    </label>
                  </div>
                </div>
                {/* Best Trait Question */}
                <label className="label">
                  What do you think is your best trait?
                </label>
                <div className="form-group">
                  <div className="form-check form-check-inline">
                    <label className="radio">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="inlineCheckbox1"
                        name="trait"
                        value="ravenclaw"
                        // onChange={handleChange}
                        // checked={formData.trait === 'ravenclaw'}
                      />
                      Intelligence
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <label className="radio">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="inlineCheckbox2"
                        name="trait"
                        value="gryffindor"
                        // onChange={handleChange}
                        // checked={formData.trait === 'gryffindor'}
                      />
                      Bravery
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <label className="radio">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="inlineCheckbox3"
                        name="trait"
                        value="hufflepuff"
                        // onChange={handleChange}
                        // checked={formData.trait === 'hufflepuff'}
                      />
                      Kindness
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <label className="radio">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="inlineCheckbox4"
                        name="trait"
                        value="slytherin"
                        // onChange={handleChange}
                        // checked={formData.trait === 'slytherin'}
                      />
                      Ambition
                    </label>
                  </div>
                </div>
                {/* SCHOOL PET Question */}
                <label className="label">
                  Which pet would you bring to school?
                </label>
                <div className="form-group">
                  <div className="form-check form-check-inline">
                    <label className="radio">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="inlineCheckbox1"
                        name="details.pet"
                        value="owl"
                        // onChange={handleChange}
                        // checked={formData.details.favoriteSweet === 'licoriceWand'}
                      />
                      Owl
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <label className="radio">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="inlineCheckbox2"
                        name="details.pet"
                        value="cat"
                      //   onChange={handleChange}
                      //   checked={formData.details.favoriteSweet === 'chocolateFrog'}
                      />
                      Cat
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <label className="radio">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="inlineCheckbox3"
                        name="details.pet"
                        value="toad"
                        // onChange={handleChange}
                        // checked={formData.details.favoriteSweet === 'cauldronCake'}
                      />
                      Toad
                    </label>
                  </div>
                </div>  
                {/* FAVORITE SWEET Question */}
                <label className="label">
                  Which sweet do you get on the Hogwarts Express?
                </label>
                <div className="form-group">
                  <div className="form-check form-check-inline">
                    <label className="radio">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="inlineCheckbox1"
                        name="details.favoriteSweet"
                        value="licoriceWand"
                        // onChange={handleChange}
                        // checked={formData.details.favoriteSweet === 'licoriceWand'}
                      />
                      Licorice Wand
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <label className="radio">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="inlineCheckbox2"
                        name="details.favoriteSweet"
                        value="chocolateFrog"
                        // onChange={handleChange}
                        // checked={formData.details.favoriteSweet === 'chocolateFrog'}
                      />
                      Chocolate Frog
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <label className="radio">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="inlineCheckbox3"
                        name="details.favoriteSweet"
                        value="cauldronCake"
                        // onChange={handleChange}
                        // checked={formData.details.favoriteSweet === 'cauldronCake'}
                      />
                      Cauldron Cake
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <label className="radio">
                      {/* <input 
                        className="input"
                        placeholder="Favorite Sweet"
                        name="details.favoriteSweet"
                        value={formData.details.favoriteSweet}
                        onChange={handleChange}
                      /> */}
                      <input
                        type="radio"
                        className="form-check-input"
                        id="inlineCheckbox4"
                        name="details.favoriteSweet"
                        value="pumpkinPasties"
                        // onChange={handleChange}
                        // checked={formData.details.favoriteSweet === 'pumpkinPasties'}
                      />
                      Pumpkin Pasties
                    </label>
                  </div>
                </div>
                {/* WAND WOOD Question */}
                <label className="label">
                  What is your wand made of?
                </label>
                <div className="form-group">
                  <div className="form-check form-check-inline">
                    <label className="radio">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="inlineCheckbox1"
                        name="details.wand"
                        value="elm"
                        // onChange={handleChange}
                        // checked={formData.details.favoriteSweet === 'licoriceWand'}
                      />
                      Elm
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <label className="radio">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="inlineCheckbox2"
                        name="details.wand"
                        value="willow"
                      //   onChange={handleChange}
                      //   checked={formData.details.favoriteSweet === 'chocolateFrog'}
                      />
                      Willow
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <label className="radio">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="inlineCheckbox3"
                        name="details.wand"
                        value="oak"
                        // onChange={handleChange}
                        // checked={formData.details.favoriteSweet === 'cauldronCake'}
                      />
                      Oak
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <label className="radio">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="inlineCheckbox4"
                        name="details.wand"
                        value="cypress"
                        // onChange={handleChange}
                        // checked={formData.details.favoriteSweet === 'pumpkinPasties'}
                      />
                      Cypress
                    </label>
                  </div>
                </div>
                {/* Which House Question */}
                <label className="label">
                  Which house do you think best suits you?
                </label>
                <div className="form-group">
                  <div className="form-check form-check-inline">
                    <label className="radio">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="inlineCheckbox1"
                        name="house"
                        value="hufflepuff"
                        onChange={handleChange}
                        checked={formData.house === 'hufflepuff'}
                      />
                      Hufflepuff
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <label className="radio">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="inlineCheckbox2"
                        name="house"
                        value="gryffindor"
                        onChange={handleChange}
                        checked={formData.house === 'gryffindor'}
                      />
                      Gryffindor
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <label className="radio">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="inlineCheckbox3"
                        name="house"
                        value="slytherin"
                        onChange={handleChange}
                        checked={formData.house === 'slytherin'}
                      />
                      Slytherin
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <label className="radio">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="inlineCheckbox4"
                        name="house"
                        value="ravenclaw"
                        onChange={handleChange}
                        checked={formData.house === 'ravenclaw'}
                      />
                      Ravenclaw
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>   
          <div className="form-footer">
            < div className="field">
              <Button variant="primary" type="submit" className="Button">
                Sign Me Up!
              </Button>
            </div>
          </div>     
        </form>
      </div>
    </section>
  )
}

export default Register