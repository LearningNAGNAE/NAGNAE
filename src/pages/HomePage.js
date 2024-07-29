import React from 'react'
import '../assets/styles/homepage/homepage.css'

function HomePage() {



  return (
    <div className='contents'>
      <div className='screen'>
        <div className='simple-introduce-box'>
          <p className='si-1'>A warm companion for those starting a new life in Korea</p>
          <p className='si-2'>NAGNAE</p>
          <div>
            <a className='start-btn' href='/chatbotpage'>▶ START</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage