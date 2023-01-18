const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const dotenv=require("dotenv")
dotenv.config()
const PORT = process.env.PORT || 5000
const {MONGOURI} = require('./config/keys')


mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true

},(err)=>{
    if (err){
        console.log(MONGOURI)
        console.log("Error Connecting Db",err)
    }
    else{
        console.log("Db Started")
    }
})


require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))


    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })

// app.get("/",async(req,res)=>{
//     console.log(process.env.NODE_ENV,process.env.MONGO_URI)
//     res.send("Welcome to Instagram Server")
// })

app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})

