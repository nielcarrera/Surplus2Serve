import React from 'react'
import './Hero.css'
import { useNavigate } from 'react-router-dom';


const Hero = () => {

  const navigate = useNavigate();

const goToLogIn = () => {
  navigate('/login'); // Redirect to the signup page
}; 

  return (
    <div className = 'hero'> 
     <h1>Connect, share, combat hunger.</h1>
     <p>Provide and request food in a more secure way. In a few steps.</p> 
    
         <div className="hero-action">
             <button class="learn-more">Learn More </button>
             <button onClick={goToLogIn} class="join-us">Join Us </button>
             
         </div>
    </div>
  )
}

export default Hero