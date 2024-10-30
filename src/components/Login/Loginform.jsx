import React, { useState } from "react";
import './Loginform.css'
import { useNavigate } from 'react-router-dom';
import bgvideo from '../../assets/bgvideo.mp4'
import axios from "axios";

function Loginform() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/auth/login', { username, password });
        setMessage(response.data.message);
        console.log(response.data.message);
        const token = response.data.token;
        localStorage.setItem('jwtToken', token);
        goToAdmin();
    } catch (error) {
        console.error(error.response);  // Log the error response
        alert(error.response?.data?.message || 'Error logging in');
    }
};

  const goToSignUp = () => {
    navigate('/signup'); // Redirect to the signup page
  }; 

  const goToAdmin = () => {
    navigate('/admin');
  }


  return ( 


    <div className="login-container">

      <div className="landingpage">
        <video src={bgvideo} autoPlay muted loop class= "video-bg" />
        <div className="bg-overlay"></div> </div>
     

      <form className="login-form">
        <h3>S <span> 2</span> S</h3>
        <h2>Welcome</h2>
        <p>Login to access your account</p>
        <input
          type="text"
          placeholder="Username"
          className="l-input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="l-input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleLogin} className="sign-in-btn">Sign In</button>
        <p>
          Don’t have an account yet? <span onClick={goToSignUp} className="sign-up-link">Sign Up</span>
        </p>
      </form>

      <div className="header-login">
      <h4>Boost your <span>Economy</span> Share your<span2> Surplus</span2></h4>
      <button onClick={goToSignUp} className="startnow-btn">Start Now</button>
      </div>
    
     {/* <div className="login-image">
       <img src={loginbg} alt="Login Background" className="image-content" /> 

    
        </div> */} 
    </div>

      

  );
}

export default Loginform;