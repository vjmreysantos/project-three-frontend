import React from 'react'
import { useHistory } from 'react-router'
import { createOnlineEventComment } from '../../lib/api'
import { Button, FormLabel, FormControl } from 'react-bootstrap'

function OnlineEventCommentForm ({ _id, comments }) {
  const history = useHistory()

  const [formData, setFormData] = React.useState(
    {
      text: '',
    }
  )

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createOnlineEventComment(_id, formData)
      history.push(`/online-events/${_id}`)
      console.log(comments)
    } catch (err) {
      console.log(err)
    }
  }

  console.log(_id)

  return (
    <div className="comments-form-container">
      <h2>Add your comment: </h2>
      <form
        onSubmit={handleSubmit}
      >
        <FormLabel className="label">Add your comment here</FormLabel>
        <FormControl
          className="input"
          as="textarea"
          placeholder="Add your comment here"
          name="text"
          onChange={handleChange}
        />

        <div className="field">
          <Button variant="primary" type="submit">Aparecium!</Button>
        </div>
      </form>
    </div>
  )
}

export default OnlineEventCommentForm