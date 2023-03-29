import React, {useState} from 'react';


import Login from "./Login";
import Header from "../../components/Header/Header";
import SignUpForm from "../../components/Form/SignUpForm";
 



const Signup = () => {
    return(
        <>
            <Header
              heading="Signup to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/login"
            />
            <SignUpForm/>
        </>
    )
  
}
 
export default Signup