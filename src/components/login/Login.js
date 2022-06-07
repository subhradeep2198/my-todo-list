import React, {useState, useEffect} from 'react';
import "./login.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useSelector, useDispatch} from "react-redux"
import {fetchUserData} from "../../store/auth-actions"


function Login(){
    const dispatch = useDispatch();
    const users = useSelector((state) => state.auth.users)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [userError, setUserError] = useState(false)
    const [passError, setPassError] = useState(false)

    const [userText, setUserText] = useState("")
    const [passText, setPassText] = useState("")

    function signUp(){
        window.location.href = "/sign-up"
    }

    useEffect(() => {
        dispatch(fetchUserData());
    
    }, [dispatch])

  

    

    function login(){

        if(username !== "" && password !== ""){
            const foundUser =  users.find(user => user.username === username)

            if(foundUser){
                if(password === foundUser.password) {
                    const currentUser = foundUser.username;
                    
                    localStorage.setItem('CurrentUser', currentUser)
    
                    window.location.href = "/tasks"
                }
                else{
                   setPassError(true)
                   setPassText("Invalid password")
                }
            }
    
            else{
                setUserError(true)
                setUserText("User doesn't exist. Please sign up!")
            }
        }
    }

    

    return(
        <div className="login-container">
            <div className="login-box" >
                <h1>LOGIN</h1>

                <div className="login-input">
                    <TextField label="Username" variant="outlined" type="text" color="secondary" value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    error={userError} 
                    helperText={userText}/>
                </div>

                <div className="login-input">
                    <TextField label="Password" variant="outlined" type="password" color="secondary" 
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    error={passError}
                    helperText={passText}
                    />
                </div>
                
                <div className="login-input">
                    <Button variant="contained" color="secondary" onClick={login}>Login</Button>
                </div>

                <div className="login-input">
                    <Button variant="contained" color="primary" onClick={signUp}>Don't have an account? Sign Up!</Button>
                </div>
            </div>
        </div>
    )
}

export default Login;
