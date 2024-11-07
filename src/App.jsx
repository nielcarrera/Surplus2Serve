<<<<<<< Updated upstream
import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Admin from './pages/Admin'
import User from './pages/User'
import './index.css';
import Requests from './components/Admin/Requests'
import SelectedFood from './components/User/SelectedFood'
=======
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Admin from "./pages/Admin";
import User from "./pages/User";
import "./index.css";
import Requests from "./components/Admin/Requests";
>>>>>>> Stashed changes
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<User />} />
          <Route path="/food-approval/:id" element={<Requests />} />
<<<<<<< Updated upstream
          <Route path="/foodFeed/:id" element={<SelectedFood/>}/>
        </Routes> 
=======
        </Routes>
>>>>>>> Stashed changes
      </BrowserRouter>
    </div>
  );
}
