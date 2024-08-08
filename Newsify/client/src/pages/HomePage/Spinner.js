import React  from 'react'
import loading from "./spinner2.gif"
import "./Styles/spin.css"
const Spinner=()=>{
    return (
      <div className="text-center">
        <img className='spinn' src={loading} alt="loading" />
      </div>
    )
  
}
export default Spinner