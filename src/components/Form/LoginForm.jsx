import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "../Inputs/Inputs";
import { NavLink, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

function setToken(userToken) {
    localStorage.setItem('token', JSON.stringify(userToken));
}

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);
    const navigate = useNavigate();
    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }
    console.log(loginState)

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, loginState.emailaddress, loginState.password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            setToken(user);
            navigate("/expenses")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       
    }
    return(
        <div className="flex flex-col justify-center items-center ">
            <form className="bg-white shadow-md rounded px-9 pt-6 pb-8 mb-4 w-40" onSubmit={onLogin}>
                <div className="mb-4">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
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
        </div>

        <FormExtra/>
        <FormAction handleSubmit={onLogin} text="Login"/>

      </form>
    </div>
    )
}