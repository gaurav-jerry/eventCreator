export const validatePassword = (password) => {
    const regex = /^(?=.*?[A-Z])(?=.*?[^\w\s]).{8,}$/;
    console.log(regex.test(password));
    return regex.test(password);
  };

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

export const getKey = (key) =>{
  return localStorage.getItem(key);
};

export const setKey = (key,value)=>{
  return localStorage.setItem(key, value);
}   

export const register = (username, password, email)=>{
  let users =  JSON.parse(getKey("users"));
  users = users? users :{};
  console.log(users);
    users[email] = {username, email, password}
    setKey("users", JSON.stringify({...users}));
}  
export const signin = (email, password)=>{
 const users = JSON.parse(getKey("users"))
  if(users){
    if(users[email]){
      return users[email].password === password;
    }
    else{
      alert("user dont exist, please register!")
    }
 }
 else{
  alert("user dont exist, please register!")
 }
}    

export const getEventDataforUser = (loggedInUser) =>{
  const eventData = JSON.parse(getKey("eventData"));
  if(eventData && eventData[loggedInUser]){
    return eventData[loggedInUser]
  }
  else{
    return [];
  }
}

export const setEventDataforUser = (loggedInUser, data) =>{
  let eventData = JSON.parse(getKey("eventData"))
  if(eventData){
    eventData[loggedInUser] = data;
  }
  else {
    eventData = {};
    eventData[loggedInUser] = data;
  }
  console.log(data);
  setKey("eventData",  JSON.stringify(eventData));
}