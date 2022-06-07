/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import "./header.css"
import Button from '@mui/material/Button';

function Header(){
    return(
        <div className="my-header">
            <div className="nav-links">
                <a className="link" href="/tasks">Tasks</a>
                <a className="link" href="/my-pending-task">Pending Tasks</a>
                <a className="link" href="/work-in-progress">Work In Progress</a>
                <a className="link" href="/finished-tasks">Finished Tasks</a>
            </div>

            <div className="logout-button">
                <Button variant="contained" color="warning" onClick={() => window.location.href = "/"}>Logout</Button>
            </div>

        </div>
    )
}

export default Header;