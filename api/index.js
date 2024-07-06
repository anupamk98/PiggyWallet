const express = require('express')
const app = express()
const cors=require('cors')
const path = require('path')
require('dotenv').config()
const jwt =require('jsonwebtoken')
const bcrypt = require("bcrypt")
const { mongo, default: mongoose } = require('mongoose')
const cookieParser = require('cookie-parser')
const mongooose = require('mongoose')
mongoose.connect(process.env.MONGO_DB_URL)
const Usermodel = require('./models/user')
const Paymodel = require('./models/payment')

app.use(cors({credentials:true,origin:'https://piggy-wallet.vercel.app'}))
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("workin")
}
)

app.post("/signup",async (req,res)=>{
const {name,username,pass}=req.body
const user = await Usermodel.findOne({username})
if(user) res.json("failed")
else {
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(pass,salt,async (err,hash)=>{
           const newuser = await Usermodel.create({
                name,username,password:hash
            })
            let token =jwt.sign({username,userid:newuser._id},process.env.COOKIE_STRING)
            res.cookie("token",token,{
            secure : true,
            sameSite : 'none'
        }).json("ok")
        })
    })
}
})

app.post("/login",async (req,res)=>{
    const {username,pass} = req.body 
    const user= await Usermodel.findOne({username})
    if(!user) res.json("no")
    else  {
    bcrypt.compare(pass,user.password,(err,result)=>{
    if(result){
        let token =jwt.sign({username,userid:user._id},process.env.COOKIE_STRING)
        res.cookie("token",token,{
            secure : true,
            sameSite : 'none'
        }).json("ok")
    }
    else res.json("failed")
    })
}
    })

app.get("/profile",(req,res)=>{
let obj = req.cookies.token
if((obj != null)) {
const data = jwt.verify(req.cookies.token,process.env.COOKIE_STRING)
res.json(data)
}
else res.json("failed")
})

app.get("/logout",(req,res)=>{
    res.cookie("token","",{
        secure : true,
        sameSite : 'none'}
        ).json("ok")
})

app.post("/posts",async (req,res)=>{
    const username = req.body.username
    const user = await Usermodel.findOne({username})
    await user.populate("posts")
    res.json({posts:user.posts,name:user.name})
})

app.post("/submitpost",async (req,res)=>{
const {Name,Price,datetime,desc,username}=req.body
const post = await Paymodel.create({
    name : Name,
    price : Price,
    description : desc,
    date : datetime
})
const user = await Usermodel.findOne({username})
user.posts.push(post._id)
await user.save()
res.json("ok") 
})

app.listen(3000)

