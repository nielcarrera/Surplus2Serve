import React from 'react'
import './Landingpage.css'
import bgvideo from '../../assets/bgvideo.mp4'

const Landingpage = () => {
  return (

  <div className="landingpage">

     <video src={bgvideo} autoPlay muted loop class= "video-bg" />
     <div className="bg-overlay"></div>

  </div>

)
}

export default Landingpage