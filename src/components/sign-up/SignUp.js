import React, {useState, useEffect} from 'react';
import "./sign-up.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useSelector, useDispatch} from "react-redux";
import {authActions} from "../../store/auth-slice";
import {sendUser} from "../../store/auth-actions"


function SignUp(){
    const dispatch = useDispatch();
    const users = useSelector((state) => state.auth);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function addUser(){
        if(username !== "" && password !== ""){
            const userId = users.users.length;
            dispatch(
                authActions.addUser({
                    userId,
                    username,
                    password
                })
            ) 
        }
    }

    useEffect(() => {
       
        dispatch(sendUser(users));
      
    }, [users, dispatch])

    return(
        <div className="sign-up-container">
            <div className="sign-up-box">
                <h1>CREATE AN ACCOUNT</h1>

                <div className="login-input">
                    <TextField label="Please enter a username" variant="outlined" type="text" color="secondary" onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className="login-input">
                    <TextField label="Please enter a password" variant="outlined" type="password" color="secondary" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                
                <div className="login-input">
                    <Button variant="contained" color="secondary" onClick={addUser}>Sign Up</Button>
                </div>
            </div>
        </div>
    )
}

export default SignUp;