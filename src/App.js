import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Events from './components/Events';
import { useNavigate } from 'react-router-dom';
import {useSelector } from "react-redux";

function App() {
  const navigate = useNavigate();
  const loggedIn = useSelector((state)=>state.loggedIn);

  useEffect(()=> {
    if(loggedIn){
      navigate("/events");
    }
  },[loggedIn])

  return (
    
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/register" element={<Signup/>} />
        <Route path="/events" element={<Events/>} /> 
      </Routes>
  );
}

export default App;
