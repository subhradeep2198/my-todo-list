import { authActions } from "./auth-slice";

export const fetchUserData = () => {
    return async (dispatch) => {
      const fetchHandler = async () => {
        const res = await fetch(
          "https://my-todo-list-a2d24-default-rtdb.firebaseio.com/users.json"
        );
        const data = await res.json();
        return data;
      };
      try {
        const userData = await fetchHandler();
        
        dispatch(authActions.replaceData(userData));
      } 
      catch (err) {
        console.log(err)
      }
    };
 };


export const sendUser = (users) => {
    return async () => {
        const sendRequest = async () => {
            // Send state as Sending request
      
            const res = await fetch(
              "https://my-todo-list-a2d24-default-rtdb.firebaseio.com/users.json",
              {
                method: "PUT",
                body: JSON.stringify(users),
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