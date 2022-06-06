import { taskActions } from "./task-slice";

export const fetchTaskData = () => {
    return async (dispatch) => {
      const fetchHandler = async () => {
        const res = await fetch(
          "https://my-todo-list-a2d24-default-rtdb.firebaseio.com/tasks.json"
        );
        const data = await res.json();
        return data;
      };
      try {
        const taskData = await fetchHandler();
        
        dispatch(taskActions.replaceData(taskData));
      } 
      catch (err) {
        console.log(err)
      }
    };
};

export const sendTask = (tasks) => {
    return async () => {
        const sendRequest = async () => {
            // Send state as Sending request
      
            const res = await fetch(
              "https://my-todo-list-a2d24-default-rtdb.firebaseio.com/tasks.json",
              {
                method: "PUT",
                body: JSON.stringify(tasks),
              }
            );

            const data = await res.json();
            
        };

        try {
            await sendRequest();
        } 

        catch (err) {
            console.error(err)
        }
    };
}