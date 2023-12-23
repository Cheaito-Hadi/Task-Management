import React from 'react'
import './styles.css'

function TaskCard() {


    return (
        <div className="card-container">
            <div className="card-wrapper">
                <div>Title:</div>
                <div className="status-switch-wrapper">
                    <div className="status">Status:</div>
                    <label className="switch">
                        <input type="checkbox"/>
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className="description"></div>
                <div></div>
                <div className="due-date">Due Date:</div>
            </div>
        </div>
    )
}

export default TaskCard;