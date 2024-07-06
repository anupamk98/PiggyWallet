import React, { useContext } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useState } from 'react'
import { Navigate, redirect } from 'react-router-dom'
import { Username } from './context'
const Login = () => {
  const [username, setusername] = useState("")
  const [pass, setpass] = useState("")
  const [redirect, setredirect] = useState(false)
  const temp =useContext(Username)
  async function handleSubmit(e){
    e.preventDefault()
    const response =  await fetch('https://piggywallet.onrender.com/login',
      {
        method:'POST',
        body : JSON.stringify({username,pass}),
        headers : {'Content-Type':'application/json'},
        credentials:'include'
      }
    )
    const res = await response.json()
    console.log(res)
    if(res === "ok") {
      temp.settoggle(temp.toggle+1)
      setredirect(true)
    }
    else if(res==="failed") {
      alert("Username and Password does not match.")
      setredirect(false)
    }
    else {
      alert("No such user exists.")
      setredirect(false)
    }
  }
  if(redirect) return <Navigate to={'/'} />
  return (
    <>
    <Navbar logout={"true"}/>
    <div className='w-full min-h-[80vh] bg-zinc-900 p-10 flex flex-col items-center'>
        <form action="" onSubmit={handleSubmit} className='flex flex-col items-center justify-center w-[80vw] gap-3'>
            <h2 className='text-3xl font-bold'>Login Form</h2>
            <input value={username} required="true" onChange={(e)=>setusername(e.target.value)}  type="text" placeholder='Username' className='w-2/3' />
            <input value={pass} required="true" onChange={(e)=>setpass(e.target.value)}  type="password" placeholder='Password' className='w-2/3' />
            <input type="submit"  value="Submit" className='bg-white text-zinc-900 font-medium text-lg cursor-pointer outline-none border-none py-2 w-2/3'/>
        </form>
    </div>
    <Footer/>
    </>
  )
}

export default Login
