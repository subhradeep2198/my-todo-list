import React, {useState, useEffect} from 'react'
import "./tasks.css"
import {useSelector, useDispatch} from "react-redux";
import {taskActions} from "../../store/task-slice";
import {sendTask, fetchTaskData} from "../../store/task-actions"
import {fetchUserData} from "../../store/auth-actions"
import Button from '@mui/material/Button';
import Header from "../header/Header"


function PendingTasks(){

    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.task);
    const currentUser = localStorage.getItem('CurrentUser');

    const taskList = tasks.tasks

    const filteredTasks = taskList.filter(el => el.assignedTo ===currentUser && el.taskStatus === "To Do" )

    function updateTask(id, ts){
        const taskId = id;
        const taskStatus = ts;

        dispatch(taskActions.setChanged())
        dispatch(
            taskActions.updateTask({
                taskId,
                taskStatus
            })
        ) 
    }

    useEffect(() => {
        dispatch(fetchUserData());
        dispatch(fetchTaskData());

    }, [dispatch])


    useEffect(() => {
      
        if(tasks.changed){
         dispatch(sendTask(tasks));
        }

    }, [tasks, dispatch])

    return(
        <div className="my-tasks">
                <Header />
                <h2>My Pending Tasks</h2>

                <div className="task-container">
                    {
                        filteredTasks.map((task) => (
                            <div className="task-boxes purple" key={task.taskId}>

                                <h2>{task.taskName}</h2>

                                <p>{task.taskDesc}</p>

                                <div>
                                    <h4>Created By : {task.createdBy}</h4>

                                    <h4>Assigned To : {task.assignedTo}</h4>
                                </div>

                                <div className="button-container">
                                    <button class="move-button" onClick={() => updateTask(task.taskId, "Work in Progress")}>Move to WIP &#8594;</button> 
                                </div>
                            </div>
                        ))
                    }
                </div>
        </div> 
    )
}

export default PendingTasks;