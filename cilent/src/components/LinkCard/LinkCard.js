import React from 'react'
import './LinkCard.css'

const LinkCard = ({url,clicks,slug}) => {
  return (
    <div className='linkCard-cantainer'>
        <p className='fs-4 url'> URL:{url} </p>
        <p className='fs-5'>ShortURL: {process.env.REACT_APP_BASE_URL}/{slug}</p>
        <p className='click fs-4'>Clicks:{clicks}</p>


      
    </div>
  )
}

export default LinkCard
