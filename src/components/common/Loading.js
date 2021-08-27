import React from 'react'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css' 
import Loader from 'react-loader-spinner'

function Loading() { 
  return (
    <div className="Loading">
      <Loader type="TailSpin" color="#4C956C" height="100" width="100" />
    </div>
  )
}

export default Loading 