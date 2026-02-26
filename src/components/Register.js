import React, { useState } from 'react'
import './Register.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Register = () => {

  const token=localStorage.getItem("token")

  const navigate =useNavigate();
 const [input,SetInput]= useState([])
 const [users,SetUsers]=useState([])


//  ..get input.....................................

const handleInput =(e) =>{
  const{name,value}=e.target

  SetInput({...input,[name]:value})
}
 
 const saveUser =(e)=>{
  e.preventDefault();
  axios.post(`http://localhost:8080/users/create`,input,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  .then((response)=>{
     const uvalue=Array.isArray(response.data)? response.data:[response.data]
     SetUsers(uvalue)
     console.log("users save successfuly")
     navigate("/main")
  })
  .catch((err)=>{
    console.log("error in user creating",err?.response?.data)
  })
 }


  return (
    <div>
      <h1 className='register'>Register</h1>

    <form className='register-form'>

      <label className='label'>Username</label>
      <input type='text' name="username" className='input' onChange={handleInput}></input> 
      <label className='label'>Mobile number</label>
      <input type='text' name="mobilenumber" className='input' onChange={handleInput}></input> 

      <label className='label'> E-mail</label>
      <input type='text' name="email" className='input' onChange={handleInput}></input>

      <label className='label'> Password</label>
      <input type='password' name='password' className='input' onChange={handleInput}></input> 

     <button id='register' onClick={saveUser}>Register</button> <br></br> <br></br>
     <label style={{marginLeft:'140px',marginTop:'25px'}}>Alredy Registered?</label><a href='/login'>Login</a>

  



    </form>





    </div>
  )
}

export default Register