import React from 'react';
import Signup from '../Login/Signup';


function setToken(userToken) {
    localStorage.setItem('token', JSON.stringify(userToken));
}


function getToken() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken
}
export default function Preferences() {
    const token = getToken();
  if(!token) {
      return <Signup setToken={setToken} />
  }
  return(
    <h2>Preferences</h2>
  );
}