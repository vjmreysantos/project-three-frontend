// import React from 'react'



// function Sorting() {
//   const [user, setUser] = React.useState(null)
  
//   const [formData, setFormData] = React.useState({
//     position: '',
//     trait: '',
//     house: '',

//   })

//   const handleChange = (event) => {
//     const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
//     setFormData({ ...formData, [event.target.name]: value })
//   }

 
  
//   return (
// //* Sorting Questions

//     <div>
//       <h3 className="feature-title">Get Sorted!</h3>
//       {/* Quidditch Position Question */}
//       <label className="label">
//           Which quidditch position would you like to play?
//       </label>
//       <div className="form-group">
//         <div className="form-check form-check-inline">
//           <label className="radio">
//             <input
//               type="radio"
//               className="form-check-input"
//               id="inlineCheckbox1"
//               name="position"
//               value="gryffindor"
//               onChange={handleChange}
//               checked={formData.position === 'gryffindor'}
//             />
//           Chaser
//           </label>
//         </div>
//         <div className="form-check form-check-inline">
//           <label className="radio">
//             <input
//               type="radio"
//               className="form-check-input"
//               id="inlineCheckbox2"
//               name="position"
//               value="slytherin"
//               onChange={handleChange}
//               checked={formData.position === 'slytherin'}
//             />
//           Seeker
//           </label>
//         </div>
//         <div className="form-check form-check-inline">
//           <label className="radio">
//             <input
//               type="radio"
//               className="form-check-input"
//               id="inlineCheckbox3"
//               name="position"
//               value="ravenclaw"
//               onChange={handleChange}
//               checked={formData.position === 'ravenclaw'}
//             />
//           Beater
//           </label>
//         </div>
//         <div className="form-check form-check-inline">
//           <label className="radio">
//             <input
//               type="radio"
//               className="form-check-input"
//               id="inlineCheckbox4"
//               name="position"
//               value="hufflepuff"
//               onChange={handleChange}
//               checked={formData.position === 'hufflepuff'}
//             />
//           Keeper
//           </label>
//         </div>
//       </div>
//       {/* Best Trait Question */}
//       <label className="label">
//           What do you think is your best trait?
//       </label>
//       <div className="form-group">
//         <div className="form-check form-check-inline">
//           <label className="radio">
//             <input
//               type="radio"
//               className="form-check-input"
//               id="inlineCheckbox1"
//               name="trait"
//               value="ravenclaw"
//               onChange={handleChange}
//               checked={formData.trait === 'ravenclaw'}
//             />
//           Intelligence
//           </label>
//         </div>
//         <div className="form-check form-check-inline">
//           <label className="radio">
//             <input
//               type="radio"
//               className="form-check-input"
//               id="inlineCheckbox2"
//               name="trait"
//               value="gryffindor"
//               onChange={handleChange}
//               checked={formData.trait === 'gryffindor'}
//             />
//           Bravery
//           </label>
//         </div>
//         <div className="form-check form-check-inline">
//           <label className="radio">
//             <input
//               type="radio"
//               className="form-check-input"
//               id="inlineCheckbox3"
//               name="trait"
//               value="hufflepuff"
//               onChange={handleChange}
//               checked={formData.trait === 'hufflepuff'}
//             />
//           Kindness
//           </label>
//         </div>
//         <div className="form-check form-check-inline">
//           <label className="radio">
//             <input
//               type="radio"
//               className="form-check-input"
//               id="inlineCheckbox4"
//               name="trait"
//               value="slytherin"
//               onChange={handleChange}
//               checked={formData.trait === 'slytherin'}
//             />
//           Ambition
//           </label>
//         </div>
//       </div>
//       {/* Which House Question */}
//       <label className="label">
//           Which house do you think best suits you?
//       </label>
//       <div className="form-group">
//         <div className="form-check form-check-inline">
//           <label className="radio">
//             <input
//               type="radio"
//               className="form-check-input"
//               id="inlineCheckbox1"
//               name="house"
//               value="hufflepuff"
//               onChange={handleChange}
//               checked={formData.house === 'hufflepuff'}
//             />
//           Hufflepuff
//           </label>
//         </div>
//         <div className="form-check form-check-inline">
//           <label className="radio">
//             <input
//               type="radio"
//               className="form-check-input"
//               id="inlineCheckbox2"
//               name="house"
//               value="gryffindor"
//               onChange={handleChange}
//               checked={formData.house === 'gryffindor'}
//             />
//           Gryffindor
//           </label>
//         </div>
//         <div className="form-check form-check-inline">
//           <label className="radio">
//             <input
//               type="radio"
//               className="form-check-input"
//               id="inlineCheckbox3"
//               name="house"
//               value="slytherin"
//               onChange={handleChange}
//               checked={formData.house === 'slytherin'}
//             />
//           Slytherin
//           </label>
//         </div>
//         <div className="form-check form-check-inline">
//           <label className="radio">
//             <input
//               type="radio"
//               className="form-check-input"
//               id="inlineCheckbox4"
//               name="house"
//               value="ravenclaw"
//               onChange={handleChange}
//               checked={formData.house === 'ravenclaw'}
//             />
//           Ravenclaw
//           </label>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Sorting