import React, {useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Signup from '../Login/Signup';
import Expenses from '../Expenses/Expenses';
import useToken from '../Login/useToken';


function App() {
    
  return (
    <div className="wrapper">
      {/* <h1>Application</h1> */}
        <Routes>
          <Route exact path="/" element={<Signup />}/>
          <Route exact path="/dashboard" element={<Dashboard />}/>
          <Route exact path="/expenses" element={<Expenses />}/>
          <Route exact path="/login" element={<Login />}/> 
          <Route exact path="/signup" element={<Signup />}/>  
        </Routes>
    </div>
  );
}

export default App;