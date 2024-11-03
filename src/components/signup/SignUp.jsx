import React, { useState, useEffect } from "react";
import './SignUp.css'; // Reuse the same CSS file
import { useNavigate } from 'react-router-dom';
import bgvideo from '../../assets/bgvideo.mp4';
import axios from "axios";
import Alert from "../alert";

function SignupForm() {
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState([]);
  const [error, setError] = useState(null);
  const [alertType, setAlertType] = useState("info"); // Default alert type
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    location: ""
});

  useEffect(() => {
      const fetchLocations = async () => {
          try {
              const response = await axios.get('http://localhost:5000/api/locations');
              setLocation(response.data); // Set the fetched data to state
          } catch (err) {
              setError('Failed to fetch locations'); // Handle error
              console.error('Error fetching locations:', err);
          }
      };

      fetchLocations();
  }, []);

const handleChange = (e) => {
  const { name, value } = e.target; // Extract name and value from event target
  setFormData({
      ...formData,           // Spread the previous formData state
      [name]: value          // Dynamically update the field based on the 'name' attribute
  });
};

  const navigate = useNavigate();

  const handleSignup = async (e) => {
      e.preventDefault();
      console.log("interacted with signupbutton");
      try {
          const response = await axios.post('http://localhost:5000/auth/register', formData);
          console.log("flag try");
          setAlertType("success");
          setMessage(response.data.message);
          console.log(response.data.message);

      } catch (error) {
        console.log(error.response.data.message);
          if (error.response && error.response.data && error.response.data.message) {
              setAlertType("error");
              setMessage(error.response.data.message);
          } else if (error.request) {
              setAlertType("warning");
              setMessage('No response from the server. Please try again later.');
          } else {
              setAlertType("error");
              setMessage('An unknown error occurred.');
          }
      }
  };

  const closeAlert = () => {
    setMessage("");
  };

  const goToLogin = () => {
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="signup-container">
      {message && (
      <Alert message={message} onClose={closeAlert} type= {alertType}/>
      )}
      <div className="landingpage">
        <video src={bgvideo} autoPlay muted loop className="video-bg" />
        <div className="bg-overlay"></div>
      </div>

      <form className="signup-form" onSubmit={handleSignup}>
  <h2>Sign up</h2>
  <p>Create an account for free.</p>
  
  <div className="input-group">
    <input
      type="text"
      placeholder="First Name"
      className="s-input-field"
      name="firstName"
      value={formData.firstName}
      onChange={handleChange}
    />
    <input
      type="text"
      placeholder="Last Name"
      className="s-input-field"
      name="lastName"
      value={formData.lastName}
      onChange={handleChange}
    />
  </div>

  <input
    type="text"
    placeholder="Username"
    className="s-input-field-full"
    name="username"
    value={formData.username}
    onChange={handleChange}
  />

  <input
    type="password"
    placeholder="Password"
    className="s-input-field-full"
    name="password"
    value={formData.password}
    onChange={handleChange}
  />

  <input
    type="password"
    placeholder="Confirm Password"
    className="s-input-field-full"
    name="confirmPassword"
    value={formData.confirmPassword}
    onChange={handleChange}
  />

  <select
    className="s-input-field-full"
    name="location"
    value={formData.location}
    onChange={handleChange}
  >
    <option value = "0" > Select a location.</option>
    {location.map(location => (
        <option key={location.id} value={location.locationID}>{location.location}</option> // Display each location
      ))}  
  </select>

  <button type="submit" className="sign-in-btn full-width">Sign Up</button>

  <p className="full-width">
    Already have an account? <span onClick={goToLogin} className="sign-up-link">Sign In</span>
  </p>
</form>

<div className="header-signup">
        <h4>Join the <span>Community</span>, Share your<span2> Surplus</span2></h4>
        <button onClick={goToLogin} className="startnow-btn">Login Now</button>
      </div>
    </div>
  );
}

export default SignupForm;
