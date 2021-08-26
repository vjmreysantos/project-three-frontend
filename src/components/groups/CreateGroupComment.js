import React from 'react'
import GroupCommentForm from '../comments/GroupCommentForm'
import { getSingleGroup } from '../../lib/api'
import { useParams } from 'react-router'


function CreateGroupComment() {
  const { groupId } = useParams()
  const [group, setGroup] = React.useState(null)

  React.useEffect(()=> {
    const getData = async () => {
      try {
        const response = await getSingleGroup(groupId)
        setGroup(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  },[groupId])
  
  return (
    <GroupCommentForm 
      {...group}
    />
  )
}

export default CreateGroupComment