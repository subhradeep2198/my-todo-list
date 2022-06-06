import React, {useEffect} from "react";
import "./App.css"
import {Router} from "@reach/router"
import SignUp from "./components/sign-up/SignUp";
import Login from "./components/login/Login"
import Tasks from "./components/tasks/Tasks.js"
import {useSelector, useDispatch} from "react-redux";
import {sendUser, fetchUserData} from "./store/auth-actions"

function App() {

  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth);

  useEffect(() => {
       
    dispatch(fetchUserData());
  
  }, [dispatch])
  
  
  

  return (
    <div className="App">
      <Router>
        <Login path="/" />
        <SignUp path="/sign-up" />
        <Tasks path="/tasks" />
      </Router>
    </div>
  );
}

export default App;
