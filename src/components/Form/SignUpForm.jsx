import { useState } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "../Inputs/Inputs";
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { Link, useNavigate } from 'react-router-dom';
import "./Form.css"

function setToken(userToken) {
    localStorage.setItem('token', JSON.stringify(userToken));
}

const fields=signupFields;
let fieldsState={};
fields.forEach(field => fieldsState[field.id]='');

export default function SignUpForm(){
  const navigate = useNavigate();
  const [signupState,setSignupState]=useState(fieldsState);

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const onSubmit = async (e) => {
    e.preventDefault()
   
    await createUserWithEmailAndPassword(auth, signupState.emailaddress, signupState.password)
      .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          setToken(user);
          navigate("/dashboard")
          // ...
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          // ..
      });
  }

 

    return(
        <div className=" flex flex-col justify-center items-center ">
            <form className="bg-white shadow-md rounded px-9 pt-6 pb-8 w-40 mb-4" onSubmit={onSubmit}>
                <div className="mb-4">
        {
                fields.map(field=>
                        <Input 
                            
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
          <FormAction handleSubmit={onSubmit} text="Signup" />
        </div>

         

      </form>
      </div>
    )
}