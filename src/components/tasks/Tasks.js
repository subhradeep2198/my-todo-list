import React, {useEffect} from 'react'
import {useSelector} from "react-redux";

function Tasks(){
    const currentUser = localStorage.getItem('CurrentUser');

    console.log(currentUser)

    return(
        <>
            <h2>My Tasks</h2>
        </>
    )
}

export default Tasks;