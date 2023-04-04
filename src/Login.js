import React,{useState} from 'react'
import { validateEmail, validatePassword } from './utility/utility';

export default function Login() {
   
    const initialData = {
        email:'',
        password:''
      };

      const [loginData, setloginData] = useState(initialData);
      const [error, setError] = useState({
        show:false,
        errorText: ''
      });
      

      const onFormChange = (data) => {
        setloginData({...loginData, ...data})
      }
    
      const onSubmitClick = (event) => {
        event.preventDefault();
        const validEmail =  validateEmail(loginData.email);
        const validPass =  validatePassword(loginData.password);
        if(validEmail && validPass) {
          // on login
    
        }
        else{
          setError({
            show: true,
            errorText: 'Please enter valid email and password',
          })
        }
    
      }
  return (
    <div className="container">
    <h1>Login</h1>
    <form>
      <label for="email">Email</label>
      <input type="email" id="email" name="email" onChange = {(e)=>onFormChange({email:e.target.value})} required placeholder="Enter Email"/>
      <label for="password">Password</label>
      <input type="password" onChange = {(e)=>onFormChange({password:e.target.value})} id="password" name="password" maxLength="8" placeholder="Enter Password"/>
      {error.show && <div class="error-message">
        <p>Error: {error.errorText}</p>
      </div>}
      <button onClick = {onSubmitClick} type="submit">Login</button>
    </form>
  </div>
  );
};
