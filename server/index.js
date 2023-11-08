import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

import Link from './models/link.js'

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 8080

//connect mongodb

const mongodb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI)
    if (connect) {
      console.log('connected')
    }
  }
  catch (err) {
    console.log(err)
  }
}
mongodb();

///post method
app.post('/link', async(req, res) => {
  const { url, slug } = req.body;
  const randomSlug = Math.random().toString(36).substring(2, 7)

  const link = new Link({
    url: url,
    slug: slug || randomSlug

  })
  try {
    const saveLink = await link.save();
    return res.json({
      success: true,
      data: {

        shortUrl: `${process.env.BASE_URL}/${saveLink.slug}`
      
      },
      message:"Link saved successfully"
    }
    )

  } catch (error) {
   return res.json({
      success: false,
      message: error.message

    })

  }

})

//get

app.get('/:slug', async(req,res)=>{

  const {slug}= req.params;

  const link = await Link.findOne({slug:slug});

   await  Link.updateOne({slug:slug},{$set:{
    clicks : link.clicks + 1
   }})


  if(!link){
    return res.json({
      success:false,
      message:"link not found"

    })
  }

  res.redirect(link.url)
})

app.listen(PORT, () => {
  console.log(`port running on ${PORT}`)
}
)