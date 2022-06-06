import React from "react";
import "./App.css"
import {Router} from "@reach/router"
import SignUp from "./components/sign-up/SignUp";
import Login from "./components/login/Login"
import Tasks from "./components/tasks/Tasks.js"

function App() {
  
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
