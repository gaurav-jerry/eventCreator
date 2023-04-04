import React from 'react'
import './App.css';

export default function Register() {

  const onRegister = (event) => {
    // on RegisterClick
    event.preventDefault();
    
  }

  return (
    <div className="container">
    <form>
    <label for="email">Email</label>
    <input type="email" placeholder = "Enter email" id="email" name="email" required/>

    <label for="username">Username</label>
    <input type="text" id="username" placeholder = "Enter username" name="username" required/>
  
    <label for="password">Password</label>
    <input type="password" id="password" placeholder = "Enter password" name="password" maxlength="8" required />
  
    <button onClick = {onRegister} type="submit">Register</button>
    
  </form>
  </div>
  )
}
