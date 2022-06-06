import React, {useState, useEffect} from 'react';
import "./sign-up.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useSelector, useDispatch} from "react-redux";
import {authActions} from "../../store/auth-slice";
import {sendUser, fetchUserData} from "../../store/auth-actions"


function SignUp(){
    const dispatch = useDispatch();
    const users = useSelector((state) => state.auth);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(0);

    const [userError, setUserError] = useState(false)
    const [userText, setUserText] = useState("")

    function addUser(){
        if(username !== "" && password !== ""){
            const userId = users.users.length;
            const allUsers = users.users

            const foundUser = allUsers.find(el => el.username === username)

            if(foundUser){
                setUserError(true);
                setUserText("User already exists !")
            }

            else{
                dispatch(authActions.setChanged())
                dispatch(
                    authActions.addUser({
                        userId,
                        username,
                        password
                    })
                ) 
                setShow(1);
            }

        }
    }

    useEffect(() => {

        dispatch(fetchUserData());

    }, [dispatch])

    useEffect(() => {
      
        if(users.changed){
            dispatch(sendUser(users));
        }
        
        
    }, [users, dispatch])

    return(
        <div className="sign-up-container">
            <div className="sign-up-box" style={{display: show === 0 ? 'flex': 'none'}}>
                <h1>CREATE AN ACCOUNT</h1>

                <div className="login-input">
                    <TextField label="Please enter a username" variant="outlined" type="text" color="secondary" 
                    value={username} onChange={(e) => setUsername(e.target.value)} 
                    error={userError} helperText={userText} />
                </div>

                <div className="login-input">
                    <TextField label="Please enter a password" variant="outlined" type="password" color="secondary" 
                    value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                
                <div className="login-input">
                    <Button variant="contained" color="secondary" onClick={addUser}>Sign Up</Button>
                </div>
            </div>
            <div className="sign-up-box" style={{display: show === 1 ? 'flex': 'none'}}>
                <h2>User Successfully Created</h2>
                
                <div className="login-input">
                    <Button variant="contained" color="secondary" onClick={() => window.location.href = "/"}>Back to Login</Button>
                </div>
                
            </div>
        </div>
    )
}

export default SignUp;