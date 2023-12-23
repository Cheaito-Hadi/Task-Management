import React from 'react'
import './styles.css'

function TaskCard({title, description, due_date, status}) {

    return (
        <div className="card-container">
            <div className="card-wrapper">
                <div>{title}</div>
                <div className="status-switch-wrapper">
                    <div className="status">Status: {status}</div>
                    <label className="switch">
                        <input type="checkbox"/>
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className="description">{description}</div>
                <div className="due-date">Due Date: {due_date}</div>
            </div>
        </div>
    )
}

export default TaskCard;