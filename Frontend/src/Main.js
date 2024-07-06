import React from 'react'
import { useState , useEffect } from 'react'
import { useContext } from 'react'
import { Username } from './context'
const Main = () => {
    const [name, setname] = useState("")
    const [datetime, setdatetime] = useState("")
    const [desc, setdesc] = useState("")
    const temp = useContext(Username)
    const [posts, setposts] = useState([])
    const [holder, setholder] = useState("")

    useEffect(() => {
      async function getpost() {
      const response =  await fetch('http://localhost:8080/posts',
          {
            method:'POST',
            body : JSON.stringify({username:temp.context}),
            headers : {'Content-Type':'application/json'},
            credentials:'include'
          }
        )
      const res = await response.json()
      setposts(res.posts)
      setholder(res.name)
      }
      if(temp.context!==""){
      getpost()
      }
    })
    
    async function handleSubmit(e){
      e.preventDefault()
      let Name = name.split(' ')[0]
      let Price = name.substring(Name.length+1)
      const response =  await fetch('http://localhost:8080/submitpost',
        {
          method:'POST',
          body : JSON.stringify({Name,Price,datetime,desc,username:temp.context}),
          headers : {'Content-Type':'application/json'},
          credentials:'include'
        }
      )
      const res = await response.json()
      setname("")
      setdatetime("")
      setdesc("")
    }
    let balance =0;
    posts.forEach(element => {
      balance+=parseInt(element.name)
    });

  return ( 
    <main className='bg-zinc-900 min-h-[70vh]'>
    {temp.context!=="" && <>
    <h1 className='text-3xl'>Account Holder : {holder}</h1>
    <h1 className='text-3xl'>Current Balance : ₹ {balance}</h1>
    <form action="" onSubmit={handleSubmit}>
      <div className='c1'>
      <input type="text" required="true" value={name} onChange={e=>setname(e.target.value)} placeholder='+200 for Bike' />
      <input type="datetime-local" required="true" value={datetime} onChange={e=>setdatetime(e.target.value)} />
      </div>
        <input className='desc' required="true" value={desc} onChange={e=>setdesc(e.target.value)} type="text" placeholder='Description'/>
      <input className='sub font-medium'  type="submit" name="" value={'Add Transaction'} id="" />
    </form>
    <div className="transactions mt-10">
      {posts.length===0 && <h3 className='text-center text-lg'> No Past Transactions</h3> }
      {posts.length!== 0 && <h3 className='text-center text-lg'>Past Transactions</h3>}
      {posts.length!== 0 && posts.map(post=>{
        return (
      <div className="transaction">
        <div className="left">
          <div className="name">{post.price}</div>
          <div className="desc">{post.description}</div>
        </div>
        <div className="right">
        {post.name[0]==='+' && <div className='price green'>{post.name} ₹</div>}
        {post.name[0]==='-' && <div className='price red'>{post.name} ₹</div>}
        <div className="date">{post.date.split('T')[0]}</div>
        </div>
      </div>
        )
      })}
    </div>
    </>}
    {temp.context === "" && <div className='flex flex-col gap-7 items-center'><h3 className='text-xl font-light text-white'>You need to Login or SignUp to use this service. Thank You!</h3>
    <img src="piggy2.avif" className='w-80 rounded-full' alt="" />
    <h1 className='text-4xl font-bold text-white'>PiggyWallet</h1>
    </div>}
  </main>
  )
}

export default Main
