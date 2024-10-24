import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import logo from '../../../assets/logo.png'



const Navbar = () => {

   const navigate = useNavigate();

   const goToLogin = () => {
     navigate('/login'); // Redirect to the login page
   };
   const goToSignUp = () => {
      navigate('/signup'); // Redirect to the login page
    };

  return (
     <nav className="container">
       <h5>Surplus<span>2</span><span2>Serve</span2></h5> 
     <ul>
        <li><button onClick={goToLogin} className='login-btn'>Log In</button></li>
        <li><button onClick={goToSignUp} className='register-btn'>Register</button></li>
     </ul>
     </nav>
  )
}

export default Navbar