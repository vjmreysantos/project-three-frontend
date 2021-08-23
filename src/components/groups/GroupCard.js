function GroupCard({ group }) {
  return (
    <div key={group._id}>
      <h2>{group.name}</h2>
      <figure>
        <img src={group.image} alt={group.name} width="300px" />
      </figure>
      <p>{group.description}</p>
      <p>{group.category.map(category => {
        return <span key={category}>{category} </span>
      })}</p>
      <div>
        {group.comments}
      </div>
      <ul>Members</ul>
      {group.members.map(member => {
        return <li key={member._id}>{member.name}</li>
      })}
    </div>
  )
}
export default GroupCard