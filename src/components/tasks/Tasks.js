import React, {useState, useEffect} from 'react'
import "./tasks.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useSelector, useDispatch} from "react-redux";
import {taskActions} from "../../store/task-slice";
import {sendTask, fetchTaskData} from "../../store/task-actions"
import {fetchUserData} from "../../store/auth-actions"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Header from "../header/Header"
import MenuItem from '@mui/material/MenuItem';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Tasks(){
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.task);
    const users = useSelector((state) => state.auth.users);
    const createdBy = localStorage.getItem('CurrentUser');

    const taskList = tasks.tasks

    const filteredTasks = taskList.filter(el => el.createdBy === createdBy)


    const [taskName, setTaskName] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const taskStatus = "To Do";
    const [assignedTo, setAssignedTo] = useState("");
    
    //Modal Functions
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setTaskName("")
        setTaskDesc("")
        setAssignedTo("")
        setOpen(false)
    };


    function addTask(){

        const taskId = tasks.tasks.length;

        if(taskName !== "" && assignedTo !== ""){
            dispatch(taskActions.setChanged())
            dispatch(
                taskActions.addTask({
                    taskId,
                    taskName,
                    taskDesc, 
                    createdBy,
                    assignedTo,
                    taskStatus
                })
            ) 

            handleClose();
        }
       
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
                <h2>My Tasks</h2>

                <div>
                    <Button variant="contained" color="primary" onClick={handleOpen}>Add Task</Button> 

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className="modal-box" sx={style}>
                            <div className="modal-input">
                                <TextField fullWidth label="Task Name" variant="outlined" type="text" color="secondary" value={taskName} 
                                onChange={(e) => setTaskName(e.target.value)}/>   
                            </div>
                            
                            <div className="modal-input">
                                <TextField multiline rows={4} fullWidth label="Task Desc" variant="outlined" type="text" color="secondary" value={taskDesc} 
                                    onChange={(e) => setTaskDesc(e.target.value)}/> 
                            </div>

                            <div className="modal-select">
                                <TextField fullWidth label="Assign To" variant="outlined" type="text" color="secondary" value={assignedTo} 
                                   select onChange={(e) => setAssignedTo(e.target.value)}> 
                                    
                                    {
                                        users.map(user =>(
                                            <MenuItem key={user.username} value={user.username}>
                                                {user.username}
                                            </MenuItem>
                                        ))
                                    }
                                </TextField>
                            </div>

                            <div className="modal-input">
                                <Button variant="contained" color="secondary" onClick={addTask}>Add Task</Button> 
                            </div>
                            
                            
                        </Box>
                    </Modal>
                </div>

                <div className="task-container">
                    {
                        filteredTasks.map((task) => (
                            <div className="task-boxes purple">
                                <div class="task-header">


                                    <h2>{task.taskName}</h2>

                                    <h4>Status: {task.taskStatus}</h4>

                                </div>

                                <p>{task.taskDesc}</p>

                                <div>
                                    <h4>Created By : {task.createdBy}</h4>

                                    <h4>Assigned To : {task.assignedTo}</h4>
                                </div>
                            </div>
                        ))
                    }
                </div>
        </div>
    )
}

export default Tasks;