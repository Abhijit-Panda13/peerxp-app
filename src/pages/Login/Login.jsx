import Header from "../../components/Header/Header"
import React, {useState} from 'react';
import LoginForm from "../../components/Form/LoginForm"



export default function Login(){
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    
    return(
        <>
             <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/"
                />

            <LoginForm />
            
        </>
    )
}
