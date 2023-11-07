import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

import Link from './models/link.js'

const app = express();
app.use(express.json())
const PORT =process.env.PORT || 5000

//connect mongodb

const mongodb = async()=>{
   try{
    const connect = await mongoose.connect('mongodb+srv://gayatrisathawane:gayatri123@cluster0.cqdx7ze.mongodb.net/quicklinks')
    if(connect){
        console.log('connected')
    }
   }
   catch(err){
    console.log(err)
   }
}
mongodb();






app.listen(PORT , ()=>{
    console.log(`port running on ${PORT}`)
}
)