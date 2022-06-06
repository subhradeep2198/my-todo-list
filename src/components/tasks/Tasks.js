import React, {useState, useEffect} from 'react'
import "./tasks.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useSelector, useDispatch} from "react-redux";
import {taskActions} from "../../store/task-slice";
import {sendTask, fetchTaskData} from "../../store/task-actions"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

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

    const createdBy = localStorage.getItem('CurrentUser');

    const [taskName, setTaskName] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const [taskStatus, setTaskStatus] =  useState("To Do")
    
    //Modal Functions
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setTaskName("")
        setTaskDesc("")
        setOpen(false)
    };


    function addTask(){

        const taskId = tasks.tasks.length;

        dispatch(taskActions.setChanged())
        dispatch(
            taskActions.addTask({
                taskId,
                taskName,
                taskDesc, 
                createdBy,
                taskStatus
            })
        ) 

       handleClose();
    }

    useEffect(() => {

        dispatch(fetchTaskData());

    }, [dispatch])

    useEffect(() => {
      
        if(tasks.changed){
         dispatch(sendTask(tasks));
        }
    }, [tasks, dispatch])

    return(
        <div className="my-tasks">
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

                            <div className="modal-input">
                                <Button variant="contained" color="secondary" onClick={addTask}>Add Task</Button> 
                            </div>
                            
                            
                        </Box>
                    </Modal>
                </div>
        </div>
    )
}

export default Tasks;