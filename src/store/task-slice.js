import {createSlice} from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        tasks: [],
        changed: false,
    },
    reducers: {
        replaceData(state, action){
            state.tasks = action.payload.tasks;
        },

        addTask(state, action){

            state.tasks.push({
                taskId: action.payload.taskId,
                taskName: action.payload.taskName,
                taskDesc: action.payload.taskDesc,
                createdBy: action.payload.createdBy,
                assignedTo: action.payload.assignedTo,
                taskStatus: action.payload.taskStatus
            });
        },

        updateTask(state, action){
            const id = action.payload.taskId

            const existingTask = state.tasks.find(task => task.taskId === id)

            if(existingTask){
                existingTask.taskStatus = action.payload.taskStatus
            }
        },

        setChanged(state){
            state.changed = true
        },

    }
})

export const taskActions = taskSlice.actions;

export default taskSlice;