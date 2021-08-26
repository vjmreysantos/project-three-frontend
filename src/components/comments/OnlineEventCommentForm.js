import React from 'react'
import { useHistory } from 'react-router'
import { createOnlineEventComment } from '../../lib/api'

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
        <div className="field">
          <label className="label">Comment</label>
          <div className="control">
            <input
              className="input"
              placeholder="Add your comment here"
              type="textarea"
              name="text"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field">
          <button type="submit">Submit comment</button>
        </div>
      </form>
    </div>
  )
}

export default OnlineEventCommentForm