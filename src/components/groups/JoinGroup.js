import { useParams, useHistory } from 'react-router'
import { joinGroup } from '../../lib/api'


function JoinGroup() {

  const { groupId } = useParams()
  const history = useHistory()

  const handleClick = async () => {
    try { 
      await joinGroup(groupId)
      history.push(`/groups/${groupId}`)
    } catch (err) {
      console.log(err)
    }
  } 

  return (
    <div>
      <h2>join group</h2>
      <button onClick={handleClick}>Confirm Join</button>
    </div>
  )
}

export default JoinGroup