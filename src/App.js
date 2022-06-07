import React from "react";
import "./App.css"
import {Router} from "@reach/router"
import SignUp from "./components/sign-up/SignUp";
import Login from "./components/login/Login"
import Tasks from "./components/tasks/Tasks.js"
import PendingTasks from "./components/tasks/PendingTasks"
import WorkInProgress from "./components/tasks/WorkInProgress";
import Completed from "./components/tasks/Completed";

function App() {
  
  return (
    <div className="App">
      <Router>
        <Login path="/" />
        <SignUp path="/sign-up" />
        <Tasks path="/tasks" />
        <PendingTasks path="/my-pending-task" />
        <WorkInProgress path="/work-in-progress" />
        <Completed path="/finished-tasks" />
      </Router>
    </div>
  );
}

export default App;
