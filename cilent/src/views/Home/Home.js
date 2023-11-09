import React, { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios'
import copy from './../Home/copy.png'
import link from './../Home/link.png'
import showToast from 'crunchy-toast';
import LinkCard from '../../components/LinkCard/LinkCard'

const Home = () => {
  const [url, setUrl] = useState('')
  const [slug, setSlug] = useState('')
  const [shortURL, setShortUrl] = useState('')
  const[links,setLinks]=useState([])


const loadUrl = async()=>{
  const response = await axios.post('/link',{

  url,slug
  })

  setShortUrl(response?.data?.data?.shortUrl)

}


const copyShortUrl = () => {
  navigator.clipboard.writeText(shortURL);
  showToast('copied ', 'success', 3000);
 
}

const loadAllLinks =async()=>{

  const response = await axios.get('/api/links')

  setLinks(response?.data?.data)
}


useEffect(()=>{

  loadAllLinks()

},[])




  return (
    <div>
      <h1 className='text-center text-light mt-5'> QuickLinkify 🔗 </h1>

      <div className='d-flex justify-content-around mt-5 flex-wrap'>

        <div>
          <div className='input-main-container'>


            <div className='d-flex flex-column m-3 mt-3 p-3'>

            
                <div className='d-flex'>

                    <img src={link} alt={link} className='' height="40px" width="40px"/>
                    <p className='ms-3 fs-3 text-light'> Shorten a long URL</p>

                </div>
        
            <input type="text" className='user-input'
              value={url}
              placeholder='Enter a long link here '
              onChange={(e) => {

                setUrl(e.target.value)
              }
              } />

            <input type="text" className='user-input'
              value={slug}
              placeholder='Enter a slug here(optional)'
              onChange={(e) => {

                setSlug(e.target.value)
              }
              }
            />
             <div className='short-input-container'>


             <input type="text" className='shorturl-input '
              value={shortURL}
              placeholder='your tiny url'
              disabled
              onChange={(e) => {

                setShortUrl(e.target.value)
              }
              
              }
           
            />   
              <img src={copy} className=' copy' onClick={ copyShortUrl} alt={copy}/>
              
             </div>
            

            </div>

            <button type='button' className='btn-url-generator'


            onClick={loadUrl}
            
            >Shorten URL</button>

          </div>
        </div>

        <div>

          <div className='links-div'>

            {
              links.map((link,i)=>{
                const{url,clicks,slug}=link;

                return(
                 <div className=''>
                 <LinkCard url={url} clicks={clicks} slug={slug}/>
                  </div>
                )
               
              })
            }
          </div>

        </div>



      </div>

    </div>
  )
}

export default Home
